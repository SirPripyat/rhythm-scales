import type { FretboardPosition } from '@/types';
import { GuitarString } from './GuitarString';
import { NoteMarker } from './NoteMarker';

type FretboardCellProps = {
  position?: FretboardPosition;
  stringIndex: number;
  fret: number;
  openPitchClass?: number;
  midiNote: number;
  playNote: (note: number) => void;
};

export const FretboardCell = ({
  position,
  stringIndex,
  fret,
  openPitchClass,
  midiNote,
  playNote,
}: FretboardCellProps) => {
  const isNut = fret === 1;

  return (
    <div className="relative flex h-10 items-center justify-center border-r border-glass-border">
      {isNut && (
        <span className="absolute inset-y-0.5 left-0 w-0.75 rounded-full bg-linear-to-b from-white to-white/50 shadow-nut" />
      )}
      {fret !== 0 && <GuitarString stringIndex={stringIndex} />}
      <NoteMarker
        position={position}
        openPitchClass={openPitchClass}
        fret={fret}
        midiNote={midiNote}
        playNote={playNote}
      />
    </div>
  );
};
