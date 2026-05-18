import PageHeader from '@/components/layout/PageHeader';

const SECTIONS = [
  { title: 'Quickstart', body: 'Create an API key, make your first request, stream tokens.' },
  { title: 'Authentication', body: 'How to send the Authorization header and rotate keys.' },
  { title: 'Models reference', body: 'Capabilities, context lengths and pricing for every model.' },
  { title: 'Streaming', body: 'Use SSE to render tokens as they arrive.' },
  { title: 'Errors & retries', body: 'Status codes, idempotency keys and backoff guidelines.' },
  { title: 'Rate limits', body: 'Per-key and per-org quotas, plus how to request an increase.' },
];

export default function DocsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6 md:px-8 md:py-8">
      <PageHeader title="Documentation" subtitle="Everything you need to integrate Faylab." />
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {SECTIONS.map((s) => (
          <li
            key={s.title}
            className="row-hover rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-panel)] p-4"
          >
            <div className="text-sm font-medium">{s.title}</div>
            <p className="mt-1 text-xs text-[color:var(--color-fg-dim)]">{s.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
