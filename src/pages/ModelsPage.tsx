import PageHeader from '@/components/layout/PageHeader';
import { cn } from '@/lib/cn';

interface Model {
  id: string;
  name: string;
  family: string;
  context: string;
  pricing: string;
  tag?: 'New' | 'Beta';
}

const MODELS: Model[] = [
  { id: 'fy-inference-xl', name: 'Faylab Inference XL', family: 'Inference', context: '200K tokens', pricing: '$3.00 / $12.00 per 1M', tag: 'New' },
  { id: 'fy-inference-m', name: 'Faylab Inference M',  family: 'Inference', context: '128K tokens', pricing: '$0.80 / $3.20 per 1M' },
  { id: 'fy-vision-1',    name: 'Faylab Vision 1',     family: 'Multimodal', context: '64K tokens',  pricing: '$2.00 / $8.00 per 1M', tag: 'Beta' },
  { id: 'fy-embed-3',     name: 'Faylab Embed 3',      family: 'Embedding', context: '8K tokens',   pricing: '$0.05 per 1M' },
  { id: 'fy-rerank-1',    name: 'Faylab Rerank 1',     family: 'Reranker',  context: '4K tokens',   pricing: '$0.10 per 1M' },
];

export default function ModelsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-8">
      <PageHeader title="Models" subtitle="Browse available models and their pricing." />
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {MODELS.map((m) => (
          <li
            key={m.id}
            className="row-hover flex flex-col gap-2 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-panel)] p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-sm font-medium text-[color:var(--color-fg)]">{m.name}</div>
                <div className="mt-0.5 text-[11px] uppercase tracking-wider text-[color:var(--color-muted)]">
                  {m.family}
                </div>
              </div>
              {m.tag ? (
                <span
                  className={cn(
                    'rounded-full border px-2 py-0.5 text-[10px] font-medium',
                    m.tag === 'New'
                      ? 'border-[color:var(--color-accent)]/40 bg-[color:var(--color-accent)]/15 text-[color:var(--color-accent-strong)]'
                      : 'border-[color:var(--color-warning)]/40 bg-[color:var(--color-warning)]/15 text-[color:var(--color-warning)]',
                  )}
                >
                  {m.tag}
                </span>
              ) : null}
            </div>
            <div className="mt-1 grid grid-cols-2 gap-2 text-xs text-[color:var(--color-fg-dim)]">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[color:var(--color-muted)]">
                  Context
                </div>
                <div>{m.context}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[color:var(--color-muted)]">
                  Price (in / out)
                </div>
                <div>{m.pricing}</div>
              </div>
            </div>
            <div className="mt-2 font-mono text-[10px] text-[color:var(--color-muted)]">{m.id}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
