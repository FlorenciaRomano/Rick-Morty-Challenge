import { Character } from "@/types/character";

/**
 * Compara los episodios de dos personajes y devuelve los IDs clasificados.
 */
export const extractAndCompareIds = (char1: Character, char2: Character) => {
  const getIds = (char: Character) => 
    char.episode.map(url => url.split('/').pop() || "");

  const ids1 = getIds(char1);
  const ids2 = getIds(char2);

  return {
    sharedIds: ids1.filter(id => ids2.includes(id)),
    only1Ids: ids1.filter(id => !ids2.includes(id)),
    only2Ids: ids2.filter(id => !ids1.includes(id))
  };
};