import { clsx } from 'clsx';
import type { Status } from '../types';

type StatusLabelProps = {
  status: 'checked' | 'blocked' | 'inProgress';
};

const STATUS_COLORS: Record<Status, string> = {
  checked: 'text-glow-teal',
  blocked: 'text-ink-faint',
  inProgress: 'text-glow-violet',
};

const STATUS_LABELS: Record<Status, string> = {
  checked: 'Confirmado',
  blocked: 'Bloqueado',
  inProgress: 'Em andamento',
};

export const StatusLabel = ({ status }: StatusLabelProps) => {
  return (
    <span
      className={clsx(
        'font-mono text-[11px] uppercase tracking-[0.14rem]',
        STATUS_COLORS[status],
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
};
