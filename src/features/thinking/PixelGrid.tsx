import { cn } from '@/lib/cn';
import type { CSSProperties } from 'react';

export type ThinkingMode = 'fast' | 'balanced' | 'quality' | 'eco';

const MODE_VAR: Record<ThinkingMode, string> = {
  fast: 'var(--mode-fast)',
  balanced: 'var(--mode-balanced)',
  quality: 'var(--mode-quality)',
  eco: 'var(--mode-eco)',
};

interface PixelGridProps {
  /** Side length of the square grid. 4 keeps it dense and compact. */
  size?: number;
  /** Mode determines accent color. */
  mode?: ThinkingMode;
  /** Outer width/height of the grid in px. */
  pixelSize?: number;
  className?: string;
}

/**
 * Small square grid of CSS-animated cells. Each cell pulses with a staggered
 * delay derived from its diagonal index, which produces a sweeping wave that
 * grows from one corner and decays to the other — the look in the brief.
 *
 * Pure CSS: no JS animation loop, no canvas, no dependencies.
 */
export function PixelGrid({ size = 4, mode = 'fast', pixelSize = 22, className }: PixelGridProps) {
  const total = size * size;
  const cells = Array.from({ length: total });
  const maxDiag = (size - 1) * 2;
  const cycle = 1.8; // matches @keyframes pixel-pulse duration in index.css

  return (
    <div
      aria-hidden
      className={cn('grid', className)}
      style={
        {
          width: pixelSize,
          height: pixelSize,
          gridTemplateColumns: `repeat(${size}, 1fr)`,
          gridTemplateRows: `repeat(${size}, 1fr)`,
          gap: 1,
          '--pixel-color': MODE_VAR[mode],
        } as CSSProperties
      }
    >
      {cells.map((_, i) => {
        const row = Math.floor(i / size);
        const col = i % size;
        const diag = row + col;
        const delay = (diag / maxDiag) * cycle * 0.5;
        return (
          <span
            key={i}
            className="pixel-cell"
            style={{ ['--cell-delay' as string]: `${delay.toFixed(2)}s` }}
          />
        );
      })}
    </div>
  );
}
