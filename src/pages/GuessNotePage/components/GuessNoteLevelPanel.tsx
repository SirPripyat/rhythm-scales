import { Chip } from '@/components';
import { useGuessNoteStore } from '../stores';
import {
  GUESS_NOTE_LEVEL_OPTIONS,
  GUESS_NOTE_LEVEL_POOL_LABELS,
} from '../utils';

export const GuessNoteLevelPanel = () => {
  const {
    configure,
    config: { level },
  } = useGuessNoteStore();

  return (
    <div className={'flex justify-between items-center'}>
      <div className={'flex gap-2'}>
        {GUESS_NOTE_LEVEL_OPTIONS.map(({ id, label }) => (
          <Chip
            key={id}
            onClick={() => configure({ level: id })}
            active={level === id}
          >
            {label}
          </Chip>
        ))}
      </div>

      <p className={'font-mono text-[0.8rem] text-ink-faint w-fit'}>
        Notas em Jogo: {GUESS_NOTE_LEVEL_POOL_LABELS[level]}
      </p>
    </div>
  );
};
