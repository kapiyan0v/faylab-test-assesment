import PageHeader from '@/components/layout/PageHeader';

const NODES = [
  { id: 'node-eu-west-1', region: 'EU West 1', uptime: '99.98%', earned: '12.40 FYL' },
  { id: 'node-us-east-3', region: 'US East 3', uptime: '99.74%', earned: '9.10 FYL' },
  { id: 'node-ap-se-1',  region: 'AP SE 1',  uptime: '99.92%', earned: '7.85 FYL' },
];

export default function NodeRewardsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-8">
      <PageHeader title="Node rewards" subtitle="Earn for running inference nodes." />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {NODES.map((n) => (
          <div
            key={n.id}
            className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-panel)] p-4"
          >
            <div className="text-sm font-medium">{n.region}</div>
            <div className="mt-0.5 font-mono text-[11px] text-[color:var(--color-muted)]">
              {n.id}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[color:var(--color-muted)]">
                  Uptime
                </div>
                <div className="text-[color:var(--color-fg)]">{n.uptime}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[color:var(--color-muted)]">
                  Earned (30d)
                </div>
                <div className="text-[color:var(--color-success)] tabular-nums">{n.earned}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
