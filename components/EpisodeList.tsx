interface Props {
  title: string;
  episodes: any[];
  loading?: boolean;
  color: "red" | "blue" | "cyan";
}

export const EpisodeList = ({ title, episodes, loading, color }: Props) => {
  // Mapeo de colores usando puramente Tailwind
  const colorVariants = {
    red: "border-red-500/30 bg-red-950/20 text-red-400",
    blue: "border-blue-500/30 bg-blue-950/20 text-blue-400",
    cyan: "border-cyan-500/30 bg-cyan-950/20 text-cyan-400",
  };

  return (
    <div className={`flex-1 rounded-[2.5rem] border p-6 flex flex-col h-[500px] shadow-2xl backdrop-blur-sm ${colorVariants[color]}`}>
      <h3 className="font-black border-b border-current pb-3 mb-4 uppercase tracking-tighter text-center italic">
        {title}
      </h3>
      
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3">
        {loading ? (
          <div className="space-y-3 animate-pulse">
            {[1, 2, 3].map(i => <div key={i} className="h-20 bg-white/5 rounded-2xl" />)}
          </div>
        ) : episodes.length === 0 ? (
          <div className="flex items-center justify-center h-full text-slate-500 italic text-sm">
            Sin datos de batalla
          </div>
        ) : (
          episodes.map((ep) => (
            <div key={ep.id} className="p-4 bg-black/20 rounded-2xl border border-white/5 hover:border-current transition-all group">
              <p className="font-bold text-sm group-hover:translate-x-1 transition-transform uppercase">
                {ep.episode}: {ep.name}
              </p>
              {/* FECHA DE EMISIÓN AGREGADA */}
              <p className="text-[10px] opacity-60 mt-1 font-bold italic uppercase tracking-widest">
                Air date: {ep.air_date}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};