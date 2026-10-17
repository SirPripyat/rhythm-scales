import { ClockIcon } from '@heroicons/react/24/outline';
import { ArrowPathIcon, MusicalNoteIcon } from '@heroicons/react/24/solid';
import { clsx } from 'clsx';
import { Button, Card } from '@/components';
import { useGuessNoteStore } from '../stores';
import { GUESS_NOTE_DEGREES } from '../utils';
import { PickNote } from './PickNote';

export const WaitingPhasePanel = () => {
  const {
    derived: { notePool },
    progress: { isPlaying, phase, round },
    replay,
    playTonicOnly,
  } = useGuessNoteStore();

  const options = GUESS_NOTE_DEGREES.filter(({ note }) =>
    notePool.includes(note),
  );

  return (
    <div className={'flex flex-col gap-4'}>
      <Card>
        <div
          className={clsx(
            'relative flex flex-col items-center justify-center rounded-full size-14 border border-glass-border',
            isPlaying &&
              "after:content-[''] after:absolute after:-inset-px after:rounded-full after:border after:border-glow-teal after:animate-pulse-ring motion-reduce:after:animate-none",
          )}
        >
          <ClockIcon className={'size-7 text-ink-dim'} />
        </div>

        <div className={'flex flex-col gap-1 items-center'}>
          <h2 className={'font-display font-bold text-[1.1rem]'}>
            Qual é a <span className={'text-glow-teal'}>nota misteriosa?</span>
          </h2>
          <p className={'font-body text-ink-dim text-[13px]'}>
            Escolha um dos botões abaixo. Pode ouvir de novo quantas vezes
            quiser.
          </p>
        </div>

        <div
          className={
            'mt-4 flex flex-col gap-2 items-stretch w-full sm:flex-row sm:gap-4 sm:items-center sm:justify-center sm:w-auto'
          }
        >
          <Button hierarchy={'secondary'} onClick={replay} disabled={isPlaying}>
            <ArrowPathIcon className={'size-4'} />
            Ouvir de novo
          </Button>

          <Button
            hierarchy={'secondary'}
            onClick={playTonicOnly}
            disabled={isPlaying}
          >
            <MusicalNoteIcon className={'size-4'} />
            Só o Dó
          </Button>
        </div>
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
