import type { FretboardPosition } from '@/types';
import { GuitarString } from './GuitarString.tsx';
import { NoteMarker } from './NoteMarker';

type FretboardCellProps = {
  isNut: boolean;
  scale?: FretboardPosition;
  stringIndex: number;
  fret: number;
  openNoteName?: number;
};

export const FretboardCell = ({
  isNut,
  scale,
  stringIndex,
  fret,
  openNoteName,
}: FretboardCellProps) => {
  return (
    <div
      className={`relative border-r border-r-fretwire h-10 flex items-center justify-center ${isNut ? `border-l-4 border-l-nut` : ''}`}
    >
      {fret !== 0 && <GuitarString stringIndex={stringIndex} />}
      <NoteMarker scale={scale} openNoteName={openNoteName} fret={fret} />
    </div>
  );
};
