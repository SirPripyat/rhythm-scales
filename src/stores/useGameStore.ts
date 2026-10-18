import { DEFAULT_FRET_COUNT, MAX_SPATIAL_ATTEMPTS } from '@/constants';
import type { FretboardPosition, ScaleType } from '@/types';
import { Note } from '@/types';
import {
  getFretboardPositions,
  getScaleNotes,
  positionKey,
  SCALE_INTERVALS,
} from '@/utils';
import { createConfigStore } from './createConfigStore';

export type GameConfig = {
  root: Note;
  scaleType: ScaleType;
  fretCount: number;
};

type GameDerived = {
  symbolicAnswers: (Note | null)[];
  spatialTargets: FretboardPosition[];
  scaleNotes: Note[];
};

type GameProgress = {
  configConfirmed: boolean;
  symbolicChecked: boolean;
  symbolicAllCorrect: boolean;
  symbolicCorrectness: boolean[];
  spatialSelected: Map<string, Note>;
  spatialLockedCorrect: Set<string>;
  spatialWrongKeys: Set<string>;
  spatialAttempts: number;
  spatialChecked: boolean;
  spatialAllCorrect: boolean;
};

type GameActions = {
  answerSymbolic: (index: number, note: Note) => void;
  checkSymbolic: () => void;
  guessSpatialNote: (stringIndex: number, fret: number, note: Note) => void;
  clearSpatialNote: (stringIndex: number, fret: number) => void;
  checkSpatial: () => void;
  resetSpatial: () => void;
  confirmConfig: () => void;
};

const DEFAULT_GAME_CONFIG: GameConfig = {
  root: Note.C,
  scaleType: 'major',
  fretCount: DEFAULT_FRET_COUNT,
};

const deriveState = (config: GameConfig): GameDerived => {
  const scaleLength = SCALE_INTERVALS[config.scaleType].length;

  const symbolicAnswers = Array.from({ length: scaleLength }, (_, i) =>
    i === 0 ? config.root : null,
  );

  const spatialTargets = getFretboardPositions(
    config.root,
    config.scaleType,
    config.fretCount,
  ).filter((position) => !position.isRoot);

  const scaleNotes = getScaleNotes(config.root, config.scaleType).map(
    (note) => note.pitchClass,
  );

  return { symbolicAnswers, spatialTargets, scaleNotes };
};

const defaultProgress = (): GameProgress => ({
  configConfirmed: false,
  symbolicChecked: false,
  symbolicAllCorrect: false,
  symbolicCorrectness: [],
  spatialSelected: new Map(),
  spatialLockedCorrect: new Set(),
  spatialWrongKeys: new Set(),
  spatialAttempts: 0,
  spatialChecked: false,
  spatialAllCorrect: false,
});

export const useGameStore = createConfigStore<
  GameConfig,
  GameDerived,
  GameProgress,
  GameActions
>({
  defaultConfig: DEFAULT_GAME_CONFIG,
  deriveState,
  defaultProgress,
  actions: (set, get) => ({
    answerSymbolic: (index, note) =>
      set((state) => {
        const symbolicAnswers = [...state.derived.symbolicAnswers];
        symbolicAnswers[index] = note;

        return { derived: { ...state.derived, symbolicAnswers } };
      }),

    checkSymbolic: () => {
      const {
        derived: { scaleNotes: expected, symbolicAnswers },
      } = get();

      const symbolicCorrectness = symbolicAnswers.map(
        (note, i) => note === expected[i],
      );
      const symbolicAllCorrect = symbolicCorrectness.every(Boolean);

      set((state) => ({
        progress: {
          ...state.progress,
          symbolicChecked: true,
          symbolicAllCorrect,
          symbolicCorrectness,
        },
      }));
    },

    guessSpatialNote: (stringIndex, fret, note) =>
      set((state) => {
        const key = positionKey(stringIndex, fret);

        const spatialSelected = new Map(state.progress.spatialSelected);
        spatialSelected.set(key, note);

        const spatialWrongKeys = new Set(state.progress.spatialWrongKeys);
        spatialWrongKeys.delete(key);

        return {
          progress: { ...state.progress, spatialSelected, spatialWrongKeys },
        };
      }),

    clearSpatialNote: (stringIndex, fret) =>
      set((state) => {
        const key = positionKey(stringIndex, fret);

        const spatialSelected = new Map(state.progress.spatialSelected);
        spatialSelected.delete(key);

        const spatialWrongKeys = new Set(state.progress.spatialWrongKeys);
        spatialWrongKeys.delete(key);

        return {
          progress: { ...state.progress, spatialSelected, spatialWrongKeys },
        };
      }),

    checkSpatial: () =>
      set((state) => {
        const targetKeys = new Map(
          state.derived.spatialTargets.map(
            (p) => [positionKey(p.stringIndex, p.fret), p] as const,
          ),
        );

        const spatialLockedCorrect = new Set(
          state.progress.spatialLockedCorrect,
        );
        const spatialWrongKeys = new Set<string>();

        for (const [key, note] of state.progress.spatialSelected) {
          const target = targetKeys.get(key);
          if (target?.pitchClass === note) {
            spatialLockedCorrect.add(key);
          } else {
            spatialWrongKeys.add(key);
          }
        }

        const spatialAttempts = state.progress.spatialAttempts + 1;
        const allCorrect = spatialLockedCorrect.size === targetKeys.size;

        if (!allCorrect && spatialAttempts >= MAX_SPATIAL_ATTEMPTS) {
          const spatialSelected = new Map(state.progress.spatialSelected);

          for (const [key, target] of targetKeys) {
            spatialLockedCorrect.add(key);
            spatialSelected.set(key, target.pitchClass);
          }

          return {
            progress: {
              ...state.progress,
              spatialSelected,
              spatialLockedCorrect,
              spatialWrongKeys: new Set<string>(),
              spatialAttempts,
              spatialChecked: true,
              spatialAllCorrect: true,
            },
          };
        }

        return {
          progress: {
            ...state.progress,
            spatialLockedCorrect,
            spatialWrongKeys,
            spatialAttempts,
            spatialChecked: true,
            spatialAllCorrect: allCorrect,
          },
        };
      }),

    resetSpatial: () =>
      set((state) => ({
        progress: {
          ...state.progress,
          spatialSelected: new Map(),
          spatialLockedCorrect: new Set(),
          spatialWrongKeys: new Set(),
          spatialAttempts: 0,
          spatialChecked: false,
          spatialAllCorrect: false,
        },
      })),

    confirmConfig: () =>
      set((state) => ({
        progress: { ...state.progress, configConfirmed: true },
      })),
  }),
});
