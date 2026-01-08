import { useState, useEffect } from "react";
import { getEpisodesByIds } from "@/services/rickAndMortyAPI";
import { extractAndCompareIds } from "@/utils/episodeLogic";
import { Character, Episode } from "@/types/character";

export const useEpisodesComparison = (char1: Character | null, char2: Character | null) => {
  const [data, setData] = useState<{
    only1: Episode[];
    shared: Episode[];
    only2: Episode[];
  }>({
    only1: [],
    shared: [],
    only2: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEpisodes = async () => {
      // Early return: Evitamos ejecuciones innecesarias si el duelo no está completo.
      if (!char1 || !char2) return;
      
      setLoading(true);

      /**
       * Mantenngo el hook limpio delegando el cálculo de IDs a una utilidad pura.
       * Esto facilita el testing unitario de la lógica de comparación.
       */
      const { sharedIds, only1Ids, only2Ids } = extractAndCompareIds(char1, char2);

      try {
        /**
         * Optimisé la carga ejecutando las 3 peticiones de forma concurrente.
         * En lugar de esperar una por una (secuencial), reduje el tiempo de carga total.
         */
        const [resShared, resOnly1, resOnly2] = await Promise.all([
          getEpisodesByIds(sharedIds),
          getEpisodesByIds(only1Ids),
          getEpisodesByIds(only2Ids),
        ]);

        setData({
          shared: resShared,
          only1: resOnly1,
          only2: resOnly2,
        });
      } catch (error) {
        // TODO: Implementar un sistema de logging (Sentry/LogRocket) para producción
        console.error("Error fetching episodes comparisons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [char1, char2]);

  return { ...data, loading };
};