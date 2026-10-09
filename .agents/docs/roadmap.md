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

As fases 4 (Tablatura) e 5 (Áudio genérico) originais foram **removidas** —
o roteiro em fases fixas encerrou na Fase 3. Dali em diante, o projeto
passou a avançar por **features soltas**, escolhidas conforme o objetivo
real do usuário: treinar teoria musical na prática, não só visualizar.

## Features (pós-fases)

- [x] **Clicar numa nota toca o som real no violão** — usa `smplr`
  (soundfont `acoustic_guitar_steel`), amostras carregadas sob demanda via
  CDN. Só notas que pertencem à escala atual são clicáveis (decisão do
  usuário — nota de corda solta fora da escala é só informativa).

## Passo atual

**Feature em andamento: segunda tela — jogo "Montar a escala".**

Mecânica (decisão do usuário): dado um root escolhido pelo usuário, o jogo
tem duas etapas em sequência —

1. **Etapa simbólica**: usuário monta de cabeça a sequência de notas da
   escala maior a partir do root (sem olhar o braço), baseado no padrão da
   escala de Dó (Dó Ré Mi Fá Sol Lá Si Dó). Valida contra
   `getScaleNotes(root, 'major')`, que já existe e dá exatamente
   `{ degree, pitchClass, noteName }[]` pra cada grau.
2. **Etapa espacial**: só depois da etapa 1 completa e correta, o usuário
   posiciona essas mesmas notas no braço (clicando corda×traste), num
   braço "vazio" (sem marcadores prontos) — reaproveitando o motor/visual
   do `Fretboard` existente, mas em modo "quiz" em vez de modo "display".

Navegação: **React Router** (rotas reais, ex. `/` pra tela Escala atual,
`/jogo` pra essa tela nova) — decisão do usuário, mesmo sendo a primeira
dependência nova desde o início do projeto nessa categoria (as outras —
Headless UI, smplr — foram por leveza/necessidade pontual; aqui é porque o
app passa a ser multi-tela de verdade).

Passos planejados (um por vez, ciclo curto por passo):
- [ ] **Passo 1 — Roteamento**: instalar `react-router`, envolver a árvore
  com o router, extrair o conteúdo atual de `App.tsx` pra uma rota `/`
  (ex. `EscalaPage`), criar rota `/jogo` com uma página placeholder, e
  adicionar navegação (abas/links) no `Header`.
- [ ] **Passo 2 — Store do jogo**: estado da etapa simbólica (root
  sorteado/escolhido, respostas do usuário por grau, acerto/erro por grau,
  se a etapa 1 está completa) e da etapa espacial (posições clicadas,
  acerto/erro por posição).
- [ ] **Passo 3 — UI da etapa simbólica**: seletor de notas + slots dos 7
  graus + feedback de acerto/erro, usando `getScaleNotes`.
- [ ] **Passo 4 — UI da etapa espacial**: braço em modo "quiz" (variante do
  `Fretboard`/`FretboardCell` que aceita clique como resposta em vez de só
  mostrar o resultado) + feedback + transição pro final/novo round.

Outras candidatas discutidas, ainda não escolhidas (ficam pra depois):
modo "adivinhe a nota", alternar nota/grau no braço, identificar a escala
por padrão, posições/caixas (CAGED), acordes diatônicos, tocar a escala
inteira em sequência (áudio).

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
- **`smplr` em vez de síntese Web Audio pura**: usuário queria som de
  violão de verdade, não um bipe sintetizado. `smplr` carrega amostras
  reais de um soundfont (`acoustic_guitar_steel`) sob demanda, via CDN —
  sem bundlar áudio no projeto.
- **`TUNINGS_MIDI` paralelo a `TUNINGS`**: `TUNINGS` guarda só classe de
  nota (`Note`, 0-11), sem oitava — insuficiente pra tocar o tom certo
  (duas cordas podem ter a mesma nota em oitavas diferentes). `TUNINGS_MIDI`
  guarda o MIDI absoluto de cada corda solta; `tuningMidi[stringIndex] +
  fret` dá o MIDI real da posição (sem `% 12` — aqui se quer o tom
  absoluto, não a classe).
- **Hook de áudio chamado uma vez só, no `Fretboard`**: `useGuitarSoundfont`
  usa `useRef` pra criar o `AudioContext`/`Soundfont` de forma preguiçosa
  (só no primeiro clique, o que também satisfaz a exigência do navegador
  de gesto do usuário antes de tocar áudio). Armadilha evitada: chamar o
  hook dentro do `NoteMarker` (renderizado dezenas de vezes) criaria uma
  instância **por nota**, recarregando as amostras a cada clique em nota
  diferente — por isso o hook vive no `Fretboard` (ancestral comum) e
  `playNote` desce como prop.
