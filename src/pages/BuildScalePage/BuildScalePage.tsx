import { useGameStore } from '@/stores';
import {
  CompletionBanner,
  ConfigurationStep,
  SectionTitle,
  SpatialStep,
  SymbolicStep,
} from './components';

export const BuildScalePage = () => {
  const spatialAllCorrect = useGameStore((s) => s.spatialAllCorrect);

  return (
    <>
      <SectionTitle />
      <ConfigurationStep />
      <SymbolicStep />
      <SpatialStep />
      {spatialAllCorrect && <CompletionBanner />}
    </>
  );
};
