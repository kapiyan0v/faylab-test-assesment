export type ApiKeyStatus = 'active' | 'disabled' | 'expired';

export interface ApiKey {
  id: string;
  name: string;
  /** Masked representation, e.g. "a762…d4yc". Real key value is never stored client-side. */
  preview: string;
  status: ApiKeyStatus;
  /** ISO date string or null when not expiring. */
  expiresAt: string | null;
  createdAt: string;
  lastUsedAt: string | null;
}

/** Returned exactly once when a key is created — never stored. */
export interface CreatedApiKey extends ApiKey {
  secret: string;
}

export interface CreateApiKeyInput {
  name: string;
  /** Days until expiry; null = no expiry */
  expiresInDays: number | null;
}

export interface UpdateApiKeyInput {
  id: string;
  name?: string;
  status?: ApiKeyStatus;
}
