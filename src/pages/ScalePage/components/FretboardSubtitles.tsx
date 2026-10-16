import { useFretboardStore } from '@/stores';
import { NOTE_LABELS, SCALE_TYPE_LABELS, TUNINGS_LABELS } from '@/utils';
import { Swatch } from './Swatch';

export const FretboardSubtitles = () => {
  const {
    config: { root, tuningKey, scaleType },
  } = useFretboardStore();

  return (
    <div
      className="flex flex-wrap items-center justify-between gap-3 font-mono text-[13px]
  text-ink-faint"
    >
      <span>
        Braço ·{' '}
        <span className="font-semibold text-ink">
          {NOTE_LABELS[root]} {SCALE_TYPE_LABELS[scaleType]} ·{' '}
          {TUNINGS_LABELS[tuningKey]}
        </span>
      </span>

      <div className="flex gap-4">
        <Swatch label="Tônica" isTonic />
        <Swatch label="Grau da escala" />
      </div>
    </div>
  );
};
