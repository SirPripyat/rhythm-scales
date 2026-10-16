import { useGuessNoteStore } from '../stores';
import { ScoreCard } from './ScoreCard';

export const ScoreBoard = () => {
  const {
    progress: { score, total, streak },
  } = useGuessNoteStore();

  return (
    <div className={'flex gap-3'}>
      <ScoreCard label={'Sequência'} result={`${streak}`} />
      <ScoreCard label={'Acertos'} result={`${score}/${total}`} />
    </div>
  );
};
