'use client';

import { ReactNode } from 'react';

interface CharacterCardProps {
  row: number;
  col: number;
  characterCode?: string; // Optional parameter for future use
  id: number;
  name: string;
  isCollected: boolean;
  onToggleCollected: (id: number) => void;
}

export default function CharacterCard({
  row,
  col,
  characterCode,
  id,
  name,
  isCollected,
  onToggleCollected,
}: CharacterCardProps) {
  // Calculate the position for the background image
  // For 6 columns (0% to 100%), each step is 20% (100/5)
  // For 4 rows (0% to 100%), each step is 33.33% (100/3)
  const bgPositionX = `${col * 20}%`;
  const bgPositionY = `${row * 33.33}%`;

  return (
    <div 
      className={`
        relative aspect-square border rounded-lg overflow-hidden shadow-md 
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
        <p className="text-sm font-semibold truncate">{name}</p>
      </div>
      {isCollected && (
        <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
          ✓
        </div>
      )}
    </div>
  );
}