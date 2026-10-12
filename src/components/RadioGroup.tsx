import { RadioGroup as HeadlessRadioGroup, Radio } from '@headlessui/react';
import { clsx } from 'clsx';
import { Label } from '@/components';

type RadioGroupProps = {
  value: string | number;
  onChange: (value: string | number) => void;
  label: string;
  options: { label: string; value: string | number }[];
};

export const RadioGroup = ({
  value,
  onChange,
  label,
  options,
}: RadioGroupProps) => {
  return (
    <HeadlessRadioGroup
      value={value}
      onChange={onChange}
      className={'flex flex-col gap-2'}
    >
      <Label>{label}</Label>

      <div className={'flex gap-4'}>
        {options.map(({ value, label }) => (
          <Radio
            key={label}
            value={Number(value)}
            className={clsx(
              'flex h-9.5 w-9.5 items-center justify-center rounded-xl font-mono text-[13px]',
              'border border-white/[0.14] bg-white/5.5 text-ink-dim backdrop-blur-[10px] transition-all',
              'cursor-pointer hover:bg-white/9 hover:text-ink hover:-translate-y-px',
              'data-checked:border-glow-teal/45 data-checked:bg-glow-teal/16 data-checked:text-ink',
              'focus:outline-none data-focus:outline data-focus:outline-white/40',
            )}
          >
            {label}
          </Radio>
        ))}
      </div>
    </HeadlessRadioGroup>
  );
};
