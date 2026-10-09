import './App.css';
import { useState } from 'react';
import { DEFAULT_FRET_COUNT } from '@/constants';
import { Note, type ScaleExplorerState } from '@/types';
import { TUNINGS, TUNINGS_MIDI } from '@/utils';
import { Fretboard, Header, ScaleExplorer } from './components';

const App = () => {
  const [scaleExplorer, setScaleExplorer] = useState<ScaleExplorerState>({
    tonic: Note.C,
    scaleType: 'major',
    tuning: 'standard',
    fretCount: DEFAULT_FRET_COUNT,
  });

  const handleValues = <K extends keyof ScaleExplorerState>(
    value: ScaleExplorerState[K],
    key: K,
  ) => setScaleExplorer((prev) => ({ ...prev, [key]: value }));

  return (
    <main className={'px-10 py-5 flex flex-col gap-10'}>
      <Header />

      <ScaleExplorer
        handleValues={handleValues}
        scaleExplorer={scaleExplorer}
      />

      <Fretboard
        fretCount={scaleExplorer.fretCount}
        tuning={TUNINGS[scaleExplorer.tuning]}
        root={scaleExplorer.tonic}
        scaleType={scaleExplorer.scaleType}
        tuningMidi={TUNINGS_MIDI[scaleExplorer.tuning]}
      />
    </main>
  );
};

export default App;
