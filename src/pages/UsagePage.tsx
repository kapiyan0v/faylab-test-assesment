import PageHeader from '@/components/layout/PageHeader';

const DATA = [12, 30, 18, 42, 55, 38, 48, 60, 72, 50, 84, 66, 92, 78];

export default function UsagePage() {
  const max = Math.max(...DATA);
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-8">
      <PageHeader title="Usage" subtitle="Last 14 days of API activity." />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Requests" value="184,209" delta="+12.4%" positive />
        <Stat label="Input tokens" value="3.2M" delta="+8.1%" positive />
        <Stat label="Output tokens" value="1.1M" delta="-2.3%" />
        <Stat label="Spend" value="$54.80" delta="+5.0%" positive />
      </div>

      <div className="mt-6 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-panel)] p-5">
        <div className="text-sm font-medium">Daily requests</div>
        <div className="mt-4 flex h-40 items-end gap-1">
          {DATA.map((v, i) => (
            <div
              key={i}
              className="flex-1 rounded-t bg-[color:var(--color-accent)]/30 transition-colors hover:bg-[color:var(--color-accent)]/60"
              style={{ height: `${(v / max) * 100}%` }}
              title={`Day ${i + 1}: ${v}k requests`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  delta,
  positive,
}: {
  label: string;
  value: string;
  delta: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-panel)] p-4">
      <div className="text-[11px] uppercase tracking-wider text-[color:var(--color-muted)]">
        {label}
      </div>
      <div className="mt-1 text-xl font-semibold tabular-nums">{value}</div>
      <div
        className={
          positive
            ? 'mt-0.5 text-[11px] text-[color:var(--color-success)]'
            : 'mt-0.5 text-[11px] text-[color:var(--color-fg-dim)]'
        }
      >
        {delta} vs prev period
      </div>
    </div>
  );
}
