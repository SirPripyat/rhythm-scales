import { CellShell } from '@/components';
import type { FretboardPosition } from '@/types';
import { NoteMarker } from './NoteMarker';

type FretboardCellProps = {
  position?: FretboardPosition;
  stringIndex: number;
  fret: number;
  openPitchClass?: number;
};

export const FretboardCell = ({
  position,
  stringIndex,
  fret,
  openPitchClass,
}: FretboardCellProps) => {
  return (
    <CellShell fret={fret} stringIndex={stringIndex}>
      <NoteMarker
        position={position}
        openPitchClass={openPitchClass}
        fret={fret}
        stringIndex={stringIndex}
      />
    </CellShell>
  );
};
