import { Character } from '@/types/character';
import { CharacterCard } from './CharacterCard';

interface Props {
  characters: Character[];
}

export const CharacterGrid = ({ characters }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {characters.map((char) => (
        <CharacterCard key={char.id} character={char} />
      ))}
    </div>
  );
};