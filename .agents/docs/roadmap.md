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

- [x] **Jogo "Montar a escala"** (`BuildScalePage`, rota
  `/practice/build-scale`) — **completo**. Protótipo clicável discutido
  antes de implementar: https://claude.ai/artifact/T6FH6SdjzMBzHTiVE64PEy
  (reflete só a v1 da mecânica espacial — a versão final mudou, ver
  Decisões/aprendizados). Mecânica final, numa página só (seções
  desbloqueando conforme o usuário avança):
  1. **Config** (`ConfigurationStep`): tônica, escala, nº de trastes.
     Precisa `confirmConfig()` pra travar e liberar o resto.
  2. **Etapa simbólica** (`SymbolicStep`): monta de cabeça a sequência de
     notas a partir do root, valida contra `getScaleNotes`. Feedback só
     no fim (`checkSymbolic`), não por grau.
  3. **Etapa espacial** (`SpatialStep`/`SpatialFretboard`/`SpatialCell`):
     só libera depois da simbólica 100% correta. Mecânica final **não é
     marcar a posição** (ideia original) — é **escolher a nota certa por
     dropdown** (`PickNoteListbox`) em cada posição que pertence à escala
     até o traste escolhido, cordas soltas incluídas. Tônica é dada de
     graça (`TonicCell`, não clicável). Até `MAX_SPATIAL_ATTEMPTS` (3)
     tentativas (`checkSpatial`); na última tentativa errada o jogo
     resolve sozinho e marca tudo como correto (evita frustração sem
     solução).
  4. `CompletionBanner` quando a etapa espacial fecha 100%.
  - Store: `useGameStore`, construído com a mesma fábrica genérica
    `createConfigStore` que o `useFretboardStore` usa (ver Decisões).

## Passo atual

**Próxima feature: "Adivinhar a nota" (treino de ouvido),
`GuessNotePage` (rota `/practice/guess-note`).**

Hoje é só um shell: `SectionIntro` com o texto de introdução, sem
lógica, sem `components/`, sem store próprio. Já está linkada no hub
`PracticePage` com a tag "Novo".

Mecânica descrita na própria intro da página (ainda não implementada):
toca o som de uma nota (reaproveitando `playGuitarNote`/soundfont já
usado no `Fretboard`), o usuário ouve sem ver o braço e escolhe de
ouvido qual nota é. A cada rodada, uma nota nova.

Decisões de design ainda **a tomar com o usuário** antes de implementar
(não assumir):
- Universo de notas por rodada: as 12 cromáticas, ou restrito à escala
  configurada em algum lugar (como no "Montar a escala")?
- Como escolher/tocar a nota: um oitava fixa, ou variando corda/traste
  como nas posições do braço (`getFretboardPositions`)?
- Formato da resposta: grid de botões (como `NoteOptionsGrid`, já existe
  no `BuildScalePage`) vs. outro input?
- Pontuação/tentativas: segue o mesmo padrão de "até N tentativas, depois
  revela" do jogo espacial, ou é diferente (ex. sem revelar, só avança)?
- Precisa de store dedicado (`useGuessNoteStore`, mesma fábrica
  `createConfigStore`) ou é estado local da página?

Outras candidatas discutidas, ainda não escolhidas (ficam pra depois):
alternar nota/grau no braço, identificar a escala por padrão,
posições/caixas (CAGED), acordes diatônicos, tocar a escala inteira em
sequência (áudio), modos gregos (1.2b, adiado desde a Fase 1).

- [ ] **Animações/micro-interações** (candidatas discutidas, ainda não
  priorizadas) — objetivo: deixar a UX mais moderna sem sair de
  Tailwind/CSS puro (ver decisão abaixo). Em ordem de impacto sugerida:
  - [x] Feedback de clique na nota (`NoteMarker.tsx`): hoje `playAt` só
    dispara o som, sem retorno visual — pulse/ripple no próprio círculo
    ao tocar.
  - [x] Indicador ativo do `Header` (abas Escala/Jogo): troca de classe
    instantânea hoje — pill deslizando entre abas.

## Decisões/aprendizados

