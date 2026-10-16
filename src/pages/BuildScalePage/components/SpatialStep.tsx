import { Button } from '@/components';
import { MAX_SPATIAL_ATTEMPTS } from '@/constants';
import { StepCard } from '@/pages/BuildScalePage/components/StepCard.tsx';
import { useGameStore } from '@/stores';
import { NOTE_LABELS, SCALE_TYPE_LABELS } from '@/utils';
import type { Status } from '../types';
import { SpatialFretboard } from './SpatialFretboard';

export const SpatialStep = () => {
  const {
    config: { scaleType, root, fretCount },
    derived: { spatialTargets },
    progress: {
      symbolicAllCorrect,
      spatialAllCorrect,
      spatialChecked,
      spatialLockedCorrect,
      spatialAttempts,
    },
    checkSpatial,
    resetSpatial,
  } = useGameStore();

  const getStatus = (): Status => {
    if (!symbolicAllCorrect) return 'blocked';

    if (spatialAllCorrect) return 'checked';

    return 'inProgress';
  };

  const status = getStatus();
  const isBlocked = status === 'blocked';
  const blockedMessage = `Monte ${SCALE_TYPE_LABELS[scaleType]} a partir de ${NOTE_LABELS[root]} acima pra liberar esta etapa.`;

  return (
    <StepCard
      status={status}
      title={'No Braço'}
      index={3}
      blockedMessage={blockedMessage}
    >
      <div className={'flex flex-col gap-1'}>
        <h2 className="text-balance font-display text-2xl font-bold text-ink">
          Ache todas as notas da escala no braço
        </h2>
        <p className="mt-1.5 max-w-[65ch] text-sm text-ink-dim">
          Marque todas as posições até o traste {fretCount} — contando as cordas
          soltas (traste 0). A tônica já vem marcada; o resto você acha.
        </p>
      </div>

      <SpatialFretboard />

      <div className={'flex flex-wrap items-center justify-end gap-4'}>
        {spatialChecked && (
          <p className="font-mono text-[13px] text-ink-faint">
            {spatialLockedCorrect.size}/{spatialTargets.length} certos
            {!spatialAllCorrect &&
              ` · ${MAX_SPATIAL_ATTEMPTS - spatialAttempts} tentativa${
                MAX_SPATIAL_ATTEMPTS - spatialAttempts === 1 ? '' : 's'
              } restante${MAX_SPATIAL_ATTEMPTS - spatialAttempts === 1 ? '' : 's'}`}
          </p>
        )}

        <div className={'flex items-center gap-4'}>
          <Button
            hierarchy={'ghosted'}
            onClick={resetSpatial}
            disabled={isBlocked || spatialAllCorrect}
          >
            Resetar
          </Button>

          <Button
            onClick={checkSpatial}
            disabled={isBlocked || spatialAllCorrect}
          >
            {spatialAllCorrect ? 'Completo' : 'Conferir'}
          </Button>
        </div>
      </div>
    </StepCard>
  );
};
