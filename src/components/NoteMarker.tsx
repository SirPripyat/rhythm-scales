import { clsx } from 'clsx';
import type { FretboardPosition } from '@/types';
import { noteNameFromPitchClass } from '@/utils';

const VARIANT = {
  root: 'border-glow-amber/65 bg-glow-amber/60 text-on-amber shadow-root',
  scale: 'border-glow-teal/45 bg-glow-teal/38 text-ink text-shadow-note',
} as const;

type NoteMarkerProps = {
  position?: FretboardPosition;
  openPitchClass?: number;
  fret: number;
  midiNote: number;
  playNote: (note: number) => void;
};

export const NoteMarker = ({
  position,
  openPitchClass,
  fret,
  midiNote,
  playNote,
}: NoteMarkerProps) => {
  if (!position) {
    if (fret !== 0 || openPitchClass === undefined) return null;

    return (
      <span className="relative z-2 font-mono text-xs text-ink-faint">
        {noteNameFromPitchClass(openPitchClass)}
      </span>
    );
  }

  return (
    <button
      type="button"
      aria-label={`Tocar ${position.noteName}`}
      onClick={() => playNote(midiNote)}
      className={clsx(
        'relative z-2 flex size-8 cursor-pointer items-center justify-center rounded-full',
        'border font-mono text-[13px] font-bold backdrop-blur-[6px] transition',
        'after:absolute after:left-1.75 after:top-0.75 after:h-1.25 after:w-2',
        'after:rounded-full after:bg-white/40 after:blur-[2px]',
        position.isRoot ? VARIANT.root : VARIANT.scale,
      )}
    >
      {position.noteName}
    </button>
  );
};
