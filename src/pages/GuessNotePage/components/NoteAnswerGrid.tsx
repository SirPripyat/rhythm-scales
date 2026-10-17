import type { ReactNode } from 'react';
import { useGuessNoteStore } from '../stores';
import type { GuessNotePhase } from '../types';
import { CorrectPhasePanel } from './CorrectPhasePanel';
import { IdlePhasePanel } from './IdlePhasePanel';
import { IncorrectPhasePanel } from './IncorrectPhasePanel';
import { WaitingPhasePanel } from './WaitingPhasePanel';

const componentToRender: Record<GuessNotePhase, ReactNode> = {
  idle: <IdlePhasePanel />,
  waiting: <WaitingPhasePanel />,
  correct: <CorrectPhasePanel />,
  incorrect: <IncorrectPhasePanel />,
};

export const NoteAnswerGrid = () => {
  const {
    progress: { phase },
  } = useGuessNoteStore();

  return componentToRender[phase];
};
