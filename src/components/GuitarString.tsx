const STRING_BORDER_WEIGHTS: Record<number, string> = {
  0: 'border-t-4',
  1: 'border-t-4',
  2: 'border-t-2',
  3: 'border-t-2',
  4: 'border-t',
  5: 'border-t',
};

const STRING_BORDER_COLORS: Record<number, string> = {
  0: 'border-t-string-wound',
  1: 'border-t-string-wound',
  2: 'border-t-string-wound',
  3: 'border-t-string-wound',
  4: 'border-t-string-plain',
  5: 'border-t-string-plain',
};

type GuitarStringProps = {
  stringIndex: number;
};

export const GuitarString = ({ stringIndex }: GuitarStringProps) => {
  return (
    <span
      className={`z-1 absolute inset-x-0 top-1/2 -translate-y-1/2 ${STRING_BORDER_COLORS[stringIndex]} ${STRING_BORDER_WEIGHTS[stringIndex]}`}
    />
  );
};
