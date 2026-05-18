interface ResponseTemplate {
  match: RegExp;
  reply: string;
}

const RESPONSES: ResponseTemplate[] = [
  {
    match: /\bpassword\b/i,
    reply: [
      'Here is a strong, memorable passphrase pattern you can use:',
      '',
      '• Combine four unrelated words joined with symbols, e.g. `lantern-river-quartz-9!`',
      '• Mix in 1–2 numbers and a symbol that aren\'t at the start or end.',
      '• Aim for ≥ 16 characters total — length beats complexity in 2026.',
      '• Store it in a password manager and never reuse it across sites.',
      '',
      'Avoid: birthdays, single dictionary words, sequential keyboard patterns (e.g. `qwerty123`).',
    ].join('\n'),
  },
  {
    match: /\b(hello|hi|hey|yo)\b/i,
    reply: 'Hey there! I\'m a mock assistant running off canned replies. Try asking me about passwords, React, TypeScript, or just tell me a topic and I\'ll improvise.',
  },
  {
    match: /\b(joke|funny|laugh)\b/i,
    reply: 'A SQL query walks into a bar, sidles up to two tables and asks: "Mind if I join you?"',
  },
  {
    match: /\b(typescript|ts)\b/i,
    reply: [
      'TypeScript pays off on three axes:',
      '',
      '• Refactor safety — rename a prop and the compiler walks every call site for you.',
      '• Documentation in the code — types describe intent better than most comments.',
      '• Onboarding — newcomers can navigate the codebase via type definitions alone.',
      '',
      'Where it bites: very dynamic patterns (deeply variadic generics, JSON-shaped data) need careful typing or `unknown` + parsing at boundaries.',
    ].join('\n'),
  },
  {
    match: /\b(react|component|hook|jsx)\b/i,
    reply: [
      'Quick React rules of thumb that age well:',
      '',
      '• Co-locate state with the component that uses it; lift only when two siblings share it.',
      '• Effects model "synchronise with an external system", not "run after render" — if there is no external system, you usually don\'t need an effect.',
      '• Memoise to fix measured perf problems, not preemptively.',
      '• Server cache (TanStack Query, RTK Query) ≠ UI state — keep them in separate stores.',
    ].join('\n'),
  },
  {
    match: /\b(vite|bundler|build)\b/i,
    reply: 'Vite\'s superpower is ESM-native dev: it serves your source files directly to the browser and only transpiles on demand, so cold-start is near-instant regardless of repo size. For prod it falls back to Rollup, which still gives you tree-shaking and code-splitting.',
  },
  {
    match: /\b(tailwind|css|style)\b/i,
    reply: [
      'Tailwind v4 trims a lot of the v3 rough edges:',
      '',
      '• `@theme` blocks let you declare design tokens as CSS custom properties — single source of truth.',
      '• Zero-config content scanning; no more glob lists in `tailwind.config.js`.',
      '• Built-in CSS-only `@import "tailwindcss"` — no PostCSS plugin chain.',
    ].join('\n'),
  },
  {
    match: /\b(animation|animate|motion)\b/i,
    reply: 'For small UI animations, CSS keyframes + `transform`/`opacity` is almost always the right tool — GPU-accelerated, no runtime dependency, easy to inspect in devtools. Reach for a JS library only when you need physics, gesture-driven layout transitions, or coordinated timelines.',
  },
  {
    match: /\b(api|rest|backend|endpoint)\b/i,
    reply: 'For this dashboard the UI talks to a single `ApiClient` interface (`src/api/client.ts`). Swap the mock for a real fetch-based implementation and nothing else has to change — hooks, dialogs and tables stay put.',
  },
  {
    match: /\b(thanks|thank you|cheers|appreciate)\b/i,
    reply: 'Happy to help! Anything else you want to dig into?',
  },
];

const FALLBACK_REPLIES = [
  'I\'m a mock assistant, so I\'ll improvise: that\'s an interesting prompt. In a real deployment this would stream actual tokens from the model you picked above.',
  'Good question. The mock backend doesn\'t know the specifics, but if this were live the answer would arrive as a streamed response over SSE — same flow you\'re seeing now.',
  'Mocking a reply since there\'s no model behind me yet — try asking me about passwords, React, TypeScript, Vite, Tailwind, or animations to see one of the canned answers.',
];

export function pickReply(prompt: string): string {
  const trimmed = prompt.trim();
  for (const template of RESPONSES) {
    if (template.match.test(trimmed)) return template.reply;
  }
  const idx = Math.floor(Math.random() * FALLBACK_REPLIES.length);
  return FALLBACK_REPLIES[idx]!;
}
