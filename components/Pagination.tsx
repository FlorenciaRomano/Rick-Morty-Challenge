interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }
  
  export const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
    const getPages = () => {
      const pages = [];
      const maxVisible = 5;
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, start + maxVisible - 1);
      if (end === totalPages) start = Math.max(1, end - maxVisible + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      return pages;
    };
  
    if (totalPages <= 1) return null;
  
    return (
      <div className="flex items-center justify-center gap-1.5">
        <button onClick={() => onPageChange(1)} disabled={currentPage === 1} className="p-1.5 text-slate-500 hover:text-white disabled:opacity-10 transition-colors text-xs">«</button>
        
        {getPages().map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-8 h-8 rounded-lg text-xs font-black transition-all border
              ${currentPage === p 
                ? "bg-blue-600 border-blue-400 text-white shadow-[0_0_10px_rgba(37,99,235,0.4)]" 
                : "border-white/10 bg-white/5 text-slate-400 hover:text-white"
              }`}
          >
            {p}
          </button>
        ))}
  
        <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} className="p-1.5 text-slate-500 hover:text-white disabled:opacity-10 transition-colors text-xs">»</button>
      </div>
    );
  };