import type { PracticeCardContent, PracticeMode } from '../types';

export const PRACTICE_CARD_CONTENT: Record<PracticeMode, PracticeCardContent> =
  {
    buildScale: {
      title: 'Construir Escala',
      description:
        'Monte o desenho de uma escala no braço, nota por nota, e confira contra o padrão correto.',
      status: 'available',
      onLink: '/practice/build-scale',
    },
    guessNote: {
      title: 'Adivinhar a Nota',
      description:
        'Ouça um som e diga de ouvido qual nota é — sem olhar para o braço.',
      status: 'soon',
    },
  };
