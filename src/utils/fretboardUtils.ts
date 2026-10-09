import { DEFAULT_FRET_COUNT } from '@/constants';
import type { FretboardPosition, Note, ScaleType, Tuning } from '@/types';
import { getScaleNotes, noteAtStringFret, TUNINGS } from '@/utils';

export const getFretboardPositions = (
  root: Note,
  scaleType: ScaleType,
  fretCount: number = DEFAULT_FRET_COUNT,
  tuning: Tuning = TUNINGS.standard,
): FretboardPosition[] => {
  const scaleNotesByPitchClass = new Map(
    getScaleNotes(root, scaleType).map(
      (note) => [note.pitchClass, note] as const,
    ),
  );

  const positions: FretboardPosition[] = [];

  for (let stringIndex = 0; stringIndex < tuning.length; stringIndex++) {
    for (let fret = 0; fret <= fretCount; fret++) {
      const pitchClass = noteAtStringFret(stringIndex, fret, tuning);
      const scaleNote = scaleNotesByPitchClass.get(pitchClass);

      if (!scaleNote) continue;

      positions.push({
        stringIndex,
        fret,
        pitchClass,
        degree: scaleNote.degree,
        noteName: scaleNote.noteName,
        isRoot: pitchClass === root,
      });
    }
  }

  return positions;
};
