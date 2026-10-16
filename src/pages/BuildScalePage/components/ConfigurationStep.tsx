import { clsx } from 'clsx';
import { Button, RadioGroup, SelectField } from '@/components';
import { StatusLabel } from '@/pages/BuildScalePage/components/StatusLabel.tsx';
import { Title } from '@/pages/BuildScalePage/components/Title.tsx';
import { useGameStore } from '@/stores';
import type { Note, ScaleType } from '@/types';
import {
  FRET_OPTIONS,
  NOTE_LABELS,
  SCALE_TYPE_LABELS,
  toOptions,
} from '@/utils';

export const ConfigurationStep = () => {
  const {
    config: { root, scaleType, fretCount },
    configure,
    progress: { configConfirmed },
    confirmConfig,
  } = useGameStore();

  return (
    <div
      className={clsx(
        'rounded-3xl border border-glass-border bg-glass px-5 py-6 backdrop-blur-xl',
        'flex flex-col gap-6 w-full',
      )}
    >
      <div className={'flex justify-between items-center'}>
        <Title index={1}>Configuração</Title>

        <StatusLabel status={configConfirmed ? 'checked' : 'inProgress'} />
      </div>
      <div className={'flex flex-wrap items-end gap-6'}>
        <RadioGroup
          value={root}
          onChange={(root) => configure({ root: root as Note })}
          label={'Tônica'}
          options={toOptions(NOTE_LABELS)}
        />

        <SelectField
          value={scaleType}
          onChange={(value) => configure({ scaleType: value as ScaleType })}
          label={'Escala'}
          options={toOptions(SCALE_TYPE_LABELS)}
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

      <div className={'flex flex-wrap items-center justify-end gap-4'}>
        <Button
          onClick={confirmConfig}
          disabled={configConfirmed}
          hierarchy={'primary'}
        >
          Confirmar
        </Button>
      </div>
    </div>
  );
};
