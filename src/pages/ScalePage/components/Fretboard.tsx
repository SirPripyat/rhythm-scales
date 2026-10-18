import { FretboardGrid } from '@/components';
import { noteAtStringFret, positionKey } from '@/utils';
import { useFretboardStore } from '../stores';
import { FretboardCell } from './FretboardCell';

export const Fretboard = () => {
  const {
    derived: { tuning, positions, visibleFrets },
  } = useFretboardStore();

  return (
    <FretboardGrid
      frets={visibleFrets}
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
