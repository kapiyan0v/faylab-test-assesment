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
  /** Number of cells horizontally. */
  cols?: number;
  /** Number of cells vertically. */
  rows?: number;
  /** Mode determines accent color. */
  mode?: ThinkingMode;
  /** Cell edge length in px. The container width/height is derived from it. */
  cellSize?: number;
  /** Gap between cells in px. */
  gap?: number;
  className?: string;
}

/**
 * Rectangular grid of CSS-animated cells.
 *
 * Pulse delay = (col + distance_from_middle_row), so cells closer to the
 * vertical centre lead the wave. Each wavefront forms a chevron `>` whose tip
 * sits in the middle row, and the chevron sweeps left → right — an arrow.
 *
 * Pure CSS: no JS animation loop, no canvas, no dependencies.
 */
export function PixelGrid({
  cols = 6,
  rows = 3,
  mode = 'fast',
  cellSize = 4,
  gap = 1,
  className,
}: PixelGridProps) {
  const total = cols * rows;
  const cells = Array.from({ length: total });
  const midRow = (rows - 1) / 2;
  const maxRowDist = Math.floor(rows / 2);
  const maxEff = Math.max(cols - 1 + maxRowDist, 1);
  const cycle = 1.8; // matches @keyframes pixel-pulse duration in index.css

  const width = cols * cellSize + (cols - 1) * gap;
  const height = rows * cellSize + (rows - 1) * gap;

  return (
    <div
      aria-hidden
      className={cn('grid shrink-0', className)}
      style={
        {
          width,
          height,
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
          gap,
          '--pixel-color': MODE_VAR[mode],
        } as CSSProperties
      }
    >
      {cells.map((_, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const rowDist = Math.abs(row - midRow);
        const eff = col + rowDist;
        const delay = (eff / maxEff) * cycle * 0.5;
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
