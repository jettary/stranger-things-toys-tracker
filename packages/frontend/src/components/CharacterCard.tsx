'use client';

import { ALL_CHARACTERS, CharacterName, CharacterNameKeys } from '@/constants/characters';

interface CharacterCardProps {
  id: number;
  characterCode: CharacterNameKeys;
  isCollected: boolean;
  onToggleCollected: (id: number) => void;
  isFound?: boolean;
  onToggleFound?: (characterCode: CharacterNameKeys) => void;
  onEditCodes?: (characterCode: CharacterNameKeys) => void;
  eggCodes?: string[];
}

export default function CharacterCard({
  id,
  characterCode,
  isCollected,
  onToggleCollected,
  isFound = false,
  onToggleFound,
  onEditCodes,
  eggCodes = [],
}: CharacterCardProps) {
  // Get the index of the character in the enum
  const characterIndex = ALL_CHARACTERS.indexOf(characterCode);
  const characterName: string = CharacterName[characterCode] as string;
  
  // Calculate row and column based on the index
  const row = Math.floor(characterIndex / 6);
  const col = characterIndex % 6;
  
  // Calculate the position for the background image
  // For 6 columns (0% to 100%), each step is 20% (100/5)
  // For 4 rows (0% to 100%), each step is 33.33% (100/3)
  const bgPositionX = `${col * 20}%`;
  const bgPositionY = `${row * 33.33}%`;

  // Handle card click without interfering with button clicks
  const handleCardClick = (e: React.MouseEvent) => {
    // Only toggle collected if the click was directly on the card (not on a button)
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.card-background')) {
      onToggleCollected(id);
    }
  };

  // Prevent event propagation for button clicks
  const handleButtonClick = (e: React.MouseEvent, callback?: Function) => {
    e.stopPropagation();
    if (callback) callback();
  };

  return (
    <div 
      className={`
        relative aspect-[20/30] border rounded-lg overflow-hidden shadow-md 
        hover:shadow-lg transition-shadow cursor-pointer
        ${isCollected ? 'ring-4 ring-green-500' : ''}
        ${isFound ? 'ring-4 ring-blue-500' : ''}
      `}
      onClick={handleCardClick}
    >
      <div 
        className="w-full h-full bg-cover bg-no-repeat card-background"
        style={{
          backgroundImage: `url('/540449214_790387417048489_8940474680171756389_n.jpg')`,
          backgroundSize: '600% 400%', // 6 columns, 4 rows
          backgroundPosition: `${bgPositionX} ${bgPositionY}`,
        }}
      />
      
      {/* Character name */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 text-center">
        <p className="text-sm font-semibold truncate">{characterName}</p>
        
        {/* Display egg codes if available */}
        {eggCodes && eggCodes.length > 0 && (
          <p className="text-xs text-gray-300 truncate mt-1">
            Codes: {eggCodes.join(', ')}
          </p>
        )}
      </div>
      
      {/* Action buttons */}
      <div className="absolute top-2 right-2 flex flex-col space-y-2">
        {/* Collected indicator */}
        {isCollected && (
          <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
            ✓
          </div>
        )}
        
        {/* Found button */}
        {onToggleFound && (
          <button
            className={`w-6 h-6 rounded-full flex items-center justify-center ${
              isFound ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
            }`}
            onClick={(e) => handleButtonClick(e, () => onToggleFound(characterCode))}
            title={isFound ? "Mark as not found" : "Mark as found"}
          >
            👁️
          </button>
        )}
        
        {/* Edit codes button */}
        {onEditCodes && (
          <button
            className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center"
            onClick={(e) => handleButtonClick(e, () => onEditCodes(characterCode))}
            title="Edit egg codes"
          >
            🔖
          </button>
        )}
      </div>
    </div>
  );
}