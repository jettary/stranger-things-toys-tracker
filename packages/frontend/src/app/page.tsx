'use client';

import { useState } from 'react';

// Define the structure for character data
interface Character {
  id: number;
  row: number;
  col: number;
  name: string;
}

export default function Home() {
  // Define the characters with their positions in the grid
  const characters: Character[] = Array.from({ length: 24 }, (_, index) => {
    const row = Math.floor(index / 6);
    const col = index % 6;
    return {
      id: index + 1,
      row,
      col,
      name: `Character ${index + 1}`,
    };
  });

  // State for tracking which characters are collected
  const [collected, setCollected] = useState<Record<number, boolean>>({});

  // Toggle collected status
  const toggleCollected = (id: number) => {
    setCollected(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Calculate the total number of collected characters
  const collectedCount = Object.values(collected).filter(Boolean).length;

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold mb-6">Stranger Things Toys Collection</h2>
      
      <div className="mb-6">
        <p className="text-lg">
          Collected: <span className="font-bold">{collectedCount}</span> of <span className="font-bold">24</span> characters
        </p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {characters.map((character) => {
          // Calculate the position for the background image
          // For 6 columns (0% to 100%), each step is 20% (100/5)
          // For 4 rows (0% to 100%), each step is 33.33% (100/3)
          const bgPositionX = `${character.col * 20}%`;
          const bgPositionY = `${character.row * 33.33}%`;
          
          return (
            <div 
              key={character.id} 
              className={`
                relative aspect-square border rounded-lg overflow-hidden shadow-md 
                hover:shadow-lg transition-shadow cursor-pointer
                ${collected[character.id] ? 'ring-4 ring-green-500' : ''}
              `}
              onClick={() => toggleCollected(character.id)}
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
                <p className="text-sm font-semibold truncate">{character.name}</p>
              </div>
              {collected[character.id] && (
                <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                  ✓
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}