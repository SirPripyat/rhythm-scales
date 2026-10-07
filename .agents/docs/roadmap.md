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

- [ ] **Fase 1 — Motor de teoria musical** (`src/theory.ts`, puro TS, sem UI)
  - [ ] 1.1 Notas cromáticas (`NOTE_NAMES`, `noteNameFromPitchClass`)
  - [ ] 1.2 Fórmulas de escala (intervalos por tipo: modos gregos, pentatônicas, blues)
  - [ ] 1.3 Função tônica + escala → notas/graus da escala
  - [ ] 1.4 Afinações (notas das cordas soltas) + nota em corda/traste
  - [ ] 1.5 Função que gera todas as posições da escala no braço (corda × traste → nota/grau/isRoot)
- [ ] **Fase 2 — Componente do braço** (fretboard em SVG/HTML, consumindo o motor)
- [ ] **Fase 3 — Controles** (tônica, escala, afinação, nº de trastes)
- [ ] **Fase 4 — Tablatura** (régua alinhada ao braço)
- [ ] **Fase 5 — Áudio** (Web Audio, tocar a escala nota a nota)

## Passo atual

**1.1 — Notas cromáticas**

Contrato:

```ts
export const NOTE_NAMES: string[] // 12 notas, começando em C
export function noteNameFromPitchClass(pitchClass: number): string
```

Conceito: qualquer nota se reduz a uma pitch class de 0–11 (escala cromática
C, C♯, D, D♯, E, F, F♯, G, G♯, A, A♯, B). Uma nota MIDI vira pitch class via
`midi % 12`. Cuidado: `%` em JS não faz módulo "matemático" com negativos
(`-1 % 12 === -1`, não `11`) — a função precisa tratar isso.

Casos de teste:
- `noteNameFromPitchClass(0)` → `"C"`
- `noteNameFromPitchClass(13)` → `"C♯"`
- `noteNameFromPitchClass(-1)` → `"B"`

## Decisões/aprendizados

_(vamos registrando aqui conforme avançamos — escolhas de design, pegadinhas
de teoria musical, erros comuns etc.)_
