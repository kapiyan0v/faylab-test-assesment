import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary:
    'bg-[color:var(--color-accent)] hover:bg-[color:var(--color-accent-strong)] text-white shadow-[0_1px_0_rgba(255,255,255,0.08)_inset]',
  secondary:
    'bg-[color:var(--color-panel-2)] hover:bg-[#1f1f25] border border-[color:var(--color-border-strong)] text-[color:var(--color-fg)]',
  ghost:
    'bg-transparent hover:bg-[color:var(--color-panel-2)] text-[color:var(--color-fg-dim)] hover:text-[color:var(--color-fg)]',
  danger:
    'bg-[color:var(--color-danger)]/15 hover:bg-[color:var(--color-danger)]/25 text-[color:var(--color-danger)] border border-[color:var(--color-danger)]/30',
};

const sizes: Record<Size, string> = {
  sm: 'h-7 px-2.5 text-xs',
  md: 'h-9 px-3.5 text-sm',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', className, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-colors',
        'disabled:opacity-50 disabled:pointer-events-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]/50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
});
