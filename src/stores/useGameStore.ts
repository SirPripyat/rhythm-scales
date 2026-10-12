import { create } from 'zustand';
import { DEFAULT_FRET_COUNT } from '@/constants';
import { positionKey } from '@/stores/useFretboardStore';
import type { FretboardPosition, ScaleType } from '@/types';
import { Note } from '@/types';
import { getFretboardPositions, getScaleNotes, SCALE_INTERVALS } from '@/utils';

type GameConfig = {
  root: Note;
  scaleType: ScaleType;
  fretCount: number;
};

type GameProgress = {
  configConfirmed: boolean;
  symbolicChecked: boolean;
  symbolicAllCorrect: boolean;
  symbolicCorrectness: boolean[];
  spatialSelected: Map<string, Note>;
  spatialLockedCorrect: Set<string>;
  spatialChecked: boolean;
  spatialAllCorrect: boolean;
};

type GameState = GameConfig &
  GameProgress & {
    symbolicAnswers: (Note | null)[];
    spatialTargets: FretboardPosition[];
    scaleNotes: Note[];
    configure: (patch: Partial<GameConfig>) => void;
    answerSymbolic: (index: number, note: Note) => void;
    checkSymbolic: () => void;
    guessSpatialNote: (stringIndex: number, fret: number, note: Note) => void;
    clearSpatialNote: (stringIndex: number, fret: number) => void;
    checkSpatial: () => void;
    resetSpatial: () => void;
    reset: () => void;
    confirmConfig: () => void;
  };

const DEFAULT_GAME_CONFIG: GameConfig = {
  root: Note.C,
  scaleType: 'major',
  fretCount: DEFAULT_FRET_COUNT,
};

const defaultProgress = (): GameProgress => ({
  configConfirmed: false,
  symbolicChecked: false,
  symbolicAllCorrect: false,
  symbolicCorrectness: [],
  spatialSelected: new Map(),
  spatialLockedCorrect: new Set(),
  spatialChecked: false,
  spatialAllCorrect: false,
});

const deriveState = (config: GameConfig) => {
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
export const useGameStore = create<GameState>()((set, get) => ({
  ...DEFAULT_GAME_CONFIG,
  ...deriveState(DEFAULT_GAME_CONFIG),
  ...defaultProgress(),

  configure: (patch) =>
    set((state) => ({
      ...patch,
      ...deriveState({ ...state, ...patch }),
      ...defaultProgress(),
    })),

  answerSymbolic: (index, note) =>
    set((state) => {
      const symbolicAnswers = [...state.symbolicAnswers];
      symbolicAnswers[index] = note;

      return {
        symbolicAnswers,
      };
    }),

  checkSymbolic: () => {
    const { root, scaleType, symbolicAnswers } = get();
    const expected = getScaleNotes(root, scaleType).map((n) => n.pitchClass);
    const symbolicCorrectness = symbolicAnswers.map(
      (note, i) => note === expected[i],
    );
    const symbolicAllCorrect = symbolicCorrectness.every(Boolean);
    set({ symbolicChecked: true, symbolicAllCorrect, symbolicCorrectness });
  },

  guessSpatialNote: (stringIndex, fret, note) =>
    set((state) => {
      const key = positionKey(stringIndex, fret);

      const spatialSelected = new Map(state.spatialSelected);

      spatialSelected.set(key, note);

      return { spatialSelected };
    }),

  clearSpatialNote: (stringIndex, fret) =>
    set((state) => {
      const key = positionKey(stringIndex, fret);

      const spatialSelected = new Map(state.spatialSelected);
      spatialSelected.delete(key);

      return { spatialSelected };
    }),

  checkSpatial: () =>
    set((state) => {
      const targetKeys = new Map(
        state.spatialTargets.map((p) => [
          positionKey(p.stringIndex, p.fret),
          p,
        ]),
      );

      const spatialLockedCorrect = new Set(state.spatialLockedCorrect);
      const spatialSelected = new Map<string, Note>();

      for (const [key, note] of state.spatialSelected) {
        const target = targetKeys.get(key);
        if (target?.pitchClass === note) {
          spatialLockedCorrect.add(key);
          spatialSelected.set(key, note);
        }
      }

      return {
        spatialSelected,
        spatialLockedCorrect,
        spatialChecked: true,
        spatialAllCorrect: spatialLockedCorrect.size === targetKeys.size,
      };
    }),

  resetSpatial: () =>
    set({
      spatialSelected: new Map(),
      spatialLockedCorrect: new Set(),
      spatialChecked: false,
      spatialAllCorrect: false,
    }),

  reset: () =>
    set({
      ...DEFAULT_GAME_CONFIG,
      ...deriveState(DEFAULT_GAME_CONFIG),
      ...defaultProgress(),
    }),

  confirmConfig: () => set({ configConfirmed: true }),
}));
