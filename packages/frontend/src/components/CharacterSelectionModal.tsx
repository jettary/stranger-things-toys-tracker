'use client';

import { useEffect, useRef } from 'react';
import { ALL_CHARACTERS, CharacterName, CharacterNameKeys } from '@/constants/characters';
import CharacterCard from './CharacterCard';

interface CharacterSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCharacter: (characterCode: CharacterNameKeys, markAsFound: boolean) => void;
  code: string;
  foundCharacters: Partial<Record<CharacterNameKeys, boolean>>;
}

export default function CharacterSelectionModal({
  isOpen,
  onClose,
  onSelectCharacter,
  code,
  foundCharacters,
}: CharacterSelectionModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if the backdrop itself was clicked, not its children
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCharacterSelect = (characterCode: CharacterNameKeys) => {
    // Determine if this character was previously not found
    const markAsFound = !foundCharacters[characterCode];
    onSelectCharacter(characterCode, markAsFound);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-xl font-bold mb-4">Select Character for Code {code}</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
          {ALL_CHARACTERS.map((characterCode, index) => {
            const isFound = Boolean(foundCharacters[characterCode as CharacterNameKeys]);
            return (
              <div 
                key={characterCode} 
                className={`cursor-pointer transition-transform transform hover:scale-105 ${!isFound ? 'ring-2 ring-yellow-400' : ''}`}
                onClick={() => handleCharacterSelect(characterCode as CharacterNameKeys)}
              >
                <CharacterCard
                  id={index + 1}
                  characterCode={characterCode as CharacterNameKeys}
                  isFound={isFound}
                />
                {!isFound && (
                  <div className="mt-1 text-center text-sm font-medium text-yellow-600">
                    Not found yet
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 mr-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}