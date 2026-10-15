import './App.css';
import { BrowserRouter } from 'react-router';
import { AmbientBackground, Header } from '@/components';
import { Footer } from '@/components/Footer.tsx';
import { Routes } from '@/routes';

const App = () => {
  return (
    <BrowserRouter>
      <main className={'flex flex-col justify-between min-h-dvh'}>
        <div
          className={
            'flex h-full flex-col gap-6 px-4 py-5 sm:gap-8 sm:px-8 md:px-16 lg:gap-10 lg:px-24 xl:px-32 2xl:px-40'
          }
        >
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
