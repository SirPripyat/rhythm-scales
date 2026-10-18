import { playGuitarNote, playGuitarNotesInSequence } from '@/lib';
import { createConfigStore } from '@/stores';
import { Note } from '@/types';
import { pitchClassToMidi } from '@/utils';
import type { GuessNoteDegree, GuessNoteLevel, GuessNotePhase } from '../types';
import {
  GUESS_NOTE_DEGREES,
  GUESS_NOTE_LEVEL_POOL,
  pickMysteryNote,
} from '../utils';

type GuessNoteConfig = {
  level: GuessNoteLevel;
};

type GuessNoteDerived = {
  notePool: Note[];
  answerOptions: GuessNoteDegree[];
};

type GuessNoteProgress = {
  phase: GuessNotePhase;
  mysteryNote: Note | null;
  chosenNote: Note | null;
  score: number;
  total: number;
  streak: number;
  round: number;
  isPlaying: boolean;
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

const deriveState = (config: GuessNoteConfig): GuessNoteDerived => {
  const notePool = GUESS_NOTE_LEVEL_POOL[config.level];

  return {
    notePool,
    answerOptions: GUESS_NOTE_DEGREES.filter(({ note }) =>
      notePool.includes(note),
    ),
  };
};

const defaultProgress = (): GuessNoteProgress => ({
  phase: 'idle',
  mysteryNote: null,
  chosenNote: null,
  score: 0,
  total: 0,
  streak: 0,
  round: 0,
  isPlaying: false,
});

const playReferenceThenMystery = (mysteryNote: Note, onDone: () => void) =>
  playGuitarNotesInSequence(
    [pitchClassToMidi(Note.C), pitchClassToMidi(mysteryNote)],
    700,
    onDone,
  );

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
    const setPlaying = (isPlaying: boolean) =>
      set((state) => ({ progress: { ...state.progress, isPlaying } }));

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
          isPlaying: true,
        },
      }));

      playReferenceThenMystery(mysteryNote, () => setPlaying(false));
    };

    return {
      start: () => beginRound(1),

      nextRound: () => beginRound(get().progress.round + 1),

      chooseAnswer: (note) => {
        const { progress } = get();

        if (progress.phase !== 'waiting' || progress.isPlaying) return;

        const isCorrect = note === progress.mysteryNote;

        set((state) => ({
          progress: {
            ...state.progress,
            chosenNote: note,
            total: state.progress.total + 1,
            score: isCorrect ? state.progress.score + 1 : state.progress.score,
            streak: isCorrect ? state.progress.streak + 1 : 0,
            phase: isCorrect ? 'correct' : 'incorrect',
            isPlaying: !isCorrect,
          },
        }));

        if (isCorrect) {
          playGuitarNote(pitchClassToMidi(note));
        } else if (progress.mysteryNote !== null) {
          playGuitarNotesInSequence(
            [pitchClassToMidi(note), pitchClassToMidi(progress.mysteryNote)],
            700,
            () => setPlaying(false),
          );
        }
      },

      replay: () => {
        const { mysteryNote, isPlaying } = get().progress;

        if (mysteryNote === null || isPlaying) return;

        setPlaying(true);
        playReferenceThenMystery(mysteryNote, () => setPlaying(false));
      },

      playTonicOnly: () => playGuitarNote(pitchClassToMidi(Note.C)),
    };
  },
});
