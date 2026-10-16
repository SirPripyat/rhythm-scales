import { FretboardGrid } from '@/components';
import { positionKey, useGameStore } from '@/stores';
import { noteAtStringFret, TUNINGS } from '@/utils';
import { SpatialCell } from './SpatialCell';

export const SpatialFretboard = () => {
  const {
    config: { fretCount, root },
  } = useGameStore();

  return (
    <FretboardGrid
      fretCount={fretCount}
      tuning={TUNINGS.standard}
      renderCell={(stringIndex, fret) => {
        const key = positionKey(stringIndex, fret);

        return (
          <SpatialCell
            key={key}
            fret={fret}
            stringIndex={stringIndex}
            isRoot={
              noteAtStringFret(stringIndex, fret, TUNINGS.standard) === root
            }
          />
        );
      }}
    />
  );
};
