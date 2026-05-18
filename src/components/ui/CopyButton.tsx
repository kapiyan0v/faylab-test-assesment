import { useState } from 'react';
import { cn } from '@/lib/cn';
import { IconCopy, IconCheck } from '@/components/icons';

interface CopyButtonProps {
  value: string;
  label?: string;
  className?: string;
}

export function CopyButton({ value, label = 'Copy', className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border border-[color:var(--color-border-strong)] bg-[color:var(--color-panel-2)] px-2 py-1 text-xs text-[color:var(--color-fg-dim)] hover:text-[color:var(--color-fg)]',
        className,
      )}
    >
      {copied ? <IconCheck className="h-3 w-3" /> : <IconCopy className="h-3 w-3" />}
      <span>{copied ? 'Copied' : label}</span>
    </button>
  );
}
