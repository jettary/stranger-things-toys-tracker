'use client';

import { ALL_CHARACTERS, CharacterName, CharacterNameKeys } from '@/constants/characters';

interface CharacterCardProps {
  id: number;
  characterCode: CharacterNameKeys;
  isCollected: boolean;
  onToggleCollected: (id: number) => void;
}

export default function CharacterCard({
  id,
  characterCode,
  isCollected,
  onToggleCollected,
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

  return (
    <div 
      className={`
        relative aspect-[20/30] border rounded-lg overflow-hidden shadow-md 
        hover:shadow-lg transition-shadow cursor-pointer
        ${isCollected ? 'ring-4 ring-green-500' : ''}
      `}
      onClick={() => onToggleCollected(id)}
    >
      <div 
        className="w-full h-full bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('/540449214_790387417048489_8940474680171756389_n.jpg')`,
          backgroundSize: '600% 400%', // 6 columns, 4 rows
          backgroundPosition: `${bgPositionX} ${bgPositionY}`,
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 text-center">
        <p className="text-sm font-semibold truncate">{characterName}</p>
      </div>
      {isCollected && (
        <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
          ✓
        </div>
      )}
    </div>
  );
}