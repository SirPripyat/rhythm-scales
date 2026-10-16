import type { ReactNode } from 'react';
import { FretNumber } from '@/components/FretNumber.tsx';

type FretboardGridProps = {
  fretCount: number;
  tuning: number[];
  renderCell: (stringIndex: number, fret: number) => ReactNode;
};

export const FretboardGrid = ({
  fretCount,
  tuning,
  renderCell,
}: FretboardGridProps) => {
  const columns = `repeat(${fretCount + 1}, minmax(2.5rem, 1fr))`;

  const frets = Array.from({ length: fretCount + 1 }, (_, fret) => fret);

  // a corda mais aguda (maior índice) fica no topo
  const stringIndexes = Array.from(
    { length: tuning.length },
    (_, i) => tuning.length - 1 - i,
  );

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
            frets.map((fret) => renderCell(stringIndex, fret)),
          )}

          {frets.map((fret) => (
            <FretNumber key={fret} fret={fret} />
          ))}
        </div>
      </div>
    </div>
  );
};
