import { StatusBadge } from '@/components/ui/StatusBadge';
import { RowMenu } from './RowMenu';
import { formatDate, formatExpiry, formatRelative } from '@/lib/format';
import type { ApiKey } from '@/api/types';

interface Props {
  rows: ApiKey[];
  onEdit: (k: ApiKey) => void;
  onToggleDisable: (k: ApiKey) => void;
  onDelete: (k: ApiKey) => void;
}

export function ApiKeysTable({ rows, onEdit, onToggleDisable, onDelete }: Props) {
  return (
    <div className="hidden md:block overflow-hidden rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-panel)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wider text-[color:var(--color-muted)]">
            <th className="px-5 py-3 font-medium">Name</th>
            <th className="px-5 py-3 font-medium">API key</th>
            <th className="px-5 py-3 font-medium">Status</th>
            <th className="px-5 py-3 font-medium">Expires</th>
            <th className="px-5 py-3 font-medium">Created</th>
            <th className="px-5 py-3 font-medium">Last used</th>
            <th className="w-12" />
          </tr>
        </thead>
        <tbody>
          {rows.map((k) => (
            <tr
              key={k.id}
              className="row-hover cursor-pointer border-t border-[color:var(--color-border)] text-[color:var(--color-fg)]"
              onClick={() => onEdit(k)}
            >
              <td className="px-5 py-3.5 font-medium">{k.name}</td>
              <td className="px-5 py-3.5 font-mono text-xs text-[color:var(--color-fg-dim)]">
                {k.preview}
              </td>
              <td className="px-5 py-3.5">
                <StatusBadge status={k.status} />
              </td>
              <td className="px-5 py-3.5 text-[color:var(--color-fg-dim)]">
                {formatExpiry(k.expiresAt)}
              </td>
              <td className="px-5 py-3.5 text-[color:var(--color-fg-dim)] tabular-nums">
                {formatDate(k.createdAt)}
              </td>
              <td className="px-5 py-3.5 text-[color:var(--color-fg-dim)]">
                {formatRelative(k.lastUsedAt)}
              </td>
              <td className="px-3 py-3.5 text-right">
                <RowMenu
                  status={k.status}
                  onEdit={() => onEdit(k)}
                  onToggleDisable={() => onToggleDisable(k)}
                  onDelete={() => onDelete(k)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
