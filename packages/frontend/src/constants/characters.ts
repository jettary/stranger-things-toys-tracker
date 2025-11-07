/**
 * Enum representing all available characters in the collection.
 * Names are left as indexed placeholders to be filled in later.
 */
export enum CharacterName {
  NANCY = "Nancy Wheeler",
  MIKE = "Mike Wheeler",
  LUCAS = "Lucas Sinclair",
  DEMOGORGON = "Demogorgon",
  STEVE = "Steve Harrington",
  ELEVEN = "Eleven",

  VECNA = "Vecna",
  ELEVEN_UD = "Eleven (Upside Down)",
  MAX_UD = "Max Mayfield (Upside Down)",
  ELEVEN_PAPERCLIP = "Eleven with Paperclip",
  DEMOGORGON_ALT = "Demogorgon Alternate",
  STEVE_AND_ROBIN = "Steve and Robin",

  ERICA = "Erica Sinclair",
  DEMOGORGON_PAPERCLIP = "Demogorgon with Paperclip",
  WILL = "Will Byers",
  MAX = "Max Mayfield",
  DUSTIN = "Dustin Henderson",
  HOPPER = "Jim Hopper",

  WILL_UD = "Will Byers (Upside Down)",
  STEVE_UD = "Steve Harrington (Upside Down)",
  EDDIE_UD = "Eddie Munson (Upside Down)",
  DUSTIN_UD = "Dustin Henderson (Upside Down)",
  HOPPER_UD = "Jim Hopper (Upside Down)",
  ROBIN_UD = "Robin Buckley (Upside Down)",
}

/**
 * Array of all character names for easy iteration
 */
export const ALL_CHARACTERS = Object.values(CharacterName);