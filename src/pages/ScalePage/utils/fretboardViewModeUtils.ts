import type { FretboardViewMode } from '../types';

export const FRETBOARD_VIEW_MODE_LABELS: Record<FretboardViewMode, string> = {
  count: 'Qtd. trastes',
  range: 'Range de trastes',
};

const range = (start: number, end: number) =>
  Array.from({ length: Math.max(0, end - start + 1) }, (_, i) => start + i);

export const getVisibleFrets = (
  viewMode: FretboardViewMode,
  fretCount: number,
  fretRangeStart: number,
  fretRangeEnd: number,
): number[] => {
  if (viewMode === 'count') return range(0, fretCount);

  return [0, ...range(fretRangeStart, fretRangeEnd)];
};
