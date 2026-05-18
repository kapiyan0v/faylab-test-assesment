import type { ApiClient } from './client';
import type {
  ApiKey,
  CreateApiKeyInput,
  CreatedApiKey,
  UpdateApiKeyInput,
} from './types';

const STORAGE_KEY = 'faylab.mock.apiKeys.v1';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function uid(): string {
  return crypto.randomUUID?.() ?? Math.random().toString(36).slice(2, 12);
}

function randomToken(len = 32): string {
  const bytes = new Uint8Array(len);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

function preview(secret: string): string {
  return `${secret.slice(0, 4)}…${secret.slice(-4)}`;
}

function daysFromNow(days: number | null): string | null {
  if (days === null) return null;
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

function daysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
}

const seed: ApiKey[] = [
  {
    id: uid(),
    name: 'ai_inference_key',
    preview: 'a762…d4yc',
    status: 'active',
    expiresAt: daysFromNow(29),
    createdAt: daysAgo(45),
    lastUsedAt: new Date().toISOString(),
  },
  {
    id: uid(),
    name: 'model_training_key',
    preview: 'c3dd…u8vu',
    status: 'active',
    expiresAt: daysFromNow(31),
    createdAt: daysAgo(50),
    lastUsedAt: daysAgo(0.3),
  },
  {
    id: uid(),
    name: 'vision_model_key',
    preview: 'e0f6…l7vs',
    status: 'expired',
    expiresAt: daysAgo(2),
    createdAt: daysAgo(75),
    lastUsedAt: daysAgo(2),
  },
  {
    id: uid(),
    name: 'vision_model_key_v1',
    preview: 'g7t6…qjqo',
    status: 'expired',
    expiresAt: daysAgo(13),
    createdAt: daysAgo(80),
    lastUsedAt: daysAgo(13),
  },
];

function load(): ApiKey[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as ApiKey[];
  } catch {
    /* fall through */
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  return [...seed];
}

function save(keys: ApiKey[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(keys));
}

export const mockClient: ApiClient = {
  async listApiKeys() {
    await sleep(220);
    return load();
  },

  async createApiKey(input: CreateApiKeyInput): Promise<CreatedApiKey> {
    await sleep(380);
    const secret = `sk-${randomToken(20)}`;
    const key: ApiKey = {
      id: uid(),
      name: input.name.trim() || 'untitled_key',
      preview: preview(secret),
      status: 'active',
      expiresAt: daysFromNow(input.expiresInDays),
      createdAt: new Date().toISOString(),
      lastUsedAt: null,
    };
    const next = [key, ...load()];
    save(next);
    return { ...key, secret };
  },

  async updateApiKey(input: UpdateApiKeyInput) {
    await sleep(220);
    const keys = load();
    const idx = keys.findIndex((k) => k.id === input.id);
    if (idx === -1) throw new Error('API key not found');
    const updated: ApiKey = {
      ...keys[idx]!,
      ...(input.name !== undefined ? { name: input.name } : {}),
      ...(input.status !== undefined ? { status: input.status } : {}),
    };
    keys[idx] = updated;
    save(keys);
    return updated;
  },

  async deleteApiKey(id: string) {
    await sleep(220);
    const next = load().filter((k) => k.id !== id);
    save(next);
  },
};
