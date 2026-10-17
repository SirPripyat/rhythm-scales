import { clsx } from 'clsx';
import { useGuessNoteStore } from '../stores';
import type { GuessNoteDegree, GuessNotePhase } from '../types';

type PickNoteProps = {
  note: GuessNoteDegree;
  phase: GuessNotePhase;
};

export const PickNote = ({ note, phase }: PickNoteProps) => {
  const {
    chooseAnswer,
    progress: { mysteryNote, chosenNote },
  } = useGuessNoteStore();

  const isCorrect = phase !== 'waiting' && note.note === mysteryNote;
  const isWrongChoice = phase === 'incorrect' && note.note === chosenNote;
  const isRevealed = isCorrect || isWrongChoice;

  return (
    <button
      type={'button'}
      onClick={() => chooseAnswer(note.note)}
      className={clsx(
        'cursor-pointer flex flex-col gap-1 items-center justify-center border border-glass-border bg-glass',
        'rounded-2xl h-20 w-30 enabled:hover:border-glow-teal transition disabled:cursor-not-allowed',
        !isRevealed && 'disabled:opacity-50',
        isCorrect && 'border-glow-teal bg-glow-teal/22',
        isWrongChoice && 'border-glow-rose bg-glow-rose/22',
      )}
      disabled={phase !== 'waiting'}
    >
      <h3
        className={clsx(
          'font-bold',
          isCorrect && 'text-glow-teal',
          phase === 'waiting' && 'text-ink',
        )}
      >
        {note.label}
      </h3>
      <p
        className={
          'text-ink-faint font-normal text-[9.5px] trailing-[0.02em] font-mono'
        }
      >
        {note.hint}
      </p>
    </button>
  );
};
