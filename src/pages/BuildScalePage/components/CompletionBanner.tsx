import { clsx } from 'clsx';
import { Button } from '@/components';
import { useGameStore } from '@/stores';
import { NOTE_LABELS, SCALE_TYPE_LABELS } from '@/utils';

export const CompletionBanner = () => {
  const {
    config: { root, scaleType },
    reset,
  } = useGameStore();

  return (
    <div
      className={clsx(
        'rounded-3xl border border-glow-teal/50 bg-glow-teal/10 px-5 py-6 backdrop-blur-xl',
        'flex flex-col items-center gap-3 text-center',
      )}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-glow-teal">
        Escala completa
      </p>
      <h2 className="text-balance font-display text-2xl font-bold text-ink">
        Você montou{' '}
        <span className="text-glow-violet">{SCALE_TYPE_LABELS[scaleType]}</span>{' '}
        a partir de <span className="text-glow-amber">{NOTE_LABELS[root]}</span>{' '}
        de cabeça e achou todas as posições no braço.
      </h2>

      <Button hierarchy={'secondary'} onClick={reset}>
        Jogar novamente
      </Button>
    </div>
  );
};
