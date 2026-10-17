import { clsx } from 'clsx';
import type { PropsWithChildren } from 'react';

type CardProps = PropsWithChildren & {};

export const Card = ({ children }: CardProps) => {
  return (
    <div
      className={clsx(
        'flex flex-col justify-center items-center bg-glass border border-glass-border rounded-2xl p-10 gap-3',
      )}
    >
      {children}
    </div>
  );
};
