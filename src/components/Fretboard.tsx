// biome-ignore-all lint/suspicious/noArrayIndexKey: fret/string index é o próprio dado — a
//   lista só cresce/encolhe pelo final, nunca reordena ou insere no meio
import { Fragment } from 'react';
import { Inlay } from '@/components/Inlay.tsx';
import { useGuitarSoundfont } from '@/hooks';
import type { FretboardPosition, Note, ScaleType, Tuning } from '@/types';
import { createArray, getFretboardPositions, noteAtStringFret } from '@/utils';
import { FretboardCell } from './FretboardCell';
import { FretNumber } from './FretNumber';

type FretboardProps = {
  fretCount: number;
  tuning: Tuning;
  root: Note;
  scaleType: ScaleType;
  tuningMidi: number[];
};

export const Fretboard = ({
  fretCount,
  tuning,
  root,
  scaleType,
  tuningMidi,
}: FretboardProps) => {
  const playNote = useGuitarSoundfont();

  const result = getFretboardPositions(root, scaleType, fretCount, tuning);

  const fretArray = createArray(fretCount + 1);

  const scalePositionsByKey = new Map<string, FretboardPosition>(
    result.map((note) => [`${note.stringIndex}-${note.fret}`, note] as const),
  );

  return (
    <div
      className={`px-4 py-2 relative`}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${fretCount + 1}, 1fr)`,
        gridTemplateRows: `repeat(${tuning.length}, 1fr) auto`,
      }}
    >
      {tuning
        .map((_, stringIndex) => (
          <Fragment key={stringIndex}>
            {fretArray.map((_, fret) => {
              const openNoteName = noteAtStringFret(stringIndex, fret, tuning);
              const midiNote = tuningMidi[stringIndex] + fret;

              return (
                <FretboardCell
                  key={`${stringIndex}-${fret}`}
                  scale={scalePositionsByKey.get(`${stringIndex}-${fret}`)}
                  isNut={fret === 1}
                  stringIndex={stringIndex}
                  fret={fret}
                  openNoteName={openNoteName}
                  midiNote={midiNote}
                  playNote={playNote}
                />
              );
            })}
          </Fragment>
        ))
        .reverse()}

      {fretArray.map((_, fret) => (
        <FretNumber key={fret} fret={fret} />
      ))}

      <div
        className={`px-4 rounded-lg bg-wood-surface absolute inset-0 -z-10`}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${fretCount + 1}, 1fr)`,
        }}
      >
        {fretArray.map((_, fret) => (
          <Inlay key={fret} fret={fret} />
        ))}
      </div>
    </div>
  );
};
