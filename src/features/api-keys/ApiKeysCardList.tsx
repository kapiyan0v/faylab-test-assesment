import { StatusBadge } from '@/components/ui/StatusBadge';
import { RowMenu } from './RowMenu';
import { formatExpiry, formatRelative } from '@/lib/format';
import type { ApiKey } from '@/api/types';

interface Props {
  rows: ApiKey[];
  onEdit: (k: ApiKey) => void;
  onToggleDisable: (k: ApiKey) => void;
  onDelete: (k: ApiKey) => void;
}

export function ApiKeysCardList({ rows, onEdit, onToggleDisable, onDelete }: Props) {
  return (
    <ul className="md:hidden flex flex-col gap-2.5">
      {rows.map((k) => (
        <li
          key={k.id}
          onClick={() => onEdit(k)}
          className="row-hover flex items-start gap-3 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-panel)] p-3.5 cursor-pointer active:bg-[color:var(--color-panel-2)]"
        >
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="truncate text-sm font-medium text-[color:var(--color-fg)]">
                {k.name}
              </span>
              <StatusBadge status={k.status} />
            </div>
            <div className="mt-1 font-mono text-[11px] text-[color:var(--color-fg-dim)]">
              {k.preview}
            </div>
            <div className="mt-1.5 text-[11px] text-[color:var(--color-muted)]">
              {formatExpiry(k.expiresAt)} · used {formatRelative(k.lastUsedAt).toLowerCase()}
            </div>
          </div>
          <RowMenu
            status={k.status}
            onEdit={() => onEdit(k)}
            onToggleDisable={() => onToggleDisable(k)}
            onDelete={() => onDelete(k)}
            triggerClassName="-mr-1"
          />
        </li>
      ))}
    </ul>
  );
}
