import { CharacterNameKeys } from "@/constants/characters";

// Define the structure for character data in local storage
export interface CharacterStorage {
  found: Record<CharacterNameKeys, boolean>;
  codes: Record<CharacterNameKeys, string[]>;
}

// Local storage key
const STORAGE_KEY = 'st-kj-tracker';

/**
 * Get character data from local storage
 */
export function getCharacterData(): CharacterStorage {
  if (typeof window === 'undefined') {
    return { found: {}, codes: {} };
  }
  
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (!storedData) {
    return { found: {}, codes: {} };
  }
  
  try {
    return JSON.parse(storedData) as CharacterStorage;
  } catch (error) {
    console.error('Failed to parse character data from local storage:', error);
    return { found: {}, codes: {} };
  }
}

/**
 * Save character data to local storage
 */
export function saveCharacterData(data: CharacterStorage): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save character data to local storage:', error);
  }
}

/**
 * Toggle found status for a character
 */
export function toggleCharacterFound(characterCode: CharacterNameKeys): void {
  const data = getCharacterData();
  data.found = {
    ...data.found,
    [characterCode]: !data.found[characterCode]
  };
  saveCharacterData(data);
}

/**
 * Save egg codes for a character
 */
export function saveCharacterCodes(characterCode: CharacterNameKeys, codes: string[]): void {
  const data = getCharacterData();
  data.codes = {
    ...data.codes,
    [characterCode]: codes
  };
  saveCharacterData(data);
}

/**
 * Get egg codes for a character
 */
export function getCharacterCodes(characterCode: CharacterNameKeys): string[] {
  const data = getCharacterData();
  return data.codes[characterCode] || [];
}

/**
 * Check if a character is found
 */
export function isCharacterFound(characterCode: CharacterNameKeys): boolean {
  const data = getCharacterData();
  return !!data.found[characterCode];
}