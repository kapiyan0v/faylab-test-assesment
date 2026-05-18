import type { ThinkingMode } from '@/features/thinking/PixelGrid';

export interface SendMessageInput {
  prompt: string;
  mode: ThinkingMode;
}

export interface ChatStreamCallbacks {
  /** Called once per streamed delta (typically a word + trailing space). */
  onChunk: (delta: string) => void;
  /** Called once after the final delta. */
  onDone: () => void;
  /** Called if the stream was aborted via the returned cancel handle. */
  onCancel?: () => void;
  /** Called on any internal error. */
  onError?: (error: Error) => void;
}

export type CancelStream = () => void;
