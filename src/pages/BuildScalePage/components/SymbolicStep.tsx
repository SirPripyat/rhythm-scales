import { useState } from 'react';
import { Button } from '@/components';
import { useGameStore } from '@/stores';
import { NOTE_LABELS, SCALE_TYPE_LABELS } from '@/utils';
import type { Status } from '../types';
import { NoteListbox, type NoteListboxStatus } from './NoteListbox';
import { StepCard } from './StepCard';

const RETRY_DELAY_MS = 500;

export const SymbolicStep = () => {
  const {
    config: { root, scaleType },
    derived: { symbolicAnswers },
    progress: {
      configConfirmed,
      symbolicAllCorrect,
      symbolicChecked,
      symbolicCorrectness,
    },
    answerSymbolic,
    checkSymbolic,
  } = useGameStore();

  const [isRetrying, setIsRetrying] = useState(false);

  const getStatus = (): Status => {
    if (!configConfirmed) return 'blocked';

    if (symbolicChecked && symbolicAllCorrect) return 'checked';

    return 'inProgress';
  };

  const status = getStatus();

  const isBlocked = status === 'blocked';

  const slotStatus = (index: number): NoteListboxStatus => {
    if (index === 0) return 'tonic';

    if (!symbolicChecked) return 'idle';

    const isCorrect = symbolicCorrectness[index];
    if (!isCorrect && isRetrying) return 'idle';

    return isCorrect ? 'correct' : 'wrong';
  };

  const correctCount = symbolicCorrectness.filter(
    (correct, i) => i !== 0 && correct,
  ).length;

  const totalAnswerable = symbolicAnswers.length - 1;
  const allFilled = symbolicAnswers.slice(1).every((answer) => answer !== null);

  const handleCheck = () => {
    if (symbolicChecked && !symbolicAllCorrect) {
      setIsRetrying(true);

      setTimeout(() => {
        checkSymbolic();
        setIsRetrying(false);
      }, RETRY_DELAY_MS);

      return;
    }

    checkSymbolic();
  };

  const getButtonLabel = () => {
    if (symbolicAllCorrect) return 'Completo';

    if (symbolicChecked) return 'Tentar de novo';

    return 'Conferir';
  };

  return (
    <StepCard
      status={status}
      index={2}
      title={'De cabeça'}
      blockedMessage={
        'Escolha a tônica e a escala acima pra liberar esta etapa.'
      }
    >
      <div className={'flex flex-col gap-1'}>
        <h2 className="text-balance font-display text-2xl font-bold text-ink">
          Monte{' '}
          <span className="text-glow-violet">
            {SCALE_TYPE_LABELS[scaleType]}
          </span>{' '}
          a partir de{' '}
          <span className="text-glow-amber">{NOTE_LABELS[root]}</span>
        </h2>
        <p className="mt-1.5 max-w-[65ch] text-sm text-ink-dim">
          Grau 1 é a tônica, já dada. Preencha os demais graus, na ordem, sem
          olhar o braço.
        </p>
      </div>

      <div className={'flex flex-wrap gap-4'}>
        {symbolicAnswers.map((answer, index) => (
          <NoteListbox
            index={index}
            value={answer}
            status={slotStatus(index)}
            disabled={isBlocked}
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={`${answer}-${index}`}
            onChange={(value) => answerSymbolic(index, value)}
          />
        ))}
      </div>

      <div className={'flex flex-wrap items-center justify-end gap-4'}>
        {symbolicChecked && (
          <p className="font-mono text-[13px] text-ink-faint">
            {correctCount}/{totalAnswerable} certos
          </p>
        )}

        <Button
          isLoading={isRetrying}
          onClick={handleCheck}
          disabled={symbolicAllCorrect || !allFilled || isRetrying}
        >
          {getButtonLabel()}
        </Button>
      </div>
    </StepCard>
  );
};
