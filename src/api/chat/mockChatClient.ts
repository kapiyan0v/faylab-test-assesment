import type { ThinkingMode } from '@/features/thinking/PixelGrid';
import { pickReply } from './responses';
import type {
  CancelStream,
  ChatStreamCallbacks,
  SendMessageInput,
} from './types';

/**
 * Per-mode pacing. Faster modes deliver more tokens per second so the streaming
 * speed visibly matches the "1 000 t/s · ↑ 20% faster" hint in the header.
 */
const MODE_PACING: Record<ThinkingMode, { initialDelayMs: number; tokenMs: number }> = {
  fast:     { initialDelayMs: 380, tokenMs: 22 },
  balanced: { initialDelayMs: 520, tokenMs: 38 },
  quality:  { initialDelayMs: 780, tokenMs: 55 },
  eco:      { initialDelayMs: 620, tokenMs: 48 },
};

/** Splits a reply into "word + trailing space/newline" chunks, the way an SSE stream would. */
function tokenise(text: string): string[] {
  const out: string[] = [];
  const pattern = /\S+\s*|\s+/g;
  let m: RegExpExecArray | null;
  while ((m = pattern.exec(text)) !== null) {
    out.push(m[0]);
  }
  return out;
}

export interface ChatClient {
  sendMessage(input: SendMessageInput, callbacks: ChatStreamCallbacks): CancelStream;
}

export const mockChatClient: ChatClient = {
  sendMessage(input, callbacks) {
    const pacing = MODE_PACING[input.mode];
    const tokens = tokenise(pickReply(input.prompt));
    let cancelled = false;
    let cursor = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const cancel: CancelStream = () => {
      if (cancelled) return;
      cancelled = true;
      if (timer !== null) clearTimeout(timer);
      callbacks.onCancel?.();
    };

    function emit() {
      if (cancelled) return;
      if (cursor >= tokens.length) {
        callbacks.onDone();
        return;
      }
      try {
        callbacks.onChunk(tokens[cursor]!);
      } catch (err) {
        callbacks.onError?.(err instanceof Error ? err : new Error(String(err)));
        return;
      }
      cursor += 1;
      timer = setTimeout(emit, pacing.tokenMs);
    }

    timer = setTimeout(emit, pacing.initialDelayMs);
    return cancel;
  },
};
