import { Note, type Tuning } from '@/types';

export const TUNINGS: Record<string, Tuning> = {
  standard: [Note.E, Note.A, Note.D, Note.G, Note.B, Note.E],
  dropD: [Note.D, Note.A, Note.D, Note.G, Note.B, Note.E],
};

export const TUNINGS_LABELS: Record<string, string> = {
  standard: 'Padrão (E A D G B E)',
  dropD: 'Drop D (D A D G B E)',
};

export const TUNINGS_MIDI: Record<string, number[]> = {
  standard: [40, 45, 50, 55, 59, 64], // E2 A2 D3 G3 B3 E4
  dropD: [38, 45, 50, 55, 59, 64], // D2 A2 D3 G3 B3 E4
};
