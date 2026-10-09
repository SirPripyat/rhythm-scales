import type { Note, ScaleNote, ScaleType } from '@/types';
import { noteNameFromPitchClass } from '@/utils/notesUtils.ts';

export const SCALE_INTERVALS: Record<ScaleType, number[]> = {
  majorPentatonic: [0, 2, 4, 7, 9],
  minorPentatonic: [0, 3, 5, 7, 10],
  blues: [0, 3, 5, 6, 7, 10],
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
};

export const getScaleNotes = (
  root: Note,
  scaleType: ScaleType,
): ScaleNote[] => {
  const scaleIntervals = SCALE_INTERVALS[scaleType];

  return scaleIntervals.map((interval, index) => {
    const pitchClass = ((interval + root) % 12) as Note;

    return {
      degree: index + 1,
      pitchClass,
      noteName: noteNameFromPitchClass(pitchClass),
    };
  });
};

export const SCALE_TYPE_LABELS: Record<ScaleType, string> = {
  major: 'Maior (Jônio)',
  minor: 'Menor (Eólio)',
  majorPentatonic: 'Pentatônica Maior',
  minorPentatonic: 'Pentatônica Menor',
  blues: 'Blues',
};
