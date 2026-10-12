import {
  CompletionBanner,
  ConfigurationStep,
  SpatialStep,
  SymbolicStep,
} from '@/pages/BuildScalePage/components';
import { useGameStore } from '@/stores';

export const BuildScalePage = () => {
  const spatialAllCorrect = useGameStore((s) => s.spatialAllCorrect);

  return (
    <>
      <ConfigurationStep />
      <SymbolicStep />
      <SpatialStep />
      {spatialAllCorrect && <CompletionBanner />}
    </>
  );
};
