import { NavLink } from 'react-router-dom';
import { MOBILE_NAV } from './nav';
import { cn } from '@/lib/cn';

export default function BottomNav() {
  return (
    <nav
      aria-label="Primary"
      className="md:hidden sticky bottom-0 left-0 right-0 z-30 border-t border-[color:var(--color-border)] bg-[color:var(--color-panel)]/95 backdrop-blur pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="grid grid-cols-5">
        {MOBILE_NAV.map(({ label, to, Icon }) => (
          <li key={label}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center gap-1 py-2.5 text-[10px]',
                  isActive
                    ? 'text-[color:var(--color-fg)]'
                    : 'text-[color:var(--color-muted)]',
                )
              }
            >
              <Icon className="h-4.5 w-4.5" />
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
