import { clsx } from 'clsx';
import type { PropsWithChildren } from 'react';
import { StatusLabel } from '@/pages/BuildScalePage/components/StatusLabel.tsx';
import { Title } from '@/pages/BuildScalePage/components/Title.tsx';
import type { Status } from '@/pages/BuildScalePage/types';

type StepCardProps = PropsWithChildren & {
  status: Status;
  title: string;
  index: number;
  blockedMessage?: string;
};

export const StepCard = ({
  children,
  status,
  index,
  title,
  blockedMessage = '',
}: StepCardProps) => {
  return (
    <div
      className={clsx(
        'relative rounded-3xl border border-glass-border bg-glass px-5 py-6 backdrop-blur-xl',
        'flex flex-col gap-6 w-full',
        status === 'blocked' && 'opacity-35',
      )}
    >
      <div className={'flex justify-between items-center'}>
        <Title index={index}>{title}</Title>

        <StatusLabel status={status} />
      </div>

      {status === 'blocked' && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-3xl bg-void/72 p-6 text-center backdrop-blur-[2px]">
          <p className="max-w-[40ch] font-mono text-[12px] text-ink">
            {blockedMessage}
          </p>
        </div>
      )}

      {children}
    </div>
  );
};
