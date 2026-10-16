import { playGuitarNote, playGuitarNotesInSequence } from '@/lib';
import { createConfigStore } from '@/stores';
import { Note } from '@/types';
import { pitchClassToMidi } from '@/utils';
import type { GuessNoteLevel } from '../types';
import { GUESS_NOTE_LEVEL_POOL, pickMysteryNote } from '../utils';

type GuessNotePhase = 'idle' | 'waiting' | 'correct' | 'incorrect';

type GuessNoteConfig = {
  level: GuessNoteLevel;
};

type GuessNoteDerived = {
  notePool: Note[];
};

type GuessNoteProgress = {
  phase: GuessNotePhase;
  mysteryNote: Note | null;
  chosenNote: Note | null;
  score: number;
  total: number;
  streak: number;
  round: number;
};

type GuessNoteActions = {
  start: () => void;
  chooseAnswer: (note: Note) => void;
  nextRound: () => void;
  replay: () => void;
  playTonicOnly: () => void;
};

const DEFAULT_GUESS_NOTE_CONFIG: GuessNoteConfig = {
  level: 'easy',
};

const deriveState = (config: GuessNoteConfig): GuessNoteDerived => ({
  notePool: GUESS_NOTE_LEVEL_POOL[config.level],
});

const defaultProgress = (): GuessNoteProgress => ({
  phase: 'idle',
  mysteryNote: null,
  chosenNote: null,
  score: 0,
  total: 0,
  streak: 0,
  round: 0,
});

const playReferenceThenMystery = (mysteryNote: Note) =>
  playGuitarNotesInSequence([
    pitchClassToMidi(Note.C),
    pitchClassToMidi(mysteryNote),
  ]);

export const useGuessNoteStore = createConfigStore<
  GuessNoteConfig,
  GuessNoteDerived,
  GuessNoteProgress,
  GuessNoteActions
>({
  defaultConfig: DEFAULT_GUESS_NOTE_CONFIG,
  deriveState,
  defaultProgress,
  actions: (set, get) => {
    const beginRound = (round: number) => {
      const {
        derived: { notePool },
        progress,
      } = get();

      const mysteryNote = pickMysteryNote(notePool, progress.mysteryNote);

      set((state) => ({
        progress: {
          ...state.progress,
          phase: 'waiting',
          mysteryNote,
          chosenNote: null,
          round,
        },
      }));

      playReferenceThenMystery(mysteryNote);
    };

    return {
      start: () => beginRound(1),

      nextRound: () => beginRound(get().progress.round + 1),

      chooseAnswer: (note) => {
        const { progress } = get();

        if (progress.phase !== 'waiting') return;

        const isCorrect = note === progress.mysteryNote;

        set((state) => ({
          progress: {
            ...state.progress,
            chosenNote: note,
            total: state.progress.total + 1,
            score: isCorrect ? state.progress.score + 1 : state.progress.score,
            streak: isCorrect ? state.progress.streak + 1 : 0,
            phase: isCorrect ? 'correct' : 'incorrect',
          },
        }));

        if (isCorrect) {
          playGuitarNote(pitchClassToMidi(note));
        } else if (progress.mysteryNote !== null) {
          playGuitarNotesInSequence([
            pitchClassToMidi(note),
            pitchClassToMidi(progress.mysteryNote),
          ]);
        }
      },

      replay: () => {
        const { mysteryNote } = get().progress;

        if (mysteryNote === null) return;

        playReferenceThenMystery(mysteryNote);
      },

      playTonicOnly: () => playGuitarNote(pitchClassToMidi(Note.C)),
    };
  },
});
