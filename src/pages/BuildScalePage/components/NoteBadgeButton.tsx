import { ListboxButton } from '@headlessui/react';
import { clsx } from 'clsx';
import type { PropsWithChildren } from 'react';

type NoteBadgeButtonProps = PropsWithChildren<{
  size: 'sm' | 'lg';
  colorClassName: string;
}>;

export const NoteBadgeButton = ({
  size,
  colorClassName,
  children,
}: NoteBadgeButtonProps) => (
  <ListboxButton
    className={clsx(
      'flex items-center justify-center rounded-full border font-mono text-[13px] font-bold',
      'backdrop-blur-[6px] transition cursor-pointer border-glass-border bg-glass hover:bg-white/9',
      'data-open:border-white/26 data-disabled:pointer-events-none',
      size === 'lg' ? 'size-12' : 'size-8',
      colorClassName,
    )}
  >
    {children}
  </ListboxButton>
);
