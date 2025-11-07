'use client';

import { useState, useEffect } from 'react';
import CharacterCard from '../components/CharacterCard';
import EggCodesModal from '../components/EggCodesModal';
import ViewAllCodesModal from '../components/ViewAllCodesModal';
import { ALL_CHARACTERS, CharacterNameKeys } from '@/constants/characters';
import { getCharacterData, saveCharacterData, getCharacterCodes } from '@/utils/localStorage';

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
  
  // State for tracking which characters are found
  const [found, setFound] = useState<Record<CharacterNameKeys, boolean>>({} as any);
  
  // State for tracking egg codes
  const [codes, setCodes] = useState<Record<CharacterNameKeys, string[]>>({} as any);
  
  // State for the egg codes modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterNameKeys | null>(null);
  
  // State for the view all codes modal
  const [viewAllCodesModalOpen, setViewAllCodesModalOpen] = useState(false);

  // Load data from local storage on component mount
  useEffect(() => {
    const data = getCharacterData();
    setFound(data.found || {});
    setCodes(data.codes || {});
  }, []);

  // Toggle collected status
  const toggleCollected = (id: number) => {
    setCollected(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Toggle found status
  const toggleFound = (characterCode: CharacterNameKeys) => {
    const newFound = {
      ...found,
      [characterCode]: !found[characterCode]
    };
    setFound(newFound);
    
    // Save to local storage
    saveCharacterData({
      found: newFound,
      codes
    });
  };

  // Open the egg codes modal
  const openEggCodesModal = (characterCode: CharacterNameKeys) => {
    setSelectedCharacter(characterCode);
    setModalOpen(true);
  };
  
  // Open the view all codes modal
  const openViewAllCodesModal = () => {
    setViewAllCodesModalOpen(true);
  };

  // Save egg codes
  const saveEggCodes = (newCodes: string[]) => {
    if (!selectedCharacter) return;
    
    const newCodesState = {
      ...codes,
      [selectedCharacter]: newCodes
    };
    
    setCodes(newCodesState);
    
    // Save to local storage
    saveCharacterData({
      found,
      codes: newCodesState
    });
  };

  // Calculate the total number of collected characters
  const collectedCount = Object.values(collected).filter(Boolean).length;
  
  // Calculate the total number of found characters
  const foundCount = Object.values(found).filter(Boolean).length;

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold mb-6">Stranger Things Toys Collection</h2>
      
      <div className="mb-6 flex flex-col sm:flex-row sm:space-x-6">
        <p className="text-lg">
          Collected: <span className="font-bold">{foundCount}</span> of <span className="font-bold">{characters.length}</span> characters
          <button 
            onClick={openViewAllCodesModal}
            className="ml-4 text-blue-500 hover:text-blue-700 hover:underline text-sm font-medium"
          >
            view all codes
          </button>
        </p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            characterCode={character.characterCode}
            id={character.id}
            isFound={!!found[character.characterCode]}
            onToggleFound={toggleFound}
            onEditCodes={openEggCodesModal}
          />
        ))}
      </div>
      
      {/* Egg Codes Modal */}
      {selectedCharacter && (
        <EggCodesModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          characterCode={selectedCharacter}
          initialCodes={codes[selectedCharacter] || []}
          onSave={saveEggCodes}
        />
      )}
      
      {/* View All Codes Modal */}
      <ViewAllCodesModal
        isOpen={viewAllCodesModalOpen}
        onClose={() => setViewAllCodesModalOpen(false)}
        codes={codes}
        found={found}
      />
    </div>
  );
}