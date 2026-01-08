import { useState } from "react";
import { useCharacters } from "@/hooks/useCharacter";
import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "./Search";
import { Pagination } from "./Pagination";

interface Props {
  title: string;
  theme: "red" | "blue";
  onSelect: (char: any) => void;
  selectedId?: number;
}

export const CharacterSelector = ({ title, theme, onSelect, selectedId }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const debounced = useDebounce(searchTerm, 500);
  const { characters, info, loading } = useCharacters(debounced, page);

  const isRed = theme === "red";
  const accentColor = isRed ? "text-pink-500" : "text-cyan-400";
  const selectedClass = isRed 
    ? "border-pink-500 bg-pink-500/20 shadow-[0_0_15px_rgba(219,39,119,0.3)]" 
    : "border-cyan-500 bg-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.3)]";

  return (
    <div className="flex flex-col h-[550px] w-full bg-slate-950/90 backdrop-blur-xl border border-white/10 rounded-[2rem] p-4 shadow-2xl">
      
      {/* HEADER COMPACTO */}
      <div className="mb-3 flex flex-col items-center">
        <h2 className={`text-[10px] font-black uppercase tracking-[0.4em] mb-2 ${accentColor}`}>
          {isRed ? "🥊 PLAYER 1" : "⚡ PLAYER 2"}
        </h2>
        <div className="w-full">
          <Search theme={theme} onSearch={(v) => { setSearchTerm(v); setPage(1); }} />
        </div>
      </div>

      {/* LISTA DE CARDS */}
      <div className={`flex-1 overflow-y-auto px-1 custom-scrollbar ${isRed ? 'scrollbar-red' : 'scrollbar-blue'}`}>
        {loading ? (
          <div className="flex justify-center items-center h-full text-slate-500 text-xs font-bold uppercase italic animate-pulse">Buscando...</div>
        ) : characters && characters.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 pb-2">
            {characters.map((char) => (
              <div
                key={char.id}
                onClick={() => onSelect(char)}
                /* Card más ancha (w-full) para que el texto no se rompa */
                className={`flex items-center gap-2 p-2 rounded-xl cursor-pointer transition-all border-2 h-[90px] w-full group
                  ${selectedId === char.id ? selectedClass : "border-white/5 bg-white/5 hover:bg-white/10"}`}
              >
                {/* FOTO MÁS PEQUEÑA (Contenedor reducido) */}
                <div className="relative shrink-0">
                  <img src={char.image} alt={char.name} className="w-9 h-9 rounded-lg object-cover border border-white/10" />
                  <span className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-slate-950 ${char.status === 'Alive' ? 'bg-green-500' : 'bg-red-500'}`} />
                </div>

                {/* INFO (Contenedores internos más pequeños) */}
                <div className="flex flex-col min-w-0 flex-1">
                  <p className="font-black text-[11px] text-white uppercase truncate leading-tight">
                    {char.name}
                  </p>
                  
                  {/* Contenedor de Especie/Status reducido */}
                  <p className="text-[8px] text-slate-400 font-bold truncate">
                    {char.species} • <span className={char.status === 'Alive' ? 'text-green-400' : 'text-red-400'}>{char.status}</span>
                  </p>
                  
                  {/* Div de Location con margen mínimo */}
                  <div className="mt-1 pt-1 border-t border-white/5 flex flex-col">
                    <span className="text-[7px] text-slate-500 font-black uppercase leading-none">Location</span>
                    <span className="text-[9px] text-slate-300 truncate leading-tight">{char.location?.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full opacity-40">
            <span className="text-3xl mb-2">🛸</span>
            <p className="text-[10px] font-black uppercase italic text-slate-400">Sin resultados</p>
          </div>
        )}
      </div>

      <div className="mt-2 pt-3 border-t border-white/5">
        <Pagination currentPage={page} totalPages={info?.pages || 1} onPageChange={setPage} />
      </div>
    </div>
  );
};