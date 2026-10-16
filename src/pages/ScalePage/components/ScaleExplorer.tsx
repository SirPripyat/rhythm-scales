import { RadioGroup, SelectField } from '@/components';
import { useFretboardStore } from '@/stores';
import type { Note, ScaleType } from '@/types';
import {
  FRET_OPTIONS,
  NOTE_LABELS,
  SCALE_TYPE_LABELS,
  TUNINGS_LABELS,
} from '@/utils';

export const ScaleExplorer = () => {
  const { root, scaleType, tuningKey, fretCount, configure } =
    useFretboardStore();

  return (
    <div className="flex flex-wrap items-end gap-4 rounded-3xl border border-glass-border bg-glass p-4 backdrop-blur-xl sm:gap-6 sm:p-5">
      <RadioGroup
        value={root}
        onChange={(value) => configure({ root: value as Note })}
        label={'Tônica'}
        options={Object.entries(NOTE_LABELS).map(([value, label]) => ({
          value,
          label,
        }))}
      />

      <SelectField
        label={'Escala'}
        value={scaleType}
        onChange={(value) => configure({ scaleType: value as ScaleType })}
        options={Object.entries(SCALE_TYPE_LABELS).map(([value, label]) => ({
          value,
          label,
        }))}
      />
      <SelectField
        label={'Afinação'}
        value={tuningKey}
        onChange={(value) => configure({ tuningKey: value })}
        options={Object.entries(TUNINGS_LABELS).map(([value, label]) => ({
          value,
          label,
        }))}
      />
      <SelectField
        label={'Qtd. Trastes'}
        value={fretCount}
        onChange={(value) => configure({ fretCount: value })}
        options={FRET_OPTIONS.map((fret) => ({
          value: fret,
          label: `${fret} trastes`,
        }))}
      />
    </div>
  );
};
