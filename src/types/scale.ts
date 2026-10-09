import type { Note } from '@/types';
import type { TUNINGS } from '@/utils';

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

export type ScaleExplorerState = {
  tonic: Note;
  scaleType: ScaleType;
  tuning: keyof typeof TUNINGS;
  fretCount: number;
};
