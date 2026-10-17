import { SectionIntro } from '@/components';
import { GuessNoteLevelPanel, NoteAnswerGrid, ScoreBoard } from './components';

export const GuessNotePage = () => {
  return (
    <>
      <div className={'flex flex-wrap justify-between items-center gap-4'}>
        <SectionIntro
          eyebrow={'Advinhar a nota'}
          title={'Treino de ouvido'}
          description={
            ' Toque o som, escute com atenção e escolha a nota correspondente. A cada rodada, uma nota'
          }
          glowColor={'teal'}
        />

        <ScoreBoard />
      </div>

      <GuessNoteLevelPanel />

      <NoteAnswerGrid />
    </>
  );
};
