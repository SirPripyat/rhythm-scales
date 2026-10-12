import type { PropsWithChildren } from 'react';

type TitleProps = PropsWithChildren & {
  index: number;
};

export const Title = ({ index, children }: TitleProps) => (
  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
    {index} · {children}
  </p>
);
