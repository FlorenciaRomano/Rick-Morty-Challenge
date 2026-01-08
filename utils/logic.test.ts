import { Character } from "@/types/character";

// Definimos la función aquí mismo temporalmente para probar que el test corra
const extractAndCompareIds = (char1: Character, char2: Character) => {
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

const mockChar = (id: number, episodes: string[]): Character => ({
  id,
  name: `Char ${id}`,
  episode: episodes,
} as Character);

describe("Pruebas de Lógica de Comparación", () => {
  test("Debe identificar correctamente episodios compartidos", () => {
    const char1 = mockChar(1, ["https://api/1", "https://api/2"]);
    const char2 = mockChar(2, ["https://api/2", "https://api/3"]);

    const { sharedIds, only1Ids, only2Ids } = extractAndCompareIds(char1, char2);

    expect(sharedIds).toContain("2");
    expect(only1Ids).toContain("1");
    expect(only2Ids).toContain("3");
  });
});