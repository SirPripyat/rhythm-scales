# Roteiro — Rhythm Scales

## Objetivo

App de estudo de escalas para guitarra: diagrama de braço + tablatura + áudio,
com tônica, tipo de escala, afinação e número de trastes configuráveis.
Protótipo de design (referência visual/UX): https://claude.ai/artifact/88bkzhVW9ZQB2KGoZDnPYk

## Modo de trabalho

Papéis invertidos em relação ao normal: o usuário escreve o código, a Claude
revisa e guia — em ciclos curtos, um pedaço pequeno por vez. Objetivo duplo:
aprender a implementar o projeto **e** fixar teoria de escalas no processo.

## Fases

- [x] **Fase 1 — Motor de teoria musical** (`src/theory.ts`, puro TS, sem UI)
  - [x] 1.1 Notas cromáticas (`NOTE_NAMES`, `noteNameFromPitchClass`)
  - [x] 1.2 Fórmulas de escala (`ScaleType`, `SCALE_INTERVALS`)
    - [x] 1.2a Pentatônicas e blues
    - [ ] 1.2b Modos gregos — **adiado**, fora do escopo por ora (ver Decisões/aprendizados)
  - [x] 1.3 Função tônica + escala → notas/graus da escala
  - [x] 1.4 Afinações (notas das cordas soltas) + nota em corda/traste
  - [x] 1.5 Função que gera todas as posições da escala no braço (corda × traste → nota/grau/isRoot)
- [x] **Fase 2 — Componente do braço** (fretboard em HTML/CSS, consumindo o motor)
- [x] **Fase 3 — Controles** (tônica, escala, afinação, nº de trastes)

## Passo atual

**Fase 4 — Tablatura**

Fase 3 encerrada: `App.tsx` guarda o estado (`ScaleExplorerState`: tonic,
scaleType, tuning, fretCount) via `useState`, repassado pro `ScaleExplorer`
(controles) e pro `Fretboard` (visualização), ambos lendo da mesma fonte.
Tônica é um `RadioGroup` de chips; escala/afinação/trastes usam o
`SelectField` (componente reutilizável em cima do `Listbox` do Headless
UI). Três ajustes finos de UX também fechados: sem linha de corda no
traste 0, nota da corda solta sempre visível (bolinha só se estiver na
escala), ordem das cordas corrigida (Mi agudo em cima, Mi grave embaixo).

A ser detalhado em conversa: como desenhar a régua de tablatura alinhada
ao braço (reaproveitar `getFretboardPositions`? layout por baixo do
`Fretboard` ou componente separado?).

## Decisões/aprendizados

- **Símbolo de sustenido**: usamos `♯` (U+266F, sharp sign musical) em vez
  de `#` (ASCII) em `NOTE_NAMES`. Decisão da Fase 1.1 — manter consistência
  em qualquer lugar que a UI for exibir nomes de nota.
- **Testes automatizados**: decidido não escrever arquivos de teste
  (`*.test.ts`) neste projeto — validação é manual, caso a caso, durante a
  revisão de cada passo do roadmap.
- **Ordem de 1.2**: pentatônicas/blues antes dos modos gregos, por
  preferência do usuário (não há dependência técnica entre eles).
- **Modos gregos adiados**: usuário decidiu não implementar 1.2b por ora
  e seguir direto pra Fase 2. `ScaleType`/`SCALE_INTERVALS` continuam
  extensíveis — pode voltar a isso depois sem impacto no resto do motor.
- **Assinatura de `noteAtStringFret`**: `(stringIndex, fret, tuning =
  TUNINGS.standard)` — `tuning` por último e com default, pra não precisar
  passar `TUNINGS.standard` toda vez que for a afinação mais comum.
- **`theory.ts` dividido**: o arquivo único virou `src/types/` (tipos:
  `ScaleType`, `Tuning`, `FretboardPosition`, `ScaleNote`) e `src/utils/`
  (funções: `arrayUtils`, `fretboardUtils`, `notesUtils`, `scaleUtils`,
  `tuningUtils`, cada um com seu barrel). `src/constants/` guarda valores
  de apresentação do braço (`SINGLE_INLAY_FRETS`, `DOUBLE_INLAY_FRETS`,
  `DEFAULT_FRET_COUNT`).
