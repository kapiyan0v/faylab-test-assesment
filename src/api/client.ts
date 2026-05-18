import type {
  ApiKey,
  CreateApiKeyInput,
  CreatedApiKey,
  UpdateApiKeyInput,
} from './types';

/**
 * `ApiClient` is the seam between the UI and the network layer.
 * Replace the implementation in `mockClient.ts` with a real fetch-based one
 * (e.g. `httpClient.ts` calling `/v1/api-keys`) and nothing else needs to change.
 */
export interface ApiClient {
  listApiKeys(): Promise<ApiKey[]>;
  createApiKey(input: CreateApiKeyInput): Promise<CreatedApiKey>;
  updateApiKey(input: UpdateApiKeyInput): Promise<ApiKey>;
  deleteApiKey(id: string): Promise<void>;
}

import { mockClient } from './mockClient';

// Single export point — swap this line when wiring a real backend.
export const apiClient: ApiClient = mockClient;
