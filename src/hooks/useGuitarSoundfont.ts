import { useRef } from 'react';
import { Soundfont } from 'smplr';

export const useGuitarSoundfont = () => {
  const guitarRef = useRef<Soundfont | null>(null);

  return (midiNote: number) => {
    if (!guitarRef.current) {
      const context = new AudioContext();

      guitarRef.current = new Soundfont(context, {
        instrument: 'acoustic_guitar_steel',
      });
    }

    guitarRef.current.start({ note: midiNote });
  };
};
