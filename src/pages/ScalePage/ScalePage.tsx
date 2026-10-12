import { Fretboard, FretboardSubtitles, ScaleExplorer } from '@/components';

export const ScalePage = () => {
  return (
    <>
      <ScaleExplorer />

      <div className={'flex flex-col gap-3'}>
        <FretboardSubtitles />
        <Fretboard />
      </div>
    </>
  );
};
