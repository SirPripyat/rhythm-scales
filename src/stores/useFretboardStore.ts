import { DEFAULT_FRET_COUNT } from '@/constants';
import { playGuitarNote } from '@/lib';
import {
  type FretboardPosition,
  Note,
  type ScaleType,
  type Tuning,
} from '@/types';
import { getFretboardPositions, TUNINGS, TUNINGS_MIDI } from '@/utils';
import { createConfigStore } from './createConfigStore';

export type FretboardConfig = {
  fretCount: number;
  tuningKey: keyof typeof TUNINGS;
  root: Note;
  scaleType: ScaleType;
};

type FretboardDerived = {
  tuning: Tuning;
  tuningMidi: number[];
  positions: ReadonlyMap<string, FretboardPosition>;
};

type FretboardActions = {
  playAt: (stringIndex: number, fret: number) => void;
};

const DEFAULT_FRETBOARD_CONFIG: FretboardConfig = {
  fretCount: DEFAULT_FRET_COUNT,
  tuningKey: 'standard',
  root: Note.C,
  scaleType: 'major',
};

export const positionKey = (stringIndex: number, fret: number) =>
  `${stringIndex}-${fret}`;

const deriveState = (config: FretboardConfig): FretboardDerived => {
  const tuning = TUNINGS[config.tuningKey];
  const tuningMidi = TUNINGS_MIDI[config.tuningKey];

  const positions = new Map(
    getFretboardPositions(
      config.root,
      config.scaleType,
      config.fretCount,
      tuning,
    ).map(
      (position) =>
        [positionKey(position.stringIndex, position.fret), position] as const,
    ),
  );

  return { tuning, tuningMidi, positions };
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
