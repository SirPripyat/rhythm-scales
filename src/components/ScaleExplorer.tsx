import { Radio, RadioGroup } from '@headlessui/react';
import { Label } from '@/components';
import { SelectField } from '@/components/SelectField.tsx';
import type { ScaleExplorerState, ScaleType } from '@/types';
import {
  FRET_OPTIONS,
  NOTE_LABELS,
  SCALE_TYPE_LABELS,
  TUNINGS_LABELS,
} from '@/utils';

type ScaleExplorerProps = {
  handleValues: <K extends keyof ScaleExplorerState>(
    value: ScaleExplorerState[K],
    key: K,
  ) => void;
  scaleExplorer: ScaleExplorerState;
};

export const ScaleExplorer = ({
  scaleExplorer,
  handleValues,
}: ScaleExplorerProps) => {
  return (
    <div className={'flex gap-6 bg-wood-surface p-6 rounded-lg'}>
      <RadioGroup
        value={scaleExplorer.tonic}
        onChange={(tonic) => handleValues(tonic, 'tonic')}
        className={'flex flex-col gap-2'}
      >
        <Label>Tônica</Label>
        <div className={'flex gap-4'}>
          {Object.entries(NOTE_LABELS).map(([value, label]) => (
            <Radio
              key={label}
              value={Number(value)}
              className={
                'flex items-center justify-center cursor-pointer rounded-lg h-10 w-10 bg-wood-surface-2 text-ink-dim shadow-md transition focus:not-data-focus:outline-none data-checked:bg-accent data-checked:text-ink data-focus:outline data-focus:outline-white'
              }
            >
              {label}
            </Radio>
          ))}
        </div>
      </RadioGroup>

      <SelectField
        label={'Escala'}
        value={scaleExplorer.scaleType}
        onChange={(value) => handleValues(value as ScaleType, 'scaleType')}
        options={Object.entries(SCALE_TYPE_LABELS).map(([value, label]) => ({
          value,
          label,
        }))}
      />

      <SelectField
        label={'Afinação'}
        value={scaleExplorer.tuning}
        onChange={(value) => handleValues(value, 'tuning')}
        options={Object.entries(TUNINGS_LABELS).map(([value, label]) => ({
          value,
          label,
        }))}
      />

      <SelectField
        label={'Qtd. Trastes'}
        value={scaleExplorer.fretCount}
        onChange={(value) => handleValues(value, 'fretCount')}
        options={FRET_OPTIONS.map((fret) => ({
          value: fret,
          label: `${fret} trastes`,
        }))}
      />
    </div>
  );
};
