import { ArrowPathIcon, MusicalNoteIcon } from '@heroicons/react/24/solid';
import { Button, Card } from '@/components';
import { useGuessNoteStore } from '../stores';
import { AnswerOptionsPanel } from './AnswerOptionsPanel';
import { IconPhase } from './IconPhase';

export const WaitingPhasePanel = () => {
  const {
    progress: { isPlaying },
    replay,
    playTonicOnly,
  } = useGuessNoteStore();

  return (
    <div className={'flex flex-col gap-4'}>
      <Card>
        <IconPhase phase={'waiting'} />

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

      <AnswerOptionsPanel />
    </div>
  );
};
