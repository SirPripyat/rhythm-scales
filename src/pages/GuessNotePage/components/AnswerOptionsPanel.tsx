import { useGuessNoteStore } from '../stores';
import { PickNote } from './PickNote';

export const AnswerOptionsPanel = () => {
  const {
    derived: { answerOptions },
    progress: { round, phase },
  } = useGuessNoteStore();

  return (
    <>
      <div
        className={
          'flex items-center justify-center text-ink-faint uppercase font-mono text-[12px] trailing-[0.12em]'
        }
      >
        Rodada {round}
      </div>

      <div className={'flex flex-wrap items-center justify-center gap-3'}>
        {answerOptions.map((note) => (
          <PickNote key={note.note} note={note} phase={phase} />
        ))}
      </div>
    </>
  );
};
