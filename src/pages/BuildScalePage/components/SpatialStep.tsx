import { clsx } from 'clsx';
import { Button } from '@/components';
import { MAX_SPATIAL_ATTEMPTS } from '@/constants';
import { useGameStore } from '@/stores';
import { NOTE_LABELS, SCALE_TYPE_LABELS } from '@/utils';
import type { Status } from '../types';
import { SpatialFretboard } from './SpatialFretboard';
import { StatusLabel } from './StatusLabel';
import { Title } from './Title';

export const SpatialStep = () => {
  const {
    symbolicAllCorrect,
    spatialAllCorrect,
    spatialChecked,
    spatialLockedCorrect,
    spatialAttempts,
    spatialTargets,
    scaleType,
    root,
    fretCount,
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

  return (
    <div
      className={clsx(
        'relative rounded-3xl border border-glass-border bg-glass px-5 py-6 backdrop-blur-xl flex flex-col gap-6',
      )}
    >
      <div className={'flex justify-between items-center'}>
        <Title index={3}>No Braço</Title>

        <StatusLabel status={status} />
      </div>

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

      <div className={'flex items-center justify-end gap-10'}>
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

      {isBlocked && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-3xl bg-void/72 p-6 text-center backdrop-blur-[2px]">
          <p className="max-w-[40ch] font-mono text-[12px] text-ink">
            Monte {SCALE_TYPE_LABELS[scaleType]} a partir de {NOTE_LABELS[root]}{' '}
            acima pra liberar esta etapa.
          </p>
        </div>
      )}
    </div>
  );
};
