import { create, type StateCreator } from 'zustand';

type ConfigStoreState<Config, Derived, Progress> = {
  config: Config;
  derived: Derived;
  progress: Progress;
  configure: (patch: Partial<Config>) => void;
  reset: () => void;
};

type ConfigStoreOptions<Config, Derived, Progress, Actions> = {
  defaultConfig: Config;
  deriveState: (config: Config) => Derived;
  defaultProgress?: () => Progress;
  // mesmos `set`/`get` que o zustand passaria pro StateCreator da store
  // inteira — é o que garante que os tipos batem dentro de `actions`.
  actions?: (
    ...args: Parameters<
      StateCreator<ConfigStoreState<Config, Derived, Progress> & Actions>
    >
  ) => Actions;
};

/**
 * Store de zustand no formato config → derived → progress: `configure`
 * faz merge no config, recalcula o derived e reseta o progress — o mesmo
 * padrão que useFretboardStore/useGameStore repetiam cada um por conta própria.
 */
export const createConfigStore = <
  Config extends object,
  Derived extends object,
  Progress extends object = Record<string, never>,
  Actions extends object = Record<string, never>,
>({
  defaultConfig,
  deriveState,
  defaultProgress = () => ({}) as Progress,
  actions,
}: ConfigStoreOptions<Config, Derived, Progress, Actions>) => {
  type FullState = ConfigStoreState<Config, Derived, Progress> & Actions;

  return create<FullState>()((set, get, api) => ({
    config: defaultConfig,
    derived: deriveState(defaultConfig),
    progress: defaultProgress(),

    configure: (patch) =>
      set((state) => {
        const config = { ...state.config, ...patch };

        return {
          config,
          derived: deriveState(config),
          progress: defaultProgress(),
        } as Partial<FullState>;
      }),

    reset: () =>
      set({
        config: defaultConfig,
        derived: deriveState(defaultConfig),
        progress: defaultProgress(),
      } as Partial<FullState>),

    ...((actions?.(set, get, api) ?? {}) as Actions),
  }));
};
