import type { Note } from '@/types';

export type FretboardPosition = {
  stringIndex: number;
  fret: number;
  pitchClass: Note;
  degree: number;
  noteName: string;
  isRoot: boolean;
};
