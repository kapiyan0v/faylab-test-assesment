import { mockChatClient, type ChatClient } from './mockChatClient';

export type { ChatClient } from './mockChatClient';

/**
 * Single export point for the chat backend. Replace with a real fetch/SSE-based
 * implementation (e.g. `httpChatClient`) — `useChat` and the page stay unchanged.
 */
export const chatClient: ChatClient = mockChatClient;
