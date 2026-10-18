import { Button, Card } from '@/components';
import { NOTE_SOLFEGE_LABELS } from '@/utils';
import { useGuessNoteStore } from '../stores';
import { AnswerOptionsPanel } from './AnswerOptionsPanel';
import { IconPhase } from './IconPhase';

export const IncorrectPhasePanel = () => {
  const {
    progress: { mysteryNote, chosenNote },
    nextRound,
  } = useGuessNoteStore();

  return (
    <div className={'flex flex-col gap-4'}>
      <Card>
        <IconPhase phase={'incorrect'} />

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

      <AnswerOptionsPanel />
    </div>
  );
};
