import { FretNumber } from '@/components';
import { positionKey, useFretboardStore } from '@/stores';
import { noteAtStringFret } from '@/utils';
import { FretboardCell } from './FretboardCell';

export const Fretboard = () => {
  const { fretCount, tuning, positions } = useFretboardStore();

  const frets = Array.from({ length: fretCount + 1 }, (_, fret) => fret);

  // a corda mais aguda (maior índice) fica no topo
  const stringIndexes = Array.from(
    { length: tuning.length },
    (_, i) => tuning.length - 1 - i,
  );

  const columns = `repeat(${fretCount + 1}, minmax(2.5rem, 1fr))`;

  return (
    <div className="rounded-3xl border border-glass-border bg-glass backdrop-blur-xl">
      <div className="overflow-x-auto px-5 py-6">
        <div
          className="relative grid min-w-max"
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
      </div>
    </div>
  );
};
