import { useEffect, useRef, useState, type FormEvent } from 'react';
import { cn } from '@/lib/cn';
import { ThinkingHeader } from '@/features/thinking/ThinkingHeader';
import { ThinkingText } from '@/features/thinking/ThinkingText';
import type { ThinkingMode } from '@/features/thinking/PixelGrid';
import { useChat, makeMessage, type Message } from '@/features/chat/useChat';
import { IconUpload, IconSend, IconChat, IconSearch, IconPlus } from '@/components/icons';

const MODES: { id: ThinkingMode; label: string }[] = [
  { id: 'fast', label: 'Fast' },
  { id: 'balanced', label: 'Balanced' },
  { id: 'quality', label: 'Quality' },
  { id: 'eco', label: 'Eco' },
];

const SEED: Message[] = [
  makeMessage('user', 'Come up with strong password that will protect my data', 'fast'),
  makeMessage(
    'assistant',
    [
      'Here is a strong, memorable passphrase pattern you can use:',
      '',
      '• Combine four unrelated words joined with symbols, e.g. `lantern-river-quartz-9!`',
      '• Mix in 1–2 numbers and a symbol that aren\'t at the start or end.',
      '• Aim for ≥ 16 characters total — length beats complexity in 2026.',
      '• Store it in a password manager and never reuse it across sites.',
    ].join('\n'),
    'fast',
  ),
];

export default function ChatPage() {
  const [mode, setMode] = useState<ThinkingMode>('fast');
  const [draft, setDraft] = useState('');
  const { messages, send, cancel, reset, isStreaming } = useChat(SEED);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom while streaming or after a new message.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  const hasThinking = messages.some((m) => m.role === 'thinking');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!draft.trim() || isStreaming) return;
    send(draft, mode);
    setDraft('');
  }

  return (
    <div className="grid h-full grid-cols-1 md:grid-cols-[260px_1fr]">
      <ChatSidebar onNewChat={reset} />
      <section className="flex min-w-0 flex-col">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--color-border)] bg-[color:var(--color-panel)] px-4 py-3 md:px-6">
          <div className="flex flex-1 flex-wrap items-center gap-3">
            <ThinkingHeader mode={mode} tokensPerSec={1000} fasterBy={20} />
            {hasThinking ? <ThinkingText mode={mode} /> : null}
          </div>
          <div className="flex items-center gap-1">
            <ModeSelector mode={mode} onChange={setMode} disabled={isStreaming} />
            <button
              type="button"
              aria-label="Upload"
              className="rounded-md p-2 text-[color:var(--color-fg-dim)] hover:bg-[color:var(--color-panel-2)] hover:text-[color:var(--color-fg)]"
            >
              <IconUpload />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 md:px-10">
          <ul className="mx-auto flex max-w-2xl flex-col gap-5">
            {messages.length === 0 ? (
              <EmptyChat />
            ) : (
              messages.map((m) => <MessageBubble key={m.id} message={m} />)
            )}
          </ul>
        </div>

        <form
          onSubmit={handleSubmit}
          className="border-t border-[color:var(--color-border)] bg-[color:var(--color-panel)] px-4 py-3 md:px-10"
        >
          <div className="mx-auto flex max-w-2xl items-center gap-2 rounded-xl border border-[color:var(--color-border-strong)] bg-[color:var(--color-bg)] px-3 py-2">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={isStreaming ? 'Streaming reply…' : 'Message Faylab…'}
              disabled={isStreaming}
              className="flex-1 bg-transparent text-sm text-[color:var(--color-fg)] placeholder:text-[color:var(--color-muted)] focus:outline-none disabled:opacity-50"
            />
            {isStreaming ? (
              <button
                type="button"
                onClick={cancel}
                className="inline-flex h-8 items-center gap-1.5 rounded-md border border-[color:var(--color-border-strong)] bg-[color:var(--color-panel-2)] px-2.5 text-xs text-[color:var(--color-fg-dim)] hover:text-[color:var(--color-fg)]"
              >
                <span className="block h-2.5 w-2.5 rounded-[1px] bg-[color:var(--color-fg-dim)]" />
                Stop
              </button>
            ) : (
              <button
                type="submit"
                disabled={!draft.trim()}
                className={cn(
                  'inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors',
                  'bg-[color:var(--color-accent)] text-white hover:bg-[color:var(--color-accent-strong)]',
                  'disabled:opacity-40 disabled:pointer-events-none',
                )}
                aria-label="Send"
              >
                <IconSend className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <div className="mx-auto mt-2 max-w-2xl text-[10px] text-[color:var(--color-muted)]">
            Replies are mock-generated. Try asking about passwords, React, TypeScript, Vite, Tailwind, or animations.
          </div>
        </form>
      </section>
    </div>
  );
}

