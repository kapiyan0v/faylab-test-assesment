import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from './client';
import type {
  ApiKey,
  CreateApiKeyInput,
  CreatedApiKey,
  UpdateApiKeyInput,
} from './types';

export const apiKeysKey = ['api-keys'] as const;

export function useApiKeys() {
  return useQuery({
    queryKey: apiKeysKey,
    queryFn: () => apiClient.listApiKeys(),
  });
}

export function useCreateApiKey() {
  const qc = useQueryClient();
  return useMutation<CreatedApiKey, Error, CreateApiKeyInput>({
    mutationFn: (input) => apiClient.createApiKey(input),
    onSuccess: (created) => {
      qc.setQueryData<ApiKey[]>(apiKeysKey, (prev) => {
        const { secret: _secret, ...rest } = created;
        return prev ? [rest, ...prev] : [rest];
      });
    },
  });
}

export function useUpdateApiKey() {
  const qc = useQueryClient();
  return useMutation<ApiKey, Error, UpdateApiKeyInput>({
    mutationFn: (input) => apiClient.updateApiKey(input),
    onSuccess: (updated) => {
      qc.setQueryData<ApiKey[]>(apiKeysKey, (prev) =>
        prev?.map((k) => (k.id === updated.id ? updated : k)) ?? prev,
      );
    },
  });
}

export function useDeleteApiKey() {
  const qc = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: (id) => apiClient.deleteApiKey(id),
    onSuccess: (_void, id) => {
      qc.setQueryData<ApiKey[]>(apiKeysKey, (prev) =>
        prev?.filter((k) => k.id !== id) ?? prev,
      );
    },
  });
}
