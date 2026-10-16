import { Button as HeadlessButton } from '@headlessui/react';
import { ArrowPathIcon } from '@heroicons/react/20/solid';
import { clsx } from 'clsx';
import type { ComponentProps, ReactNode } from 'react';

type ButtonHierarchy = 'primary' | 'secondary' | 'ghosted';

type ButtonProps = ComponentProps<'button'> & {
  hierarchy?: 'primary' | 'secondary' | 'ghosted';
  children: ReactNode;
  isLoading?: boolean;
};

const BUTTON_STYLES: Record<ButtonHierarchy, string> = {
  primary:
    'text-ink bg-glow-violet hover:bg-glow-violet/85 disabled:bg-glow-violet/30 disabled:text-ink-faint px-6',
  secondary:
    'text-glow-violet border border-glow-violet hover:bg-glow-violet/10 px-6',
  ghosted:
    'text-glow-violet hover:bg-glow-violet/10 disabled:text-ink-faint px-3',
};

export const Button = ({
  hierarchy = 'primary',
  children,
  isLoading,
  ...rest
}: ButtonProps) => {
  return (
    <HeadlessButton
      className={clsx(
        'cursor-pointer rounded-full h-10 text-sm font-semibold transition disabled:cursor-not-allowed',
        'flex items-center gap-1 justify-center',
        BUTTON_STYLES[hierarchy],
      )}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? <ArrowPathIcon className="size-4 animate-spin" /> : children}
    </HeadlessButton>
  );
};
