import { clsx } from 'clsx';
import { useNavigate } from 'react-router';
import type { PracticeMode } from '../types';
import { PRACTICE_CARD_CONTENT } from '../utils';
import { PracticeCardIcon } from './PracticeCardIcon';
import { PracticeStatusTag } from './PracticeStatusTag';

type PracticeCardProps = {
  mode: PracticeMode;
};

const PRACTICE_CARD_HOVER_STYLES: Record<PracticeMode, string> = {
  buildScale: 'hover:border-glow-amber hover:bg-glow-amber/10',
  guessNote: 'hover:border-glow-teal hover:bg-glow-teal/10',
};

export const PracticeCard = ({ mode }: PracticeCardProps) => {
  const { status, title, description, onLink } = PRACTICE_CARD_CONTENT[mode];
  const navigate = useNavigate();

  const handlePracticeNavigate = () => onLink && navigate(onLink);

  return (
    <button
      type="button"
      disabled={status === 'soon'}
      onClick={handlePracticeNavigate}
      className={clsx(
        'cursor-pointer bg-glass border border-glass-border rounded-3xl p-6 flex flex-col gap-3 text-left transition duration-300',
        'hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 disabled:cursor-not-allowed',
        'disabled:pointer-events-none disabled:opacity-50',
        PRACTICE_CARD_HOVER_STYLES[mode],
      )}
    >
      <div className={'flex justify-between items-start'}>
        <PracticeCardIcon mode={mode} />

        <PracticeStatusTag status={status} mode={mode} />
      </div>

      <h2 className={'font-display text-lg font-bold text-ink'}>{title}</h2>

      <p className={'text-sm leading-relaxed text-ink-dim'}>{description}</p>
    </button>
  );
};
