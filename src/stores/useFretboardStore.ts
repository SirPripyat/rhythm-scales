import { create } from 'zustand';
import { DEFAULT_FRET_COUNT } from '@/constants';
import { playGuitarNote } from '@/lib';
import {
  type FretboardPosition,
  Note,
  type ScaleType,
  type Tuning,
} from '@/types';
import { getFretboardPositions, TUNINGS, TUNINGS_MIDI } from '@/utils';

export type FretboardConfig = {
  fretCount: number;
  tuningKey: keyof typeof TUNINGS;
  root: Note;
  scaleType: ScaleType;
};

type FretboardState = FretboardConfig & {
  tuning: Tuning;
  tuningMidi: number[];
  positions: ReadonlyMap<string, FretboardPosition>;
  configure: (patch: Partial<FretboardConfig>) => void;
  playAt: (stringIndex: number, fret: number) => void;
};

const DEFAULT_FRETBOARD_CONFIG: FretboardConfig = {
  fretCount: DEFAULT_FRET_COUNT,
  tuningKey: 'standard',
  root: Note.C,
  scaleType: 'major',
};

const resolveTuning = (tuningKey: keyof typeof TUNINGS) => ({
  tuning: TUNINGS[tuningKey],
  tuningMidi: TUNINGS_MIDI[tuningKey],
});

const deriveState = (config: FretboardConfig) => {
  const resolvedTuning = resolveTuning(config.tuningKey);

  const positions = buildPositions({
    ...config,
    tuning: resolvedTuning.tuning,
  });

  return {
    positions,
    tuning: resolvedTuning.tuning,
    tuningMidi: resolvedTuning.tuningMidi,
  };
};

export const positionKey = (stringIndex: number, fret: number) =>
  `${stringIndex}-${fret}`;

const buildPositions = ({
  root,
  scaleType,
  fretCount,
  tuning,
}: Omit<FretboardConfig, 'tuningKey'> & { tuning: Tuning }) =>
  new Map(
    getFretboardPositions(root, scaleType, fretCount, tuning).map(
      (position) =>
        [positionKey(position.stringIndex, position.fret), position] as const,
    ),
  );

export const useFretboardStore = create<FretboardState>()((set, get) => ({
  ...DEFAULT_FRETBOARD_CONFIG,
  ...deriveState(DEFAULT_FRETBOARD_CONFIG),

  configure: (patch) =>
    set((state) => ({
      ...patch,
      ...deriveState({ ...state, ...patch }),
    })),

  playAt: (stringIndex, fret) =>
    playGuitarNote(get().tuningMidi[stringIndex] + fret),
}));
