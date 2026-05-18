import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';

const INVOICES = [
  { id: 'INV-2026-04', period: 'Apr 2026', amount: '$54.80', status: 'Paid' },
  { id: 'INV-2026-03', period: 'Mar 2026', amount: '$71.42', status: 'Paid' },
  { id: 'INV-2026-02', period: 'Feb 2026', amount: '$48.10', status: 'Paid' },
  { id: 'INV-2026-01', period: 'Jan 2026', amount: '$33.05', status: 'Paid' },
];

export default function BillingPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-8">
      <PageHeader
        title="Billing"
        subtitle="Manage payment method, balance and download invoices."
        actions={<Button variant="secondary">Add credits</Button>}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-panel)] p-5">
          <div className="text-[11px] uppercase tracking-wider text-[color:var(--color-muted)]">
            Current balance
          </div>
          <div className="mt-1 text-3xl font-semibold tabular-nums">$145.20</div>
          <div className="mt-1 text-xs text-[color:var(--color-fg-dim)]">
            Auto-refill at $20 · Card ending in 4242
          </div>
        </div>
        <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-panel)] p-5">
          <div className="text-[11px] uppercase tracking-wider text-[color:var(--color-muted)]">
            Plan
          </div>
          <div className="mt-1 text-lg font-medium">Team · monthly</div>
          <div className="mt-1 text-xs text-[color:var(--color-fg-dim)]">
            Renews on the 1st. 5 seats included.
          </div>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-panel)]">
        <div className="border-b border-[color:var(--color-border)] px-5 py-3 text-sm font-medium">
          Invoices
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-[color:var(--color-muted)]">
              <th className="px-5 py-2.5 font-medium">Invoice</th>
              <th className="px-5 py-2.5 font-medium">Period</th>
              <th className="px-5 py-2.5 font-medium">Amount</th>
              <th className="px-5 py-2.5 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {INVOICES.map((inv) => (
              <tr key={inv.id} className="row-hover border-t border-[color:var(--color-border)]">
                <td className="px-5 py-3 font-mono text-xs">{inv.id}</td>
                <td className="px-5 py-3 text-[color:var(--color-fg-dim)]">{inv.period}</td>
                <td className="px-5 py-3 tabular-nums">{inv.amount}</td>
                <td className="px-5 py-3 text-[color:var(--color-success)]">{inv.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
