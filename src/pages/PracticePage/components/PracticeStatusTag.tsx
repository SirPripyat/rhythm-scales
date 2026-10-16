import { clsx } from 'clsx';
import type {
  PracticeCardStatus,
  PracticeMode,
} from '@/pages/PracticePage/types';

type PracticeStatusTagProps = {
  status: PracticeCardStatus;
  mode: PracticeMode;
};

const PRACTICE_TAG_MODE_STYLES: Record<PracticeMode, string> = {
  buildScale: 'bg-glow-amber/10 text-glow-amber',
  guessNote: 'bg-glow-teal/10 text-glow-teal',
};

const PRACTICE_TAG_STATUS_TEXT: Record<PracticeCardStatus, string> = {
  soon: 'Em breve',
  available: 'Disponível',
  new: 'Novo',
};

export const PracticeStatusTag = ({ status, mode }: PracticeStatusTagProps) => {
  return (
    <span
      className={clsx(
        'rounded-full p-2 uppercase font-bold px-2.5 py-1 font-mono text-[10px] tracking-widest',
        PRACTICE_TAG_MODE_STYLES[mode],
      )}
    >
      {PRACTICE_TAG_STATUS_TEXT[status]}
    </span>
  );
};
