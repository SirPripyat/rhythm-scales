import { CheckIcon } from '@heroicons/react/24/solid';
import { clsx } from 'clsx';
import { Button, Card } from '@/components';
import { NOTE_SOLFEGE_LABELS } from '@/utils';
import { useGuessNoteStore } from '../stores';
import { AnswerOptionsPanel } from './AnswerOptionsPanel';
import { IconPhase } from './IconPhase';

export const CorrectPhasePanel = () => {
  const {
    progress: { streak, mysteryNote },
    nextRound,
  } = useGuessNoteStore();

  return (
    <div className={'flex flex-col gap-4'}>
      <Card>
        <IconPhase phase={'correct'} />

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

      <AnswerOptionsPanel />
    </div>
  );
};
