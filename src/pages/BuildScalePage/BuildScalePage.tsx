import { SectionIntro } from '@/components';
import { useGameStore } from '@/stores';
import {
  CompletionBanner,
  ConfigurationStep,
  SpatialStep,
  SymbolicStep,
} from './components';

export const BuildScalePage = () => {
  const spatialAllCorrect = useGameStore((s) => s.progress.spatialAllCorrect);

  return (
    <>
      <SectionIntro
        title={'Monte a escala no braço'}
        description={
          'Escolha a tônica e o tipo de escala, desenhe nota por nota no braço e confira se o resultado bate com o padrão certo.'
        }
        eyebrow={'Construir escala'}
        glowColor={'amber'}
      />
      <ConfigurationStep />
      <SymbolicStep />
      <SpatialStep />
      {spatialAllCorrect && <CompletionBanner />}
    </>
  );
};
