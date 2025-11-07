'use client';

import { CharacterName, CharacterNameKeys } from '@/constants/characters';

interface ViewAllCodesModalProps {
  isOpen: boolean;
  onClose: () => void;
  codes: Partial<Record<CharacterNameKeys, string[]>>;
  found: Partial<Record<CharacterNameKeys, boolean>>;
}

export default function ViewAllCodesModal({
  isOpen,
  onClose,
  codes,
  found,
}: ViewAllCodesModalProps) {
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

  // Get all unique codes
  const allCodes = Object.keys(codeToCharacters);
  
  // Sort codes alphabetically
  const sortedCodes = allCodes.sort();

  // Count total codes
  const totalCodes = sortedCodes.length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">All Egg Codes</h2>
        <p className="text-gray-600 mb-4">
          Total codes: <span className="font-bold">{totalCodes}</span>
        </p>

        {sortedCodes.length > 0 ? (
          <ul className="list-disc pl-5 space-y-2">
            {sortedCodes.map((code) => {
              const characters = codeToCharacters[code];
              const characterNames = characters.map(char => CharacterName[char]);
              
              return (
                <li key={code} className="text-lg">
                  <span className="font-medium">{code}</span>
                  <span className="text-gray-600"> ({characterNames.join(', ')})</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-gray-500 text-center py-8">No egg codes added yet</p>
        )}

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}