- **Visual do braço — HTML/CSS, não SVG**: decidido aproximar o visual do
  protótipo Fretcraft usando grid CSS + Tailwind em vez de SVG, pra manter
  a abordagem mais simples. A paleta de cores do protótipo foi copiada
  como tokens Tailwind v4 (`@theme` em `App.css`: `wood`, `nut`,
  `fretwire`, `string-plain`, `string-wound`, `inlay`, `accent`, `degree`,
  `ink`, `ink-dim`).
- **`Fretboard` quebrado em sub-componentes**: `FretboardCell` (uma célula
  corda×traste — bordas, pestana, espessura/cor da corda), `NoteMarker`
  (bolinha de nota, renderiza `null` se não há nota naquela posição),
  `FretNumber` (linha de números de traste, só nos trastes de referência),
  `Inlay` (pontinhos de referência, numa camada `absolute` separada atrás
  do grid principal — não dá pra misturar item de posicionamento explícito
  no mesmo grid que usa posicionamento automático, quebra o layout).
- **Lição de CSS Grid com posicionamento automático**: todo item que
  "falta" (retorna `null`/não renderiza) ou que "sobra" (dois itens onde
  o grid espera um) desalinha o preenchimento automático das células
  seguintes. Por isso o padrão em todo componente do braço é: o wrapper
  do item **sempre** renderiza (ocupando a célula), só o conteúdo de
  dentro é condicional.
- **Headless UI em vez de shadcn/ui ou react-hook-form**: escolhido pra
  controles por ser leve (poucos componentes necessários: `Listbox`,
  `RadioGroup`) e por ser comportamento puro + Tailwind, sem estilo
  pré-pronto pra desfazer. `react-hook-form`/`valibot` descartados — não
  são formulários com submit/validação, são controles que aplicam na hora
  e já vêm restritos a opções válidas (não há estado inválido possível).
- **`Select` (nativo) trocado por `Listbox` (custom)**: o painel aberto de
  um `<select>` nativo não é estilizável via CSS — é renderizado pelo
  SO/navegador. `Listbox` renderiza as opções como elementos normais,
  então dá controle visual total, ao custo de mais código (precisa montar
  `ListboxButton` mostrando o rótulo selecionado manualmente).
- **`SelectField`**: componente reutilizável que elimina a duplicação dos
  três `Listbox` (escala/afinação/trastes). Armadilha encontrada: `key`
  **não pode** ser nome de prop customizada — é reservado pelo React, que
  intercepta e nunca repassa pro componente (chega sempre `undefined`).
  Design final: `value`/`onChange`/`options`, sem genérico `K extends
  keyof T` — quem decide qual campo do estado está sendo editado é quem
  *usa* o componente (`onChange={(v) => handleValues(v, 'scaleType')}`),
  não o componente em si.
- **`Note` como `as const` + union, não `enum`**: TypeScript `enum`
  numérico aceita *qualquer* `number` como válido sem erro (não é um tipo
  fechado de verdade) — um `% 13` por engano não seria pego. Trocado por
  `export const Note = {...} as const; export type Note =
  (typeof Note)[keyof typeof Note];`, que fecha o tipo num union
  `0 | 1 | ... | 11` de verdade. Regra de uso: `Note` em valores
  *nomeados* (tônica escolhida, cordas soltas da afinação); `number` puro
  em resultado de *cálculo* (grau de escala, índice de corda/traste — o
  intervalo desses varia por contexto, não é um domínio fechado de 12
  valores como nota).
- **`// biome-ignore-all`**: supressão de regra do Biome pro **arquivo
  inteiro** (não só a linha seguinte), colocada como primeiro comentário
  do arquivo. Usado em `Fretboard.tsx` pra `noArrayIndexKey` — as listas
  ali (cordas, trastes) são sequências sintéticas que só crescem/encolhem
  pelo final, nunca reordenam, então índice como `key` é seguro de
  verdade, não só "ignorado".
