# Faylab Console — Test Assessment

A small dashboard built on **React 19 + Vite + TypeScript**, implementing the API-keys management screen and the chat-thinking animation from the brief.

> Stack: React 19, Vite 6, TypeScript 5, Tailwind CSS v4, Radix UI primitives (Dialog / Dropdown / Toast), TanStack Query 5, React Router 7.

---

## Getting started

```bash
npm install
npm run dev          # http://localhost:5173
```

Other scripts:

```bash
npm run typecheck    # tsc -b --noEmit
npm run build        # type-check + production bundle into dist/
npm run preview      # serve the production build locally
```

Requirements: Node ≥ 20.

---

## What's implemented

### 1. API keys page (primary deliverable)

- **Desktop** — full table with hover state, click-row to edit, kebab menu (Edit / Disable / Delete).
- **Mobile** — card list with tappable cards and the same action menu. Bottom tab bar replaces the sidebar.
- **Create flow** — Radix dialog, name + expiry options, returns the generated secret exactly once with a copy button (key is never stored client-side beyond this point).
- **Disable / Enable / Delete** flows wired through TanStack Query mutations with optimistic cache updates and toast feedback.

### 2. Chat demo with thinking animation (`/chat`)

- **Pixel-grid loader** — pure CSS keyframe animation, four request-mode palettes (Fast / Balanced / Quality / Eco). No JS animation loop, no canvas, no extra dependencies.
- **Shimmer "Thinking…" text** — moving gradient via `background-clip: text`, tinted per mode.
- **Header badge** — tokens/sec, mode label, "% faster" hint.
- **Send / receive mock messages** — `chatClient.sendMessage()` streams a tokenised response chunk-by-chunk via callbacks (the same shape as a real SSE/`ReadableStream` LLM API). The thinking placeholder shows during initial latency, then is replaced by the assistant message which fills in word-by-word with a blinking caret.
- **Topic-aware replies** — small canned-response library matched by regex (password / react / typescript / vite / tailwind / joke / hello / …) with a fallback for everything else.
- **Stop button** to abort an in-flight stream; **New chat** in the sidebar resets the conversation.
- **Mode-aware pacing** — Fast mode streams ~22 ms/token, Eco ~48 ms/token, Quality ~55 ms/token. Picking a mode visibly changes how fast tokens arrive.

### 3. Other navigation entries

`Models`, `Usage`, `Billing`, `Playground`, `Node rewards`, `Settings`, `Docs` each render meaningful mock content (model catalog cards, daily-requests bar chart, invoices table, etc.) so the navigation feels alive without sinking time into screens outside the brief.

---

## Architecture & backend integration

There are **two** backend-swap seams, both following the same pattern.

### REST seam — API keys (`src/api/client.ts`)

```ts
export interface ApiClient {
  listApiKeys(): Promise<ApiKey[]>;
  createApiKey(input: CreateApiKeyInput): Promise<CreatedApiKey>;
  updateApiKey(input: UpdateApiKeyInput): Promise<ApiKey>;
  deleteApiKey(id: string): Promise<void>;
}

export const apiClient: ApiClient = mockClient;
```

`mockClient.ts` implements that interface against `localStorage` with a small artificial latency. To wire a real backend:

1. Add `httpClient.ts` that implements `ApiClient` against your REST endpoints.
2. Change one line in `client.ts`: `export const apiClient: ApiClient = httpClient;`
3. Everything above (`useApiKeys`, `useCreateApiKey`, dialogs, table, cards) continues to work unchanged.

Query keys, optimistic updates and toast errors all live in `src/api/hooks.ts` — already shaped the way they'd look against a real backend.

### Streaming seam — chat (`src/api/chat/client.ts`)

```ts
export interface ChatClient {
  sendMessage(input: SendMessageInput, callbacks: ChatStreamCallbacks): CancelStream;
}

export const chatClient: ChatClient = mockChatClient;
```

`mockChatClient.ts` tokenises a canned response and emits chunks on a timer. To go live, implement `ChatClient` against your SSE or `ReadableStream` endpoint — the `useChat` hook (`src/features/chat/useChat.ts`) handles state, cancellation and message lifecycle the same way regardless of the source.

### Directory layout

```
src/
  api/
    client.ts         # ApiClient interface + apiClient export
    mockClient.ts     # localStorage-backed implementation
    hooks.ts          # TanStack Query hooks (useApiKeys, useCreateApiKey, …)
    types.ts
    chat/
      client.ts       # ChatClient interface + chatClient export
      mockChatClient.ts  # Streamed mock responses
      responses.ts    # Topic-matched canned replies
      types.ts
  components/
    icons.tsx         # inline SVG icon set
    layout/           # AppLayout, Sidebar, BottomNav, TopBar, PageHeader, nav config
    toast/            # Radix-based toast provider
    ui/               # Button, StatusBadge, CopyButton
  features/
    api-keys/         # Table, CardList, RowMenu, Create/Edit/Delete dialogs
    chat/             # useChat hook (state + streaming)
    thinking/         # PixelGrid, ThinkingText, ThinkingHeader
  pages/              # one file per route
  lib/                # cn, date/relative formatting
  App.tsx             # routes
  main.tsx            # providers (QueryClient, Router, Toast)
  index.css           # Tailwind v4 + design tokens + keyframes
```

---

## Design notes & assumptions

- **Dark-only** UI, matching the brief.
- **Design tokens** live as CSS custom properties in `@theme` (Tailwind v4) so the palette is in one place.
- **Responsive break** at Tailwind's `md` (768 px): sidebar ↔ bottom tab bar, table ↔ card list.
- **Key value safety** — the mock returns the secret once; after that only `preview` is kept. The UI is built around this so it matches how a real API key issuance would work.
- **No heavy animation library** — pixel grid is pure CSS with staggered `animation-delay` per cell.
- **Accessibility** — Radix primitives handle focus management and keyboard navigation for the dialogs and dropdown. Action menus and rows have proper labels.

---

## Future improvements

- Stream tokens for the chat response (SSE / `ReadableStream`) and animate the assistant message word-by-word.
- Server-side pagination and search on the API keys list (the hook layer is ready for it — just pass params).
- Add Vitest + React Testing Library coverage for the create/delete flows.
- Persist preferred chat `mode` per user (likely on the same backend that issues keys).
- Sidebar collapse on desktop (icon-only mode).
- Light-theme support — tokens are centralised, so it's a `data-theme="light"` override.
