import { FretboardGrid } from '@/components';
import { useGameStore } from '@/stores';
import { noteAtStringFret, positionKey, TUNINGS } from '@/utils';
import { SpatialCell } from './SpatialCell';

export const SpatialFretboard = () => {
  const {
    config: { fretCount, root },
  } = useGameStore();

  return (
    <FretboardGrid
      frets={Array.from({ length: fretCount + 1 }, (_, i) => i)}
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
