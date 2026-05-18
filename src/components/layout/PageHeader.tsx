import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

export default function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 pb-5">
      <div>
        <h1 className="text-lg font-semibold text-[color:var(--color-fg)]">{title}</h1>
        {subtitle ? (
          <p className="mt-0.5 text-xs text-[color:var(--color-fg-dim)]">{subtitle}</p>
        ) : null}
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </div>
  );
}
