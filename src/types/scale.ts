import type { Note } from '@/types';

export type ScaleType =
  | 'majorPentatonic'
  | 'minorPentatonic'
  | 'blues'
  | 'major'
  | 'minor';

export type ScaleNote = {
  degree: number;
  pitchClass: Note;
  noteName: string;
};
