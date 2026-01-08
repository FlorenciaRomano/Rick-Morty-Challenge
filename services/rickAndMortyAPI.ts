const BASE_URL = "https://rickandmortyapi.com/api";

// Para el listado de personajes (Paginación y Buscador)
export const getCharacters = async (page = 1, name = "") => {
  const response = await fetch(`${BASE_URL}/character?page=${page}&name=${name}`);
  if (!response.ok) throw new Error("Error al obtener personajes");
  return response.json();
};

// Para obtener los datos de los episodios (Nombres y fechas)
export const getEpisodesByIds = async (ids: string[]) => {
  if (ids.length === 0) return [];
  
  // Si mandas un array de IDs, la API te devuelve todos juntos
  const response = await fetch(`${BASE_URL}/episode/${ids.join(",")}`);
  if (!response.ok) throw new Error("Error al obtener episodios");
  
  const data = await response.json();
  // La API devuelve un objeto si es 1 solo, o un array si son varios. Normalizamos:
  return Array.isArray(data) ? data : [data];
};