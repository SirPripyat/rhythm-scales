import { DOUBLE_INLAY_FRETS, SINGLE_INLAY_FRETS } from '@/constants';

type FretNumberProps = {
  fret: number;
};

const isFretReference = (fret: number) =>
  fret === 0 ||
  SINGLE_INLAY_FRETS.includes(fret) ||
  DOUBLE_INLAY_FRETS.includes(fret);

export const FretNumber = ({ fret }: FretNumberProps) => {
  return (
    <span className={'flex items-center justify-center text-ink-dim mt-2'}>
      {isFretReference(fret) ? fret : ''}
    </span>
  );
};
