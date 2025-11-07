'use client';

import { useState } from 'react';
import CharacterCard from '../components/CharacterCard';
import { CharacterName, ALL_CHARACTERS, CharacterNameKeys } from '@/constants/characters';

// Define the structure for character data
interface Character {
  id: number;
  characterCode: CharacterNameKeys;
}

export default function Home() {
  // Define the characters based on CharacterName enum
  const characters: Character[] = ALL_CHARACTERS.map((code, index) => {
    return {
      id: index + 1,
      characterCode: code as CharacterNameKeys,
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
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            characterCode={character.characterCode}
            id={character.id}
            isCollected={!!collected[character.id]}
            onToggleCollected={toggleCollected}
          />
        ))}
      </div>
    </div>
  );
}