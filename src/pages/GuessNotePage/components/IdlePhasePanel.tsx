import { Button, Card } from '@/components';
import { useGuessNoteStore } from '../stores';
import { IconPhase } from './IconPhase';

export const IdlePhasePanel = () => {
  const { start } = useGuessNoteStore();

  return (
    <Card>
      <IconPhase phase={'idle'} />

      <div className={'flex flex-col gap-1 items-center'}>
        <h2 className={'font-display font-bold text-[1.1rem]'}>
          Pronto(a) para ouvir?
        </h2>
        <p className={'font-body text-ink-dim text-[13px]'}>
          Vamos tocar o Dó de referência e depois uma nota misteriosa da escala
        </p>
      </div>

      <Button onClick={start}>Começar treino</Button>
    </Card>
  );
};
