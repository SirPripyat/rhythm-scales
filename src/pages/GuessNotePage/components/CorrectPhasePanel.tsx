import { CheckIcon } from '@heroicons/react/24/solid';
import { clsx } from 'clsx';
import { Button, Card } from '@/components';
import { NOTE_SOLFEGE_LABELS } from '@/utils';
import { useGuessNoteStore } from '../stores';
import { GUESS_NOTE_DEGREES } from '../utils';
import { PickNote } from './PickNote';

export const CorrectPhasePanel = () => {
  const {
    derived: { notePool },
    progress: { streak, round, phase, mysteryNote },
    nextRound,
  } = useGuessNoteStore();

  const options = GUESS_NOTE_DEGREES.filter(({ note }) =>
    notePool.includes(note),
  );

  return (
    <div className={'flex flex-col gap-4'}>
      <Card>
        <div
          className={clsx(
            'relative flex flex-col items-center justify-center rounded-full size-14 border border-glow-teal',
            'bg-glow-teal/22',
          )}
        >
          <CheckIcon className={'size-7 text-glow-teal'} />
        </div>

        <div className={'flex flex-col gap-1 items-center'}>
          {mysteryNote !== null && (
            <h2 className={'font-display font-bold text-[1.1rem]'}>
              Isso! Era
              <span className={'text-glow-teal'}>
                {' '}
                {NOTE_SOLFEGE_LABELS[mysteryNote]}
              </span>
            </h2>
          )}

          <p className={'font-body text-ink-dim text-[13px]'}>
            Sequência de {streak} {streak > 1 ? 'acertos' : 'acerto'}
          </p>
        </div>

        <Button onClick={nextRound}>Próxima</Button>
      </Card>

      <div
        className={
          'flex items-center justify-center text-ink-faint uppercase font-mono text-[12px] trailing-[0.12em]'
        }
      >
        Rodada {round}
      </div>

      <div className={'flex items-center justify-center gap-3'}>
        {options.map((note) => (
          <PickNote key={note.note} note={note} phase={phase} />
        ))}
      </div>
    </div>
  );
};
