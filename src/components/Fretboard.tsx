import { positionKey, useFretboardStore } from '@/stores';
import { noteAtStringFret } from '@/utils';
import { FretboardCell } from './FretboardCell';
import { FretNumber } from './FretNumber';

export const Fretboard = () => {
  const { fretCount, tuning, positions } = useFretboardStore();

  const frets = Array.from({ length: fretCount + 1 }, (_, fret) => fret);
  // a corda mais aguda (maior índice) fica no topo
  const stringIndexes = Array.from(
    { length: tuning.length },
    (_, i) => tuning.length - 1 - i,
  );

  const columns = `repeat(${fretCount + 1}, 1fr)`;

  return (
    <div
      className={
        'relative grid rounded-3xl border border-glass-border bg-glass px-5 py-6 backdrop-blur-xl'
      }
      style={{
        gridTemplateColumns: columns,
        gridTemplateRows: `repeat(${tuning.length}, 1fr) auto`,
      }}
    >
      {stringIndexes.flatMap((stringIndex) =>
        frets.map((fret) => {
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
        }),
      )}

      {frets.map((fret) => (
        <FretNumber key={fret} fret={fret} />
      ))}
    </div>
  );
};
