import type { PropsWithChildren } from 'react';
import { GuitarString } from '@/components';

type CellShellProps = PropsWithChildren & {
  fret: number;
  stringIndex: number;
};

export const CellShell = ({ children, fret, stringIndex }: CellShellProps) => {
  const isNut = fret === 1;

  return (
    <div
      className={
        'relative flex h-10 items-center justify-center border-r border-glass-border'
      }
    >
      {isNut && (
        <span
          className={
            'absolute inset-y-0.5 left-0 w-0.75 rounded-full bg-linear-to-b from-white to-white/50 shadow-nut'
          }
        />
      )}

      {fret !== 0 && <GuitarString stringIndex={stringIndex} />}

      {children}
    </div>
  );
};
