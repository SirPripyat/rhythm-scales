import type { Note } from '@/types';

export type GuessNoteLevel = 'easy' | 'medium' | 'hard';

export type GuessNoteDegree = {
  note: Note; // pitchClass do Grau
  label: string; // Nome em solfejo: Dó, Mi
  hint: string; // dica de memorização
};

export type GuessNotePhase = 'idle' | 'waiting' | 'correct' | 'incorrect';
