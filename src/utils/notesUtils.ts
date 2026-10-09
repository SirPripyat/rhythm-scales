import { Note, type Tuning } from '@/types';
import { TUNINGS } from '@/utils';

export const NOTE_LABELS: Record<Note, string> = {
  [Note.C]: 'C',
  [Note.Cs]: 'C♯',
  [Note.D]: 'D',
  [Note.Ds]: 'D♯',
  [Note.E]: 'E',
  [Note.F]: 'F',
  [Note.Fs]: 'F♯',
  [Note.G]: 'G',
  [Note.Gs]: 'G♯',
  [Note.A]: 'A',
  [Note.As]: 'A♯',
  [Note.B]: 'B',
};

export const noteNameFromPitchClass = (pitchClass: number) =>
  NOTE_LABELS[(((pitchClass % 12) + 12) % 12) as Note];

export const noteAtStringFret = (
  stringIndex: number, // 0, 1, 2, 3, 4, 5
  fret: number,
  tuning: Tuning = TUNINGS.standard,
): Note => ((tuning[stringIndex] + fret) % 12) as Note;
