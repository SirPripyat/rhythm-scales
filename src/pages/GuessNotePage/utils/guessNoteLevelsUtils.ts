import { Note } from '@/types';
import type { GuessNoteLevel } from '../types';

type GuessNoteLevelOption = {
  id: GuessNoteLevel;
  label: string;
};

export const GUESS_NOTE_LEVEL_OPTIONS: GuessNoteLevelOption[] = [
  {
    id: 'easy',
    label: 'Fácil · Tríade',
  },
  {
    id: 'medium',
    label: 'Médio · Até o Sol',
  },
  {
    id: 'hard',
    label: 'Difícil · Escala completa',
  },
];

export const GUESS_NOTE_LEVEL_POOL: Record<GuessNoteLevel, Note[]> = {
  easy: [Note.C, Note.E, Note.G],
  medium: [Note.C, Note.D, Note.E, Note.F, Note.G],
  hard: [Note.C, Note.D, Note.E, Note.F, Note.G, Note.A, Note.B],
};

export const GUESS_NOTE_LEVEL_POOL_LABELS: Record<GuessNoteLevel, string> = {
  easy: 'Dó, Mi, Sol',
  medium: 'Dó, Ré, Mi, Fá, Sol',
  hard: 'Dó, Ré, Mi, Fá, Sol, Lá, Si',
};
