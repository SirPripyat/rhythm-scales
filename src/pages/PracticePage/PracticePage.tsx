import { SectionIntro } from '@/components';
import { PracticeCard } from '@/pages/PracticePage/components';

export const PracticePage = () => {
  return (
    <>
      <SectionIntro
        title={'Escolha um jeito de treinar'}
        description={
          'Cada modo foca uma habilidade diferente. Construa escalas no braço, treine o ouvido, e em breve, intervalos e ritmo.'
        }
        eyebrow={'Praticar'}
        glowColor={'violet'}
      />

      <div
        className={
          'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        }
      >
        <PracticeCard mode={'buildScale'} />
        <PracticeCard mode={'guessNote'} />
      </div>
    </>
  );
};
