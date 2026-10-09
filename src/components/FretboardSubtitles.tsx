import { useFretboardStore } from '@/stores';
import { NOTE_LABELS, SCALE_TYPE_LABELS, TUNINGS_LABELS } from '@/utils';

const Swatch = ({
  label,
  isTonic = false,
}: {
  label: string;
  isTonic?: boolean;
}) => (
  <span className="flex items-center gap-1.5 font-mono text-[11px] text-ink-dim">
    <span
      className={`h-2.5 w-2.5 rounded-full ${
        isTonic ? 'bg-glow-amber' : 'bg-glow-teal'
      }`}
    />
    {label}
  </span>
);
export const FretboardSubtitles = () => {
  const { root, tuningKey, scaleType } = useFretboardStore();

  return (
    <div
      className="flex items-center justify-between font-mono text-[13px]
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
