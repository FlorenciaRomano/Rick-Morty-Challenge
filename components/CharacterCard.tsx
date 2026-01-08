import Image from 'next/image';
import { Character } from '@/types/character';

interface Props {
  character: Character;
}

export const CharacterCard = ({ character }: Props) => {
  // Un pequeño helper para el color del status
  const statusColor = {
    Alive: 'bg-green-500',
    Dead: 'bg-red-500',
    unknown: 'bg-gray-500',
  };

  return (
    <div className="group overflow-hidden rounded-xl bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-slate-800">
      <div className="relative h-64 w-full">
        <Image
          src={character.image}
          alt={character.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      
      <div className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <span className={`h-3 w-3 rounded-full ${statusColor[character.status] || 'bg-gray-500'}`} />
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
            {character.status} - {character.species}
          </p>
        </div>

        <h3 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
          {character.name}
        </h3>

        <div className="space-y-2">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Última ubicación conocida:</p>
            <p className="text-sm text-slate-800 dark:text-slate-200">{character.location.name}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Origen:</p>
            <p className="text-sm text-slate-800 dark:text-slate-200">{character.origin.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};