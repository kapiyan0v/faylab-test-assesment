import { cn } from '@/lib/cn';
import type { CSSProperties } from 'react';
import type { ThinkingMode } from './PixelGrid';

const SHIMMER_HIGHLIGHT: Record<ThinkingMode, string> = {
  fast: '#e9d5ff',
  balanced: '#bae6fd',
  quality: '#fbcfe8',
  eco: '#bbf7d0',
};

interface ThinkingTextProps {
  mode?: ThinkingMode;
  label?: string;
  className?: string;
}

export function ThinkingText({ mode = 'fast', label = 'Thinking…', className }: ThinkingTextProps) {
  return (
    <span
      className={cn('thinking-shimmer text-xs font-medium tracking-wide', className)}
      style={
        {
          '--shimmer-base': '#4a4a52',
          '--shimmer-highlight': SHIMMER_HIGHLIGHT[mode],
        } as CSSProperties
      }
    >
      {label}
    </span>
  );
}
