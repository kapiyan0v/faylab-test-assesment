import { useCallback, useEffect, useRef, useState } from 'react';
import { chatClient } from '@/api/chat/client';
import type { ThinkingMode } from '@/features/thinking/PixelGrid';

export type MessageRole = 'user' | 'assistant' | 'thinking';

export interface Message {
  id: number;
  role: MessageRole;
  text: string;
  mode: ThinkingMode;
  streaming?: boolean;
}

let nextId = 1;
const id = () => nextId++;

export interface UseChatResult {
  messages: Message[];
  send: (text: string, mode: ThinkingMode) => void;
  cancel: () => void;
  reset: () => void;
  isStreaming: boolean;
}

export function useChat(initial: Message[] = []): UseChatResult {
  const [messages, setMessages] = useState<Message[]>(initial);
  const [isStreaming, setIsStreaming] = useState(false);
  const cancelRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    return () => {
      cancelRef.current?.();
    };
  }, []);

  const send = useCallback((text: string, mode: ThinkingMode) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    cancelRef.current?.();

    const userMsg: Message = { id: id(), role: 'user', text: trimmed, mode };
    const thinkingMsg: Message = { id: id(), role: 'thinking', text: '', mode };

    setMessages((prev) => [...prev.filter((m) => m.role !== 'thinking'), userMsg, thinkingMsg]);
    setIsStreaming(true);

    let assistantId: number | null = null;

    cancelRef.current = chatClient.sendMessage(
      { prompt: trimmed, mode },
      {
        onChunk: (delta) => {
          setMessages((prev) => {
            if (assistantId === null) {
              assistantId = id();
              return [
                ...prev.filter((m) => m.role !== 'thinking'),
                { id: assistantId, role: 'assistant', text: delta, mode, streaming: true },
              ];
            }
            return prev.map((m) =>
              m.id === assistantId ? { ...m, text: m.text + delta } : m,
            );
          });
        },
        onDone: () => {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, streaming: false } : m,
            ),
          );
          setIsStreaming(false);
          cancelRef.current = null;
        },
        onCancel: () => {
          setMessages((prev) =>
            prev
              .filter((m) => m.role !== 'thinking')
              .map((m) => (m.id === assistantId ? { ...m, streaming: false } : m)),
          );
          setIsStreaming(false);
          cancelRef.current = null;
        },
      },
    );
  }, []);

  const cancel = useCallback(() => {
    cancelRef.current?.();
  }, []);

  const reset = useCallback(() => {
    cancelRef.current?.();
    setMessages([]);
    setIsStreaming(false);
  }, []);

  return { messages, send, cancel, reset, isStreaming };
}

export function makeMessage(
  role: MessageRole,
  text: string,
  mode: ThinkingMode = 'fast',
): Message {
  return { id: id(), role, text, mode };
}
