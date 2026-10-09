import { clsx } from 'clsx';

const STRING_HEIGHT = ['h-1', 'h-1', 'h-0.5', 'h-0.5', 'h-px', 'h-px'] as const;

type GuitarStringProps = {
  stringIndex: number;
};

export const GuitarString = ({ stringIndex }: GuitarStringProps) => (
  <span
    className={clsx(
      'absolute inset-x-0 top-1/2 -translate-y-1/2 rounded-full bg-string shadow-string',
      STRING_HEIGHT[stringIndex] ?? 'h-px',
    )}
  />
);
