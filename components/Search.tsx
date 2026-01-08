interface SearchProps {
    onSearch: (value: string) => void;
    theme: "red" | "blue";
  }
  
  export const Search = ({ onSearch, theme }: SearchProps) => {
    const isRed = theme === "red";
    const accentBorder = isRed ? "focus:border-pink-500/50" : "focus:border-cyan-500/50";
    const iconColor = isRed ? "text-pink-500" : "text-cyan-500";
  
    return (
      <div className="relative">
        <div className={`absolute inset-y-0 left-3 flex items-center pointer-events-none ${iconColor}`}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          onChange={(e) => onSearch(e.target.value)}
          placeholder="SEARCH FIGHTER..."
          className={`w-full bg-black/40 border-2 border-white/10 rounded-xl py-2 pl-9 pr-4 text-[9px] font-black tracking-widest text-white outline-none transition-all ${accentBorder}`}
        />
      </div>
    );
  };