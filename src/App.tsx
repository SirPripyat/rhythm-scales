import './App.css';
import {
  AmbientBackground,
  Fretboard,
  FretboardSubtitles,
  Header,
  ScaleExplorer,
} from '@/components';

const App = () => {
  return (
    <main className={'px-10 py-5 flex flex-col gap-10'}>
      <AmbientBackground />

      <Header />

      <ScaleExplorer />

      <div className={'flex flex-col gap-3'}>
        <FretboardSubtitles />
        <Fretboard />
      </div>
    </main>
  );
};
export default App;
