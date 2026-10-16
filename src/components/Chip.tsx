import { clsx } from 'clsx';
import type { ComponentProps, ReactNode } from 'react';

type ChipProps = ComponentProps<'button'> & {
  children: ReactNode;
  active?: boolean;
};

export const Chip = ({ children, active, ...rest }: ChipProps) => {
  return (
    <button
      {...rest}
      type={'button'}
      className={clsx(
        'flex justify-center items-center h-8 rounded-full px-4 bg-glass border',
        ' text-[.8rem] font-semibold cursor-pointer',
        active
          ? 'bg-glow-teal/22 border-glow-teal text-glow-teal'
          : 'border-glass-border text-ink-dim',
      )}
    >
      {children}
    </button>
  );
};
