'use client';

import { useState } from 'react';
import { CharacterName, CharacterNameKeys } from '@/constants/characters';
import CharacterSelectionModal from './CharacterSelectionModal';

interface ViewAllCodesModalProps {
  isOpen: boolean;
  onClose: () => void;
  codes: Partial<Record<CharacterNameKeys, string[]>>;
  foundCharacters: Partial<Record<CharacterNameKeys, boolean>>;
  onAssociateCodeWithCharacter: (code: string, characterCode: CharacterNameKeys, markAsFound: boolean) => void;
}

export default function ViewAllCodesModal({
  isOpen,
  onClose,
  codes,
  foundCharacters,
  onAssociateCodeWithCharacter,
}: ViewAllCodesModalProps) {
  // State for character selection modal
  const [characterSelectionModalOpen, setCharacterSelectionModalOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  // Transform data structure from character-to-codes to code-to-characters
  const codeToCharacters: Record<string, CharacterNameKeys[]> = {};
  
  // Populate the code-to-characters mapping
  Object.entries(codes).forEach(([characterCode, characterCodes]) => {
    if (characterCodes && characterCodes.length > 0) {
      characterCodes.forEach(code => {
        if (!codeToCharacters[code]) {
          codeToCharacters[code] = [];
        }
        codeToCharacters[code].push(characterCode as CharacterNameKeys);
      });
    }
  });

  // Get all found codes
  const foundCodes = Object.keys(codeToCharacters);
  
  // Sort found codes alphabetically
  const sortedFoundCodes = foundCodes.sort();

  // Generate all possible codes from 1 to 50
  const allPossibleCodes = Array.from({ length: 50 }, (_, i) => String(i + 1));
  
  // Create "not found" codes list by filtering out found codes
  const notFoundCodes = allPossibleCodes.filter(code => !foundCodes.includes(code));
  
  // Count total found codes
  const totalFoundCodes = sortedFoundCodes.length;
  
  // Count total not found codes
  const totalNotFoundCodes = notFoundCodes.length;

  // Handle clicking on a not found code
  const handleNotFoundCodeClick = (code: string) => {
    setSelectedCode(code);
    setCharacterSelectionModalOpen(true);
  };

  // Handle character selection
  const handleSelectCharacter = (characterCode: CharacterNameKeys, markAsFound: boolean) => {
    if (selectedCode) {
      onAssociateCodeWithCharacter(selectedCode, characterCode, markAsFound);
      setCharacterSelectionModalOpen(false);
      setSelectedCode(null);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if the backdrop itself was clicked, not its children
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto relative">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-xl font-bold mb-4">All Egg Codes</h2>
        
        {/* Found Codes Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Found Codes</h3>
          <p className="text-gray-600 mb-3">
            Total found: <span className="font-bold">{totalFoundCodes}</span>
          </p>
          
          {sortedFoundCodes.length > 0 ? (
            <ul className="pl-5 space-y-2">
              {sortedFoundCodes.map((code) => {
                const characters = codeToCharacters[code];
                const characterNames = characters.map(char => CharacterName[char]);
                
                return (
                  <li key={code} className="text-lg flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <div>
                      <span className="font-medium">{code}</span>
                      <span className="text-gray-600"> ({characterNames.join(', ')})</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-500 py-2">No codes found yet</p>
          )}
        </div>
        
        {/* Not Found Codes Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Not Found Codes</h3>
          <p className="text-gray-600 mb-3">
            Total not found: <span className="font-bold">{totalNotFoundCodes}</span>
          </p>
          
          {notFoundCodes.length > 0 ? (
            <ul className="grid grid-cols-5 gap-2 px-2">
              {notFoundCodes.map((code) => (
                <li 
                  key={code} 
                  className="text-center py-1 bg-gray-50 rounded cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleNotFoundCodeClick(code)}
                >
                  <span className="font-medium">{code}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 py-2">All codes have been found!</p>
          )}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
      
      {/* Character Selection Modal */}
      {selectedCode && (
        <CharacterSelectionModal
          isOpen={characterSelectionModalOpen}
          onClose={() => setCharacterSelectionModalOpen(false)}
          onSelectCharacter={handleSelectCharacter}
          code={selectedCode}
          foundCharacters={foundCharacters}
        />
      )}
    </div>
  );
}