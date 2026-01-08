import { useState, useEffect } from "react";
import { Character } from "@/types/character";
import { getEpisodesByIds } from "@/services/rickAndMortyAPI";

export const useEpisodesComparison = (char1: Character | null, char2: Character | null) => {
    const [data, setData] = useState<{
      only1: any[],
      shared: any[],
      only2: any[] // <--- CAMBIA [] POR any[] AQUÍ
    }>({ 
      only1: [], 
      shared: [], 
      only2: [] 
    });
    
    const [loading, setLoading] = useState(false);
    // ... resto del código igual

  useEffect(() => {
    if (!char1 || !char2) return;

    const fetchEpisodesData = async () => {
      setLoading(true);
      try {
        // Extraemos IDs de las URLs: "https://.../episode/1" -> "1"
        const ids1 = char1.episode.map(url => url.split('/').pop()!);
        const ids2 = char2.episode.map(url => url.split('/').pop()!);

        // Lógica de conjuntos
        const sharedIds = ids1.filter(id => ids2.includes(id));
        const only1Ids = ids1.filter(id => !ids2.includes(id));
        const only2Ids = ids2.filter(id => !ids1.includes(id));

        // Pedimos la información de todos los IDs únicos necesarios
        const allUniqueIds = Array.from(new Set([...ids1, ...ids2]));
        const allEpisodesData = await getEpisodesByIds(allUniqueIds);

        // Mapeamos los datos para cada columna
        setData({
          only1: allEpisodesData.filter(ep => only1Ids.includes(String(ep.id))),
          shared: allEpisodesData.filter(ep => sharedIds.includes(String(ep.id))),
          only2: allEpisodesData.filter(ep => only2Ids.includes(String(ep.id))),
        });
      } catch (error) {
        console.error("Error comparando episodios", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodesData();
  }, [char1, char2]);

  return { ...data, loading };
};