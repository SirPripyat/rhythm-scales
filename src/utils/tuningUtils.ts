import { Note, type Tuning } from '@/types';

export const TUNINGS: Record<string, Tuning> = {
  standard: [Note.E, Note.A, Note.D, Note.G, Note.B, Note.E],
  dropD: [Note.D, Note.A, Note.D, Note.G, Note.B, Note.E],
};

export const TUNINGS_LABELS: Record<string, string> = {
  standard: 'Padrão (E A D G B E)',
  dropD: 'Drop D (D A D G B E)',
};
