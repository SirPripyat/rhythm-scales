import './App.css';
import { BrowserRouter } from 'react-router';
import { AmbientBackground, Header } from '@/components';
import { Footer } from '@/components/Footer.tsx';
import { Routes } from '@/routes';

const App = () => {
  return (
    <BrowserRouter>
      <main className={'flex flex-col justify-between min-h-dvh'}>
        <div className={'px-30 py-5 flex flex-col gap-10 h-full'}>
          <AmbientBackground />
          <Header />

          <Routes />
        </div>
        <Footer />
      </main>
    </BrowserRouter>
  );
};
export default App;
