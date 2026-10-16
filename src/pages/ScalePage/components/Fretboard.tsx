import { FretboardGrid } from '@/components';
import { positionKey, useFretboardStore } from '@/stores';
import { noteAtStringFret } from '@/utils';
import { FretboardCell } from './FretboardCell';

export const Fretboard = () => {
  const {
    config: { fretCount },
    derived: { tuning, positions },
  } = useFretboardStore();

  return (
    <FretboardGrid
      fretCount={fretCount}
      tuning={tuning}
      renderCell={(stringIndex, fret) => {
        const key = positionKey(stringIndex, fret);

        return (
          <FretboardCell
            key={key}
            position={positions.get(key)}
            stringIndex={stringIndex}
            fret={fret}
            openPitchClass={noteAtStringFret(stringIndex, fret, tuning)}
          />
        );
      }}
    />
  );
};
