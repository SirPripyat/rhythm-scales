import { Label as HeadlessLabel } from '@headlessui/react';
import type { PropsWithChildren } from 'react';

export const Label = ({ children }: PropsWithChildren) => {
  return (
    <HeadlessLabel className={'text-ink-dim text-xs uppercase tracking-wide'}>
      {children}
    </HeadlessLabel>
  );
};
