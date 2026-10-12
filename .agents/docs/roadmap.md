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

Protótipo clicável discutido antes de implementar:
https://claude.ai/artifact/T6FH6SdjzMBzHTiVE64PEy (ainda reflete a v1 da
mecânica da etapa espacial — ver nota de atualização abaixo).

Mecânica (decisão do usuário): dado um root e uma escala (`ScaleType`)
escolhidos pelo usuário, o jogo tem duas etapas em sequência, **numa
página só** (sem trocar de tela entre elas — as seções ficam todas
presentes, desbloqueando conforme o usuário avança, em vez de esconder
umas pras mostrar outras) —

1. **Etapa simbólica**: usuário monta de cabeça a sequência de notas da
   escala a partir do root (sem olhar o braço), baseado no padrão da
   escala de Dó. Valida contra `getScaleNotes(root, scaleType)`, que já
   existe e dá exatamente `{ degree, pitchClass, noteName }[]` pra cada
   grau (grau 1 = tônica, já dado).
2. **Etapa espacial** (regra atualizada — substitui a ideia anterior de
   "caixa ascendente"): só depois da etapa 1 completa e correta, o
   usuário escolhe a quantidade de trastes (reaproveitando `FRET_OPTIONS`,
   igual ao `ScaleExplorer`) e precisa marcar **todas** as posições da
   escala no braço inteiro até esse traste — incluindo as cordas soltas
   (traste 0). A tônica continua dada de graça (marcada, não clicável);
   o resto das posições (a mesma nota pode aparecer em várias oitavas) o
   usuário precisa achar todas, não só uma. Vantagem grande dessa troca:
   o alvo é exatamente o que `getFretboardPositions(root, scaleType,
   fretCount, tuning)` já calcula — **nenhum algoritmo novo é
   necessário**, e some o problema do salto de trastes que o protótipo
   v1 expôs (não tinha solução boa dentro da ideia de "uma posição
   específica por grau").

Navegação: **React Router** (rotas reais, ex. `/` pra tela Escala atual,
`/jogo` pra essa tela nova) — decisão do usuário, mesmo sendo a primeira
dependência nova desde o início do projeto nessa categoria (as outras —
Headless UI, smplr — foram por leveza/necessidade pontual; aqui é porque o
app passa a ser multi-tela de verdade).

Passos planejados (um por vez, ciclo curto por passo):
- [x] **Passo 1 — Roteamento**: `react-router` instalado, `App.tsx`
  envolvido com `BrowserRouter`, conteúdo anterior extraído pra
  `ScalePage` (rota `/`), `BuildScalePage` placeholder criado (rota
  `/build-scale`), navegação no `Header` com `NavLink`.
- [x] **Passo 2 — Store do jogo** (`useGameStore`, mesmo padrão do
  `useFretboardStore`: config + estado derivado):
  - `root`, `scaleType`, `fretCount` (escolhidos pelo usuário; trocar
    qualquer um reseta as respostas, igual o `configure` do fretboard
    reseta `positions`).
  - `symbolicAnswers: (Note | null)[]` — tamanho dinâmico
    (`SCALE_INTERVALS[scaleType].length`, não fixo em 7 — pentatônica
    tem 5, blues 6), índice 0 = grau 1 = root, sempre preenchido.
  - `symbolicChecked`, `symbolicAllCorrect` — setados só por
    `checkSymbolic()` (feedback é só no final, não por grau).
  - `spatialTargets` — derivado via `getFretboardPositions(root,
    scaleType, fretCount)` filtrando fora `isRoot` (essas são de graça).
  - `spatialSelected: Set<string>` (chave `"stringIndex-fret"`,
    tentativa atual), `spatialLockedCorrect: Set<string>` (acertos que
    persistem entre tentativas), `spatialChecked`, `spatialAllCorrect`.
  - Ações: `configure` (patch de `root`/`scaleType`/`fretCount`, reseta
    derivado + progresso — substitui a ideia original de `setRoot`/
    `setScaleType`/`setFretCount` separados, ver Decisões/aprendizados),
    `answerSymbolic`, `checkSymbolic`, `toggleSpatialCell`, `checkSpatial`,
    `reset`.
- [ ] **Passo 3 — Página única do jogo** (`BuildScalePage`), seções
  empilhadas na mesma página (não telas separadas):
  1. config (tônica/escala/trastes — reaproveita visual do
     `ScaleExplorer`/`SelectField`);
  2. etapa simbólica (slots por grau, desabilitada até root+escala
     escolhidos);
  3. etapa espacial (braço em modo "quiz" até o traste escolhido,
     incluindo traste 0 — variante do `Fretboard`/`FretboardCell` que
     aceita clique como resposta em vez de só mostrar o resultado),
     desabilitada até a etapa 1 estar correta;
  4. mensagem de conclusão quando a etapa espacial fecha 100%.
- [ ] **Passo 4 — Feedback visual + fluxo de "tentar de novo"**: anéis de
  acerto/erro, contadores, revelar posições que faltaram — já prototipado
  (link acima), portar o comportamento pro componente real.

Outras candidatas discutidas, ainda não escolhidas (ficam pra depois):
modo "adivinhe a nota", alternar nota/grau no braço, identificar a escala
por padrão, posições/caixas (CAGED), acordes diatônicos, tocar a escala
inteira em sequência (áudio).

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
