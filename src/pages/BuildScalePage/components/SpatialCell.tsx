import { clsx } from 'clsx';
import { GuitarString } from '@/components';
import { positionKey, useGameStore } from '@/stores';
import type { Note } from '@/types';
import { NOTE_LABELS } from '@/utils';
import { PickNoteListbox } from './PickNoteListbox';

type SpatialCellProps = {
  fret: number;
  stringIndex: number;
  isRoot: boolean;
};

const TonicCell = () => {
  const { root } = useGameStore();

  return (
    <div
      className={clsx(
        'relative z-2 flex size-8 items-center justify-center rounded-full',
        'border font-mono text-[13px] font-bold backdrop-blur-[6px] transition',
        'after:absolute after:left-1.75 after:top-0.75 after:h-1.25 after:w-2',
        'after:rounded-full after:bg-white/40 after:blur-[2px]',
        'border-glow-amber/65 bg-glow-amber/60 text-on-amber shadow-root ',
      )}
    >
      {NOTE_LABELS[root as Note]}
    </div>
  );
};

export const SpatialCell = ({
  fret,
  stringIndex,
  isRoot,
}: SpatialCellProps) => {
  const isNut = fret === 1;
  const key = positionKey(stringIndex, fret);
  const {
    spatialSelected,
    spatialLockedCorrect,
    guessSpatialNote,
    clearSpatialNote,
    scaleNotes,
  } = useGameStore();

  return (
    <div className="relative flex h-10 items-center justify-center border-r border-glass-border">
      {isNut && (
        <span className="absolute inset-y-0.5 left-0 w-0.75 rounded-full bg-linear-to-b from-white to-white/50 shadow-nut" />
      )}

      {fret !== 0 && <GuitarString stringIndex={stringIndex} />}

      {isRoot ? (
        <TonicCell />
      ) : (
        <PickNoteListbox
          value={spatialSelected.get(key) ?? null}
          options={scaleNotes}
          status={spatialLockedCorrect.has(key) ? 'correct' : 'idle'}
          onChange={(value) => guessSpatialNote(stringIndex, fret, value)}
          onClear={() => clearSpatialNote(stringIndex, fret)}
        />
      )}
    </div>
  );
};
