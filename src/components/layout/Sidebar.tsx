import { NavLink } from 'react-router-dom';
import { DESKTOP_NAV } from './nav';
import { cn } from '@/lib/cn';
import { IconSidebar } from '@/components/icons';

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-[220px] shrink-0 flex-col border-r border-[color:var(--color-border)] bg-[color:var(--color-panel)] px-3 py-4">
      <div className="flex items-center justify-between px-2 pb-5">
        <Logo />
        <button
          type="button"
          aria-label="Collapse sidebar"
          className="rounded-md p-1 text-[color:var(--color-fg-dim)] hover:bg-[color:var(--color-panel-2)]"
        >
          <IconSidebar />
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-5">
        {DESKTOP_NAV.map((group) => (
          <div key={group.heading}>
            <div className="px-2 pb-1.5 text-[11px] uppercase tracking-wider text-[color:var(--color-muted)]">
              {group.heading}
            </div>
            <ul className="flex flex-col gap-0.5">
              {group.items.map(({ label, to, Icon }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors',
                        isActive
                          ? 'bg-[color:var(--color-panel-2)] text-[color:var(--color-fg)]'
                          : 'text-[color:var(--color-fg-dim)] hover:text-[color:var(--color-fg)] hover:bg-[color:var(--color-panel-2)]/60',
                      )
                    }
                  >
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-1.5 font-semibold tracking-[0.18em] text-[color:var(--color-fg)]">
      <span className="text-sm">FAYLAB</span>
    </div>
  );
}
