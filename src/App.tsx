import './App.css';
import {
  AmbientBackground,
  Fretboard,
  Header,
  ScaleExplorer,
} from '@/components';

const App = () => {
  return (
    <main className={'px-10 py-5 flex flex-col gap-10'}>
      <AmbientBackground />

      <Header />

      <ScaleExplorer />

      <Fretboard />
    </main>
  );
};

export default App;