function ModeSelector({
  mode,
  onChange,
  disabled,
}: {
  mode: ThinkingMode;
  onChange: (m: ThinkingMode) => void;
  disabled?: boolean;
}) {
  return (
    <div
      className={cn(
        'hidden sm:flex items-center gap-1 rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-panel-2)] p-0.5',
        disabled && 'opacity-60',
      )}
    >
      {MODES.map((m) => (
        <button
          key={m.id}
          type="button"
          onClick={() => onChange(m.id)}
          disabled={disabled}
          className={cn(
            'rounded px-2 py-1 text-[11px] disabled:cursor-not-allowed',
            mode === m.id
              ? 'bg-[color:var(--color-panel)] text-[color:var(--color-fg)]'
              : 'text-[color:var(--color-fg-dim)] hover:text-[color:var(--color-fg)]',
          )}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  if (message.role === 'thinking') {
    return (
      <li className="text-left">
        <ThinkingText mode={message.mode} label="Thinking…" />
      </li>
    );
  }
  if (message.role === 'user') {
    return (
      <li className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl border border-[color:var(--color-border-strong)] bg-[color:var(--color-panel-2)] px-3.5 py-2 text-sm text-[color:var(--color-fg)]">
          {message.text}
        </div>
      </li>
    );
  }
  return (
    <li className="flex justify-start">
      <div className="max-w-[85%] rounded-2xl bg-transparent px-1 py-1 text-sm leading-relaxed text-[color:var(--color-fg)]">
        {message.text.split('\n').map((line, i) => (
          <p key={i} className={i ? 'mt-2' : ''}>
            {line || ' '}
          </p>
        ))}
        {message.streaming ? (
          <span
            className="ml-1 inline-block h-3 w-1.5 translate-y-0.5 animate-pulse rounded-[1px] bg-[color:var(--color-fg)]"
            aria-hidden
          />
        ) : null}
      </div>
    </li>
  );
}

function EmptyChat() {
  return (
    <li className="mt-12 flex flex-col items-center gap-2 text-center">
      <div className="text-sm font-medium text-[color:var(--color-fg)]">Start a conversation</div>
      <p className="max-w-sm text-xs text-[color:var(--color-fg-dim)]">
        Pick a mode in the header and send a message. Replies are mocked — try
        keywords like <code className="font-mono">password</code>,{' '}
        <code className="font-mono">react</code>,{' '}
        <code className="font-mono">typescript</code>, or{' '}
        <code className="font-mono">joke</code>.
      </p>
    </li>
  );
}

function ChatSidebar({ onNewChat }: { onNewChat: () => void }) {
  return (
    <aside className="hidden md:flex flex-col border-r border-[color:var(--color-border)] bg-[color:var(--color-panel)] px-3 py-4">
      <div className="px-2 pb-4 text-sm font-semibold tracking-[0.18em]">FAR</div>
      <button
        onClick={onNewChat}
        className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-[color:var(--color-fg)] hover:bg-[color:var(--color-panel-2)]"
      >
        <IconPlus className="h-4 w-4" /> New chat
      </button>
      <button className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-[color:var(--color-fg-dim)] hover:bg-[color:var(--color-panel-2)] hover:text-[color:var(--color-fg)]">
        <IconSearch className="h-4 w-4" /> Search chats
      </button>
      <div className="mt-5 px-2 text-[11px] uppercase tracking-wider text-[color:var(--color-muted)]">
        Recent
      </div>
      <ul className="mt-1 flex flex-col gap-0.5">
        {[
          'Strong password ideas',
          'Embedding model picks',
          'Vite + Tailwind v4 setup',
          'Rate-limit retry policy',
        ].map((t) => (
          <li key={t}>
            <button className="flex w-full items-center gap-2 truncate rounded-md px-2 py-1.5 text-left text-xs text-[color:var(--color-fg-dim)] hover:bg-[color:var(--color-panel-2)] hover:text-[color:var(--color-fg)]">
              <IconChat className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{t}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
