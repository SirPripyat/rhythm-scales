import { DEFAULT_FRET_COUNT } from '@/constants';
import { playGuitarNote } from '@/lib';
import { createConfigStore } from '@/stores';
import {
  type FretboardPosition,
  Note,
  type ScaleType,
  type Tuning,
} from '@/types';
import {
  getFretboardPositions,
  positionKey,
  TUNINGS,
  TUNINGS_MIDI,
} from '@/utils';
import type { FretboardViewMode } from '../types';
import { getVisibleFrets } from '../utils';

export type FretboardConfig = {
  fretCount: number;
  tuningKey: keyof typeof TUNINGS;
  root: Note;
  scaleType: ScaleType;
  viewMode: FretboardViewMode;
  fretRangeStart: number;
  fretRangeEnd: number;
};

type FretboardDerived = {
  tuning: Tuning;
  tuningMidi: number[];
  positions: ReadonlyMap<string, FretboardPosition>;
  visibleFrets: number[];
};

type FretboardActions = {
  playAt: (stringIndex: number, fret: number) => void;
};

const DEFAULT_FRETBOARD_CONFIG: FretboardConfig = {
  fretCount: DEFAULT_FRET_COUNT,
  tuningKey: 'standard',
  root: Note.C,
  scaleType: 'major',
  viewMode: 'count',
  fretRangeStart: 1,
  fretRangeEnd: DEFAULT_FRET_COUNT,
};

const deriveState = (config: FretboardConfig): FretboardDerived => {
  const tuning = TUNINGS[config.tuningKey];
  const tuningMidi = TUNINGS_MIDI[config.tuningKey];

  const visibleFrets = getVisibleFrets(
    config.viewMode,
    config.fretCount,
    config.fretRangeStart,
    config.fretRangeEnd,
  );

  const positions = new Map(
    getFretboardPositions(
      config.root,
      config.scaleType,
      Math.max(...visibleFrets),
      tuning,
    ).map(
      (position) =>
        [positionKey(position.stringIndex, position.fret), position] as const,
    ),
  );

  return {
    tuning,
    tuningMidi,
    positions,
    visibleFrets,
  };
};

export const useFretboardStore = createConfigStore<
  FretboardConfig,
  FretboardDerived,
  Record<string, never>,
  FretboardActions
>({
  defaultConfig: DEFAULT_FRETBOARD_CONFIG,
  deriveState,
  actions: (_set, get) => ({
    playAt: (stringIndex, fret) =>
      playGuitarNote(get().derived.tuningMidi[stringIndex] + fret),
  }),
});
