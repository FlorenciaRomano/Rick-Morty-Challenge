"use client";
import { useState } from "react";
import { CharacterSelector } from "@/components/CharacterSelector";
import { EpisodeList } from "@/components/EpisodeList";
import { useEpisodesComparison } from "@/hooks/useEpisodes";

export default function Home() {
  const [char1, setChar1] = useState<any>(null);
  const [char2, setChar2] = useState<any>(null);
  const { only1, shared, only2, loading } = useEpisodesComparison(char1, char2);

  const handleReset = () => {
    setChar1(null);
    setChar2(null);
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 p-4 md:p-8 font-sans selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <header className="text-center mb-10">
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            RICK & MORTY <span className="text-blue-500">ARENA</span>
          </h1>
          {(char1 || char2) && (
            <button 
              onClick={handleReset} 
              className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-500 text-white font-black rounded-full text-[10px] uppercase transition-all shadow-lg active:scale-95"
            >
              Restart Arena
            </button>
          )}
        </header>

        {/* CONTENEDORES DE LUCHADORES*/}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 relative mb-16 md:mb-24">
          
          {/* PLAYER 1 - NEÓN FUCSIA ORIGINAL */}
          <div className="p-[2px] rounded-[2.2rem] bg-gradient-to-br from-pink-600 to-red-900 shadow-[0_0_30px_rgba(219,39,119,0.15)]">
            <CharacterSelector 
              title="Fighter 1" 
              theme="red" 
              onSelect={setChar1} 
              selectedId={char1?.id} 
            />
          </div>

          {/* VS ICON */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-slate-950 border border-white/10 items-center justify-center z-20 shadow-2xl">
            <span className="text-sm font-black italic bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent">VS</span>
          </div>

          {/* PLAYER 2 */}
          <div className="p-[2px] rounded-[2.2rem] bg-gradient-to-br from-cyan-400 to-blue-900 shadow-[0_0_30px_rgba(34,211,238,0.15)]">
            <CharacterSelector 
              title="Fighter 2" 
              theme="blue" 
              onSelect={setChar2} 
              selectedId={char2?.id} 
            />
          </div>
        </div>

        {/* SECCIÓN DE RESULTADOS: Con validación dinámica de personajes */}
        <section>
          {!char1 || !char2 ? (
            <div className="max-w-4xl mx-auto text-center py-16 bg-slate-900/20 rounded-[3rem] border-2 border-dashed border-slate-800 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-4">
                <div className="flex gap-4 mb-2">
                  <div className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center text-xl transition-all duration-500 ${char1 ? 'border-pink-500 bg-pink-500/10 shadow-[0_0_15px_rgba(219,39,119,0.3)]' : 'border-slate-800 bg-slate-800/50'}`}>
                    {char1 ? '🥊' : '?'}
                  </div>
                  <div className="flex items-center text-slate-700 font-black italic text-sm">VS</div>
                  <div className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center text-xl transition-all duration-500 ${char2 ? 'border-cyan-500 bg-cyan-500/10 shadow-[0_0_15px_rgba(34,211,238,0.3)]' : 'border-slate-800 bg-slate-800/50'}`}>
                    {char2 ? '⚡' : '?'}
                  </div>
                </div>
                
                <p className="text-slate-400 font-black uppercase italic tracking-[0.2em] text-xs px-6">
                  {!char1 && !char2 && "Ready your combatants"}
                  {char1 && !char2 && `You need to select an opponent for ${char1.name.split(' ')[0]}`}
                  {!char1 && char2 && `You need to select an opponent for ${char2.name.split(' ')[0]}`}
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-5 duration-700">
              <EpisodeList 
                title={`${char1.name.split(' ')[0]} Only`} 
                episodes={only1} 
                loading={loading} 
                color="red" 
              />
              
              <div className="md:-mt-8 md:scale-105">
                <EpisodeList 
                  title="Shared Battles" 
                  episodes={shared} 
                  loading={loading} 
                  color="blue" 
                />
              </div>
              
              <EpisodeList 
                title={`${char2.name.split(' ')[0]} Only`} 
                episodes={only2} 
                loading={loading} 
                color="cyan" 
              />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}