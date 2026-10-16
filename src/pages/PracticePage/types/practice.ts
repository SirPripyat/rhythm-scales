export type PracticeMode = 'buildScale' | 'guessNote';

export type PracticeCardStatus = 'available' | 'new' | 'soon';

export type PracticeCardContent = {
  title: string;
  description: string;
  status: PracticeCardStatus;
  onLink?: string;
};
