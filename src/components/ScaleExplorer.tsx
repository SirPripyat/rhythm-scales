import { Radio, RadioGroup } from '@headlessui/react';
import { clsx } from 'clsx';
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
    <div
      className="flex flex-wrap items-end gap-6 rounded-3xl border border-white/[0.14]
  bg-white/[0.055] p-5 backdrop-blur-xl"
    >
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
              className={clsx(
                'flex h-9.5 w-9.5 items-center justify-center rounded-xl font-mono text-[13px]',
                'border border-white/[0.14] bg-white/[0.055] text-ink-dim backdrop-blur-[10px] transition-all',
                'cursor-pointer hover:bg-white/[0.09] hover:text-ink hover:-translate-y-px',
                'data-checked:border-glow-teal/45 data-checked:bg-glow-teal/16 data-checked:text-ink',
                'focus:outline-none data-focus:outline data-focus:outline-white/40',
              )}
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
