import { DOUBLE_INLAY_FRETS, SINGLE_INLAY_FRETS } from '@/constants';

type InlayProps = {
  fret: number;
};

const Circle = () => <span className="h-3 w-3 rounded-full bg-inlay/35" />;

export const Inlay = ({ fret }: InlayProps) => {
  const isSingle = SINGLE_INLAY_FRETS.includes(fret);
  const isDouble = DOUBLE_INLAY_FRETS.includes(fret);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6">
      {isSingle && <Circle />}
      {isDouble && (
        <>
          <Circle />
          <Circle />
        </>
      )}
    </div>
  );
};
