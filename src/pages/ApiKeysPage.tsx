import { useState } from 'react';
import { useApiKeys, useUpdateApiKey } from '@/api/hooks';
import { Button } from '@/components/ui/Button';
import PageHeader from '@/components/layout/PageHeader';
import { ApiKeysTable } from '@/features/api-keys/ApiKeysTable';
import { ApiKeysCardList } from '@/features/api-keys/ApiKeysCardList';
import { CreateKeyDialog } from '@/features/api-keys/CreateKeyDialog';
import { EditKeyDialog } from '@/features/api-keys/EditKeyDialog';
import { DeleteKeyDialog } from '@/features/api-keys/DeleteKeyDialog';
import { useToast } from '@/components/toast/ToastProvider';
import { IconPlus } from '@/components/icons';
import type { ApiKey } from '@/api/types';

export default function ApiKeysPage() {
  const { data: keys, isLoading, isError, refetch } = useApiKeys();
  const update = useUpdateApiKey();
  const toast = useToast();

  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<ApiKey | null>(null);
  const [deleting, setDeleting] = useState<ApiKey | null>(null);

  async function handleToggleDisable(k: ApiKey) {
    if (k.status === 'expired') return;
    const next = k.status === 'disabled' ? 'active' : 'disabled';
    try {
      await update.mutateAsync({ id: k.id, status: next });
      toast.success(`Key ${next === 'disabled' ? 'disabled' : 'enabled'}`);
    } catch (err) {
      toast.error('Failed to update key', err instanceof Error ? err.message : undefined);
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-8">
      <PageHeader
        title="API keys"
        subtitle="Manage your API keys to access all models."
        actions={
          <Button onClick={() => setCreateOpen(true)}>
            <IconPlus className="h-3.5 w-3.5" />
            Create API key
          </Button>
        }
      />

      {isLoading ? (
        <SkeletonRows />
      ) : isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : !keys || keys.length === 0 ? (
        <EmptyState onCreate={() => setCreateOpen(true)} />
      ) : (
        <>
          <ApiKeysTable
            rows={keys}
            onEdit={setEditing}
            onToggleDisable={handleToggleDisable}
            onDelete={setDeleting}
          />
          <ApiKeysCardList
            rows={keys}
            onEdit={setEditing}
            onToggleDisable={handleToggleDisable}
            onDelete={setDeleting}
          />
        </>
      )}

      <CreateKeyDialog open={createOpen} onOpenChange={setCreateOpen} />
      <EditKeyDialog apiKey={editing} onClose={() => setEditing(null)} />
      <DeleteKeyDialog apiKey={deleting} onClose={() => setDeleting(null)} />
    </div>
  );
}

function SkeletonRows() {
  return (
    <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-panel)] p-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 py-3">
          <div className="h-3.5 w-32 animate-pulse rounded bg-[color:var(--color-panel-2)]" />
          <div className="h-3.5 w-24 animate-pulse rounded bg-[color:var(--color-panel-2)]" />
          <div className="ml-auto h-3.5 w-16 animate-pulse rounded bg-[color:var(--color-panel-2)]" />
        </div>
      ))}
    </div>
  );
}

function EmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="rounded-xl border border-dashed border-[color:var(--color-border-strong)] bg-[color:var(--color-panel)] p-10 text-center">
      <p className="text-sm text-[color:var(--color-fg)]">No API keys yet.</p>
      <p className="mt-1 text-xs text-[color:var(--color-fg-dim)]">
        Create your first key to start calling the API.
      </p>
      <div className="mt-4">
        <Button onClick={onCreate}>
          <IconPlus className="h-3.5 w-3.5" />
          Create API key
        </Button>
      </div>
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="rounded-xl border border-[color:var(--color-danger)]/40 bg-[color:var(--color-danger)]/5 p-6 text-center">
      <p className="text-sm text-[color:var(--color-danger)]">Failed to load API keys.</p>
      <div className="mt-3">
        <Button variant="secondary" onClick={onRetry}>
          Try again
        </Button>
      </div>
    </div>
  );
}
