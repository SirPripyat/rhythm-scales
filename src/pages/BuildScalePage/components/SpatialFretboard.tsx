import { FretNumber } from '@/components';
import { positionKey, useGameStore } from '@/stores';
import { noteAtStringFret, TUNINGS } from '@/utils';
import { SpatialCell } from './SpatialCell';

const tuning = TUNINGS.standard;

const stringIndexes = Array.from(
  { length: tuning.length },
  (_, i) => tuning.length - 1 - i,
);

export const SpatialFretboard = () => {
  const { fretCount, root } = useGameStore();

  const frets = Array.from({ length: fretCount + 1 }, (_, i) => i);

  const columns = `repeat(${fretCount + 1}, 1fr)`;

  return (
    <div
      className={'relative grid'}
      style={{
        gridTemplateColumns: columns,
        gridTemplateRows: `repeat(${tuning.length}, 1fr) auto`,
      }}
    >
      {stringIndexes.flatMap((stringIndex) =>
        frets.map((fret) => {
          const key = positionKey(stringIndex, fret);

          return (
            <SpatialCell
              key={key}
              fret={fret}
              stringIndex={stringIndex}
              isRoot={noteAtStringFret(stringIndex, fret, tuning) === root}
            />
          );
        }),
      )}

      {frets.map((fret) => (
        <FretNumber key={fret} fret={fret} />
      ))}
    </div>
  );
};
