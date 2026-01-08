interface SearchProps {
    onSearch: (value: string) => void;
    theme: "red" | "blue";
  }
  
  export const Search = ({ onSearch, theme }: SearchProps) => {
    const isRed = theme === "red";
    const accentBorder = isRed ? "focus:border-pink-500/50" : "focus:border-cyan-500/50";
    const iconColor = isRed ? "text-pink-600" : "text-cyan-600";
  
    return (
      <div className="relative max-w-[200px] mx-auto"> {}
        <div className={`absolute inset-y-0 left-2.5 flex items-center pointer-events-none ${iconColor}`}>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          onChange={(e) => onSearch(e.target.value)}
          placeholder="BUSCAR..."
          className={`w-full bg-black/20 border border-white/10 rounded-lg py-1.5 pl-8 pr-3 text-[9px] font-bold tracking-tighter text-white placeholder:text-slate-600 outline-none transition-all ${accentBorder}`}
        />
      </div>
    );
  };