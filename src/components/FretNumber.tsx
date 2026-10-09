import { DOUBLE_INLAY_FRETS, SINGLE_INLAY_FRETS } from '@/constants';

type FretNumberProps = {
  fret: number;
};

const getInlayCount = (fret: number): 0 | 1 | 2 => {
  if (DOUBLE_INLAY_FRETS.includes(fret)) return 2;
  if (SINGLE_INLAY_FRETS.includes(fret)) return 1;
  return 0;
};

export const FretNumber = ({ fret }: FretNumberProps) => {
  const isReference = fret === 0 || getInlayCount(fret) > 0;

  return (
    <span className="mt-2 flex items-center justify-center font-mono text-[11px] tabular-nums text-ink-faint">
      {isReference ? fret : null}
    </span>
  );
};