- **`useGameStore` usa `configure` único, não `setRoot`/`setScaleType`/
  `setFretCount` separados**: decisão do usuário ao implementar o Passo 2,
  pra seguir o mesmo padrão já estabelecido no `useFretboardStore`
  (um único patch reseta derivado + progresso de uma vez, em vez de
  repetir a lógica de reset em três ações).

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
- **Animação: sem lib nova (GSAP/Framer Motion) por ora** — o projeto já
  resolve animação com Tailwind + `@keyframes` + `prefers-reduced-motion`
  (ver `--animate-drift` em `App.css`), então as candidatas da lista
  acima seguem o mesmo padrão. Só reconsiderar se aparecer orquestração
  complexa (ex: sequência de notas tocando automaticamente no "Jogo").
- **Hook de áudio chamado uma vez só, no `Fretboard`**: `useGuitarSoundfont`
  usa `useRef` pra criar o `AudioContext`/`Soundfont` de forma preguiçosa
  (só no primeiro clique, o que também satisfaz a exigência do navegador
  de gesto do usuário antes de tocar áudio). Armadilha evitada: chamar o
  hook dentro do `NoteMarker` (renderizado dezenas de vezes) criaria uma
  instância **por nota**, recarregando as amostras a cada clique em nota
  diferente — por isso o hook vive no `Fretboard` (ancestral comum) e
  `playNote` desce como prop.
- **Entrada das notas no braço (fade+scale-in) descartada**: tentativa
  implementada e revertida. Duas animações CSS (`animate-note-enter` +
  `animate-note-pulse`) no mesmo elemento competiam pela mesma
  propriedade `animation` (shorthand) — ligar/desligar o pulse trocava
  qual delas "vencia" a cascata, e o navegador tratava isso como o
  `animation-name` mudando, reiniciando a animação perdedora do zero
  (a nota piscava de volta pro estado inicial `opacity:0`/`scale(0.5)`
  do `note-enter`). Decisão do usuário: a animação de entrada não valia
  a complexidade/risco de bug pra esse app — descartada, não só adiada.
- **Transição de rota (View Transitions API) descartada**: tentativa
  implementada e revertida. O pill do `Header` (já aprovado) parou de
  deslizar ao trocar de rota — qualquer elemento com `view-transition-name`
  sai da pintura normal durante a transição e é substituído por um
  snapshot estático até ela terminar, então o `transition-transform` do
  pill (que roda no DOM ao vivo) fica invisível nesse meio-tempo, não
  importa a animação configurada nas pseudo-classes `::view-transition-*`.
  Confirmado empiricamente forçando a duração pra 3s via JS: o pill já
  aparecia na posição final no primeiro frame, sem nenhum estágio
  intermediário. Deixar o `Header` fora de um grupo próprio (cair no
  `root`) também não resolve — causaria um efeito de "fantasma" (as duas
  posições do pill cross-fadeando sobrepostas). Decisão do usuário:
  descartada, não só adiada.
- **App rebatizado "Scalewise"** e navegação reestruturada em hub: rota
  `/practice` (`PracticePage`) virou uma tela intermediária com cards
  (`PracticeCard`) pra cada modo de treino, em vez de ir direto pra uma
  tela de jogo fixa. `Header` só mostra duas abas de alto nível (Escala/
  Praticar); as páginas de jogo (`/practice/build-scale`,
  `/practice/guess-note`) ficam um nível abaixo, sem aba própria no
  `Header`.
- **`createConfigStore` generalizado**: a fábrica criada originalmente
  pro `useFretboardStore` (config + estado derivado) foi reaproveitada
  tal qual pro `useGameStore` — confirma que o padrão "um `configure`
  único reseta derivado + progresso" (ver primeira decisão deste arquivo)
  generaliza bem pra qualquer tela nova desse tipo.
- **Mecânica da etapa espacial mudou de "marcar posição" pra "escolher
  nota por dropdown"**: a ideia original descrita no protótipo v1
  (clicar pra marcar uma posição como pertencente à escala) foi trocada
  por escolher a nota certa via `PickNoteListbox` em cada posição válida.
  Ganha precisão (o usuário prova que sabe *qual* nota é, não só que ali
  "tem uma nota da escala") e abre o conceito de tentativas limitadas
  (`MAX_SPATIAL_ATTEMPTS = 3`, com auto-resolução amigável na última
  tentativa errada, em vez de travar o usuário sem saída).
