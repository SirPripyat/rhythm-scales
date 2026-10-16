import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import type { PracticeMode } from '../types';

type PracticeCardIconProps = {
  mode: PracticeMode;
};

const PRACTICE_MODE_ICONS: Record<PracticeMode, ReactNode> = {
  buildScale: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      className="size-5"
      aria-hidden="true"
    >
      <line x1="5" y1="4" x2="5" y2="20" />
      <line x1="10.3" y1="4" x2="10.3" y2="20" />
      <line x1="15.6" y1="4" x2="15.6" y2="20" />
      <line x1="21" y1="4" x2="21" y2="20" />
      <line x1="2" y1="8.5" x2="24" y2="8.5" strokeWidth={1.2} opacity={0.6} />
      <line
        x1="2"
        y1="15.5"
        x2="24"
        y2="15.5"
        strokeWidth={1.2}
        opacity={0.6}
      />
      <circle cx="10.3" cy="8.5" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  ),
  guessNote: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
      aria-hidden="true"
    >
      <path d="M6 10.5 L6 13.5" />
      <path d="M9 7.5 L9 16.5" />
      <path d="M12 4.5 L12 19.5" />
      <path d="M15.2 9 Q18.5 12 15.2 15" />
    </svg>
  ),
};

const PRACTICE_ICON_STYLES: Record<PracticeMode, string> = {
  buildScale: 'bg-glow-amber/10 text-glow-amber',
  guessNote: 'bg-glow-teal/10 text-glow-teal',
};

export const PracticeCardIcon = ({ mode }: PracticeCardIconProps) => {
  return (
    <div
      className={clsx(
        PRACTICE_ICON_STYLES[mode],
        'flex items-center justify-center rounded-xl size-10',
      )}
    >
      {PRACTICE_MODE_ICONS[mode]}
    </div>
  );
};
