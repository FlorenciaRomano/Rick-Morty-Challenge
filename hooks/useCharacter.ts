import { useState, useEffect } from "react";
import { Character, ApiResponse } from "@/types/character"; // Importamos ApiResponse
import { getCharacters } from "@/services/rickAndMortyAPI";

export const useCharacters = (name = "", page = 1) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [info, setInfo] = useState<ApiResponse['info'] | null>(null); // Guardamos la info de paginación
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCharacters(page, name);
        setCharacters(data.results);
        setInfo(data.info); // Guardamos cuántas páginas hay, etc.
      } catch (err) {
        setError("No se encontraron personajes");
        setCharacters([]);
        setInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [name, page]); // Reacciona si cambia el nombre O la página

  return { characters, info, loading, error };
};