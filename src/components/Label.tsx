import { Label as HeadlessLabel } from '@headlessui/react';
import type { PropsWithChildren } from 'react';

export const Label = ({ children }: PropsWithChildren) => {
  return (
    <HeadlessLabel className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
      {children}
    </HeadlessLabel>
  );
};
