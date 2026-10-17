import { XMarkIcon } from '@heroicons/react/24/solid';
import { clsx } from 'clsx';
import { Button, Card } from '@/components';
import { NOTE_SOLFEGE_LABELS } from '@/utils';
import { useGuessNoteStore } from '../stores';
import { GUESS_NOTE_DEGREES } from '../utils';
import { PickNote } from './PickNote';

export const IncorrectPhasePanel = () => {
  const {
    derived: { notePool },
    progress: { round, phase, mysteryNote, chosenNote },
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
            'relative flex flex-col items-center justify-center rounded-full size-14 border border-glow-rose bg-glow-rose/22',
          )}
        >
          <XMarkIcon className={'size-7 text-glow-rose'} />
        </div>

        <div className={'flex flex-col gap-1 items-center'}>
          {mysteryNote !== null && chosenNote !== null && (
            <h2 className={'font-display font-bold text-[1.1rem]'}>
              Era
              <span className={'text-glow-teal'}>
                {' '}
                {NOTE_SOLFEGE_LABELS[mysteryNote]}
              </span>
              , você escolheu{' '}
              <span className={'text-glow-rose'}>
                {NOTE_SOLFEGE_LABELS[chosenNote]}
              </span>
              .
            </h2>
          )}
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

      <div className={'flex flex-wrap items-center justify-center gap-3'}>
        {options.map((note) => (
          <PickNote key={note.note} note={note} phase={phase} />
        ))}
      </div>
    </div>
  );
};
