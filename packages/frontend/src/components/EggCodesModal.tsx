'use client';

import { useState, useEffect } from 'react';
import { CharacterNameKeys, CharacterName } from '@/constants/characters';

interface EggCodesModalProps {
  isOpen: boolean;
  onClose: () => void;
  characterCode: CharacterNameKeys;
  initialCodes: string[];
  onSave: (codes: string[]) => void;
}

export default function EggCodesModal({
  isOpen,
  onClose,
  characterCode,
  initialCodes,
  onSave,
}: EggCodesModalProps) {
  const [codes, setCodes] = useState<string[]>(initialCodes);
  const [newCode, setNewCode] = useState('');
  const characterName = CharacterName[characterCode] as string;

  // Reset codes when the modal opens with new initialCodes
  useEffect(() => {
    setCodes(initialCodes);
  }, [initialCodes, isOpen]);

  if (!isOpen) return null;

  const handleAddCode = () => {
    if (newCode.trim()) {
      setCodes([...codes, newCode.trim()]);
      setNewCode('');
    }
  };

  const handleRemoveCode = (index: number) => {
    setCodes(codes.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave(codes);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCode();
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
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-xl font-bold mb-4">Edit Egg Codes for {characterName}</h2>
        
        <div className="mb-4">
          <div className="flex mb-2">
            <input
              type="text"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter egg code"
              className="flex-1 border rounded-l px-3 py-2"
            />
            <button
              onClick={handleAddCode}
              className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          
          {codes.length > 0 ? (
            <ul className="border rounded divide-y">
              {codes.map((code, index) => (
                <li key={index} className="flex justify-between items-center p-2">
                  <span>{code}</span>
                  <button
                    onClick={() => handleRemoveCode(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-2">No egg codes added yet</p>
          )}
        </div>
        
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}