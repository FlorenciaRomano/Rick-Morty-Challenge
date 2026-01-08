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
      
      {/* HEADER: Título y Buscador */}
      <div className="mb-3">
        <h2 className={`text-xs font-black uppercase tracking-[0.2em] mb-2 text-center ${accentColor}`}>
          {isRed ? "🥊 Player 1" : "⚡ Player 2"}
        </h2>
        <Search theme={theme} onSearch={(v) => { setSearchTerm(v); setPage(1); }} />
      </div>

      {/* LISTA: Cards con letra más grande y legible */}
      <div className={`flex-1 overflow-y-auto pr-1 custom-scrollbar ${isRed ? 'scrollbar-red' : 'scrollbar-blue'}`}>
        {loading ? (
          <div className="flex justify-center items-center h-full text-slate-500 text-xs font-bold uppercase italic animate-pulse">Buscando...</div>
        ) : characters && characters.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {characters.map((char) => (
              <div
                key={char.id}
                onClick={() => onSelect(char)}
                className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all border-2 h-[100px] group
                  ${selectedId === char.id ? selectedClass : "border-white/5 bg-white/5 hover:bg-white/10"}`}
              >
                {/* FOTO */}
                <div className="relative shrink-0">
                  <img src={char.image} alt={char.name} className="w-12 h-12 rounded-lg object-cover border border-white/10" />
                  <span className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-950 ${char.status === 'Alive' ? 'bg-green-500' : 'bg-red-500'}`} title={char.status} />
                </div>

                {/* INFO: Letra más grande y datos completos */}
                <div className="flex flex-col min-w-0 flex-1 justify-center">
                  <p className="font-black text-[11px] text-white uppercase truncate leading-tight mb-1">
                    {char.name}
                  </p>
                  <div className="space-y-0.5">
                    <p className="text-[9px] text-slate-400 font-bold leading-none">
                      {char.species} — <span className={char.status === 'Alive' ? 'text-green-400' : 'text-red-400'}>{char.status}</span>
                    </p>
                    <div className="pt-1 mt-1 border-t border-white/5">
                      <p className="text-[8px] text-slate-500 font-bold uppercase leading-none">Location:</p>
                      <p className="text-[9px] text-slate-300 truncate leading-tight">{char.location?.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full opacity-40">
            <span className="text-3xl mb-2">🛸</span>
            <p className="text-xs font-black uppercase italic text-slate-400 tracking-widest">Sin resultados</p>
          </div>
        )}
      </div>

      {/* PAGINACIÓN */}
      <div className="mt-3 pt-3 border-t border-white/5">
        <Pagination currentPage={page} totalPages={info?.pages || 1} onPageChange={setPage} />
      </div>
    </div>
  );
};