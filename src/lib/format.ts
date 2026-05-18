/** Formats an ISO date as `DD.MM.YYYY`. */
export function formatDate(iso: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return [
    String(d.getDate()).padStart(2, '0'),
    String(d.getMonth() + 1).padStart(2, '0'),
    d.getFullYear(),
  ].join('.');
}

/** Compact relative time: "Now", "7 hours ago", "2 days ago". */
export function formatRelative(iso: string | null): string {
  if (!iso) return 'Never';
  const then = new Date(iso).getTime();
  const diffMs = Date.now() - then;
  if (diffMs < 60_000) return 'Now';
  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} mo ago`;
  return `${Math.floor(months / 12)} yr ago`;
}

/** "In 29 days" / "Expired" / "—". */
export function formatExpiry(iso: string | null): string {
  if (!iso) return '—';
  const target = new Date(iso).getTime();
  const diffDays = Math.round((target - Date.now()) / 86_400_000);
  if (diffDays < 0) return 'Expired';
  if (diffDays === 0) return 'Today';
  return `In ${diffDays} day${diffDays === 1 ? '' : 's'}`;
}
