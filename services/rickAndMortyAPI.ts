const BASE_URL = "https://rickandmortyapi.com/api";

/**
 * Decidí usar Fetch API nativo de Next.js para aprovechar la optimización 
 * de caché del lado del servidor sin añadir dependencias como Axios.
 */

// Para el listado de personajes (Paginación y Buscador)
export const getCharacters = async (page = 1, name = "") => {
  const response = await fetch(`${BASE_URL}/character?page=${page}&name=${name}`);
  
  // TODO: Implementar un sistema de reintentos (retry) si la API falla por rate-limiting
  if (!response.ok) throw new Error("Error fetching characters");
  
  return response.json();
};

// Obtiene los datos de los episodios (Nombres y fechas)
export const getEpisodesByIds = async (ids: string[]) => {
  if (ids.length === 0) return [];
  
  /**
   * Nota técnica: La API de Rick & Morty tiene un comportamiento inconsistente:
   * devuelve un OBJETO si es un solo ID y un ARRAY si son varios.
   * Force el retorno de un array para mantener la consistencia en el tipado.
   */
  const response = await fetch(`${BASE_URL}/episode/${ids.join(",")}`);
  if (!response.ok) throw new Error("Error fetching episodes");
  
  const data = await response.json();
  
  return Array.isArray(data) ? data : [data];
};