import { ClockIcon } from '@heroicons/react/24/outline';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import { useGuessNoteStore } from '../stores';
import type { GuessNotePhase } from '../types';
import { EarIcon } from './EarIcon';

type IconPhaseProps = {
  phase: GuessNotePhase;
};

const ICON_PHASE: Record<GuessNotePhase, ReactNode> = {
  idle: <EarIcon />,
  waiting: <ClockIcon className={'size-7 text-ink-dim'} />,
  correct: <CheckIcon className={'size-7 text-glow-teal'} />,
  incorrect: <XMarkIcon className={'size-7 text-glow-rose'} />,
};

const ICON_PHASE_STYLES: Record<GuessNotePhase, string> = {
  idle: 'border-glass-border',
  waiting: 'relative border-glass-border',
  correct: 'border-glow-teal bg-glow-teal/22',
  incorrect: 'border-glow-rose bg-glow-rose/22',
};

const WAITING_ICON_ANIMATION =
  "after:content-[''] after:absolute after:-inset-px after:rounded-full after:border after:border-glow-teal after:animate-pulse-ring motion-reduce:after:animate-none";

export const IconPhase = ({ phase }: IconPhaseProps) => {
  const {
    progress: { isPlaying },
  } = useGuessNoteStore();

  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center rounded-full size-14 border',
        ICON_PHASE_STYLES[phase],
        phase === 'waiting' && isPlaying && WAITING_ICON_ANIMATION,
      )}
    >
      {ICON_PHASE[phase]}
    </div>
  );
};
