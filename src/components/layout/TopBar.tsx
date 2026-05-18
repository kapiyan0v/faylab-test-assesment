import { Link } from 'react-router-dom';
import { IconChat } from '@/components/icons';

export default function TopBar() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-[color:var(--color-border)] bg-[color:var(--color-panel)] px-4 md:px-6">
      <div className="md:hidden font-semibold tracking-[0.18em] text-sm">FAYLAB</div>
      <div className="hidden md:block text-sm text-[color:var(--color-fg-dim)]">Console</div>

      <div className="flex items-center gap-2 md:gap-3">
        <Link
          to="/chat"
          className="flex items-center gap-1.5 rounded-md border border-[color:var(--color-border-strong)] bg-[color:var(--color-panel-2)] px-2.5 py-1.5 text-xs text-[color:var(--color-fg-dim)] hover:text-[color:var(--color-fg)]"
        >
          <IconChat className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Chat demo</span>
        </Link>
        <div className="rounded-md border border-[color:var(--color-border-strong)] bg-[color:var(--color-panel-2)] px-2.5 py-1.5 text-xs tabular-nums text-[color:var(--color-fg)]">
          $145.20
        </div>
        <div
          className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-fuchsia-500 text-[11px] font-semibold text-white"
          aria-label="Account"
        >
          KT
        </div>
      </div>
    </header>
  );
}
