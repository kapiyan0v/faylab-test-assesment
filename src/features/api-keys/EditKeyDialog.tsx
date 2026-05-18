import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useUpdateApiKey } from '@/api/hooks';
import { useToast } from '@/components/toast/ToastProvider';
import type { ApiKey } from '@/api/types';
import { cn } from '@/lib/cn';

interface EditKeyDialogProps {
  apiKey: ApiKey | null;
  onClose: () => void;
}

export function EditKeyDialog({ apiKey, onClose }: EditKeyDialogProps) {
  const [name, setName] = useState('');
  const update = useUpdateApiKey();
  const toast = useToast();

  useEffect(() => {
    if (apiKey) setName(apiKey.name);
  }, [apiKey]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!apiKey) return;
    try {
      await update.mutateAsync({ id: apiKey.id, name });
      toast.success('API key updated');
      onClose();
    } catch (err) {
      toast.error('Failed to update key', err instanceof Error ? err.message : undefined);
    }
  }

  return (
    <Dialog.Root open={apiKey !== null} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/60 radix-overlay" />
        <Dialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 z-50 w-[min(420px,calc(100vw-2rem))]',
            '-translate-x-1/2 -translate-y-1/2 rounded-xl border border-[color:var(--color-border-strong)]',
            'bg-[color:var(--color-panel)] p-5 shadow-2xl radix-content focus:outline-none',
          )}
        >
          <Dialog.Title className="text-base font-semibold">Edit API key</Dialog.Title>
          <Dialog.Description className="mt-1 text-xs text-[color:var(--color-fg-dim)]">
            Rename this key. The key value itself cannot be changed.
          </Dialog.Description>

          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs text-[color:var(--color-fg-dim)]">Name</span>
              <input
                autoFocus
                required
                minLength={2}
                maxLength={48}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-md border border-[color:var(--color-border-strong)] bg-[color:var(--color-bg)] px-2.5 py-1.5 text-sm focus:border-[color:var(--color-accent)] focus:outline-none"
              />
            </label>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={update.isPending}>
                {update.isPending ? 'Saving…' : 'Save'}
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
