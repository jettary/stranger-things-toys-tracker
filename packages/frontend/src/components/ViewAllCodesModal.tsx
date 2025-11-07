'use client';

import { CharacterName, CharacterNameKeys } from '@/constants/characters';

interface ViewAllCodesModalProps {
  isOpen: boolean;
  onClose: () => void;
  codes: Record<CharacterNameKeys, string[]>;
  found: Record<CharacterNameKeys, boolean>;
}

export default function ViewAllCodesModal({
  isOpen,
  onClose,
  codes,
  found,
}: ViewAllCodesModalProps) {
  if (!isOpen) return null;

  // Get all characters that have codes
  const charactersWithCodes = Object.entries(codes)
    .filter(([_, characterCodes]) => characterCodes && characterCodes.length > 0)
    .map(([characterCode]) => characterCode as CharacterNameKeys);

  // Sort characters by name
  const sortedCharacters = charactersWithCodes.sort((a, b) => {
    const nameA = CharacterName[a as CharacterNameKeys];
    const nameB = CharacterName[b as CharacterNameKeys];
    return nameA.localeCompare(nameB);
  });

  // Count total codes
  const totalCodes = Object.values(codes).reduce(
    (sum, characterCodes) => sum + (characterCodes?.length || 0),
    0
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">All Egg Codes</h2>
        <p className="text-gray-600 mb-4">
          Total codes: <span className="font-bold">{totalCodes}</span>
        </p>

        {sortedCharacters.length > 0 ? (
          <div className="space-y-4">
            {sortedCharacters.map((characterCode) => (
              <div key={characterCode} className="border rounded p-3">
                <h3 className="font-bold mb-2 flex items-center">
                  {CharacterName[characterCode]}
                  {found[characterCode] && (
                    <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Found
                    </span>
                  )}
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  {codes[characterCode]?.map((code, index) => (
                    <li key={index}>{code}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
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