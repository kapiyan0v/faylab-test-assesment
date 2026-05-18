import { PixelGrid, type ThinkingMode } from './PixelGrid';
import { cn } from '@/lib/cn';

const MODE_LABEL: Record<ThinkingMode, string> = {
  fast: 'Fast',
  balanced: 'Balanced',
  quality: 'Quality',
  eco: 'Eco',
};

const MODE_RING: Record<ThinkingMode, string> = {
  fast: 'ring-[color:var(--mode-fast)]/30',
  balanced: 'ring-[color:var(--mode-balanced)]/30',
  quality: 'ring-[color:var(--mode-quality)]/30',
  eco: 'ring-[color:var(--mode-eco)]/30',
};

interface ThinkingHeaderProps {
  mode: ThinkingMode;
  tokensPerSec?: number;
  fasterBy?: number;
}

export function ThinkingHeader({
  mode,
  tokensPerSec = 1000,
  fasterBy = 20,
}: ThinkingHeaderProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2.5 rounded-full border border-[color:var(--color-border-strong)] bg-[color:var(--color-panel)] px-3 py-1.5 ring-1',
        MODE_RING[mode],
      )}
    >
      <span className="text-xs tabular-nums text-[color:var(--color-fg)]">
        {tokensPerSec.toLocaleString()} t/s
      </span>
      <PixelGrid mode={mode} cols={6} rows={3} cellSize={4} gap={1} />
      <span className="text-[11px] font-medium text-[color:var(--color-success)]">
        ↑ {fasterBy}% faster
      </span>
      <span className="text-[10px] uppercase tracking-wider text-[color:var(--color-muted)]">
        {MODE_LABEL[mode]}
      </span>
    </div>
  );
}
