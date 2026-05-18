import { cn } from '@/lib/cn';
import type { ApiKeyStatus } from '@/api/types';

const STYLES: Record<ApiKeyStatus, string> = {
  active:
    'bg-[color:var(--color-accent)]/15 text-[color:var(--color-accent-strong)] border-[color:var(--color-accent)]/30',
  disabled:
    'bg-[color:var(--color-warning)]/15 text-[color:var(--color-warning)] border-[color:var(--color-warning)]/30',
  expired:
    'bg-[color:var(--color-danger)]/15 text-[color:var(--color-danger)] border-[color:var(--color-danger)]/30',
};

const LABELS: Record<ApiKeyStatus, string> = {
  active: 'Active',
  disabled: 'Disabled',
  expired: 'Expired',
};

export function StatusBadge({ status }: { status: ApiKeyStatus }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium',
        STYLES[status],
      )}
    >
      {LABELS[status]}
    </span>
  );
}
