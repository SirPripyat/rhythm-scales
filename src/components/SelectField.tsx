import {
  Field,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { clsx } from 'clsx';
import { Label } from '@/components';

export type SelectOption<V extends string | number> = {
  value: V;
  label: string;
};

type SelectFieldProps<V extends string | number> = {
  label: string;
  value: V;
  options: SelectOption<V>[];
  onChange: (value: V) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

const buttonStyles = clsx(
  'flex h-[38px] items-center gap-2.5 whitespace-nowrap rounded-xl px-3.5',
  'border border-white/[0.14] bg-white/[0.055] text-ink font-body text-[13.5px] backdrop-blur-[10px]',
  'cursor-pointer transition-all hover:bg-white/[0.09]',
  'data-open:border-white/[0.26]',
  'focus:outline-none data-focus:outline data-focus:outline-white/40',
);

const iconStyles = clsx(
  'size-4 fill-ink-faint transition-transform group-data-open:rotate-180',
);

const optionsStyles = clsx(
  'z-3 w-(--button-width) rounded-2xl border border-white/[0.26] p-1.5',
  'bg-[rgba(18,16,30,0.72)] backdrop-blur-[28px] backdrop-saturate-150',
  '[--anchor-gap:8px] focus:outline-none',
);

const optionStyles = clsx(
  'cursor-pointer rounded-lg px-3 py-2 font-body text-[13.5px] text-ink-dim',
  'data-focus:bg-white/[0.09] data-focus:text-ink',
  'data-selected:border data-selected:border-glow-teal/45 data-selected:bg-glow-teal/16 data-selected:text-ink',
);

export const SelectField = <V extends string | number>({
  label,
  value,
  options,
  onChange,
  placeholder = 'Selecione',
  disabled,
  className,
}: SelectFieldProps<V>) => {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <Field
      className={clsx('flex flex-col gap-2', className)}
      disabled={disabled}
    >
      <Label>{label}</Label>

      <Listbox value={value} onChange={onChange}>
        <ListboxButton className={buttonStyles}>
          <span className="truncate">
            {selectedOption?.label ?? placeholder}
          </span>
          <ChevronDownIcon className={iconStyles} aria-hidden="true" />
        </ListboxButton>

        <ListboxOptions anchor="bottom" className={optionsStyles}>
          {options.map((option) => (
            <ListboxOption
              key={option.value}
              value={option.value}
              className={optionStyles}
            >
              {option.label}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </Field>
  );
};
