import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/Button';
import { useDeleteApiKey } from '@/api/hooks';
import { useToast } from '@/components/toast/ToastProvider';
import type { ApiKey } from '@/api/types';
import { cn } from '@/lib/cn';

interface DeleteKeyDialogProps {
  apiKey: ApiKey | null;
  onClose: () => void;
}

export function DeleteKeyDialog({ apiKey, onClose }: DeleteKeyDialogProps) {
  const del = useDeleteApiKey();
  const toast = useToast();

  async function handleConfirm() {
    if (!apiKey) return;
    try {
      await del.mutateAsync(apiKey.id);
      toast.success('API key deleted');
      onClose();
    } catch (err) {
      toast.error('Failed to delete key', err instanceof Error ? err.message : undefined);
    }
  }

  return (
    <Dialog.Root open={apiKey !== null} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/60 radix-overlay" />
        <Dialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 z-50 w-[min(380px,calc(100vw-2rem))]',
            '-translate-x-1/2 -translate-y-1/2 rounded-xl border border-[color:var(--color-border-strong)]',
            'bg-[color:var(--color-panel)] p-5 shadow-2xl radix-content focus:outline-none',
          )}
        >
          <Dialog.Title className="text-base font-semibold">Delete API key?</Dialog.Title>
          <Dialog.Description className="mt-1 text-xs text-[color:var(--color-fg-dim)]">
            <span className="text-[color:var(--color-fg)]">{apiKey?.name}</span> will stop working
            immediately. This cannot be undone.
          </Dialog.Description>
          <div className="mt-5 flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirm} disabled={del.isPending}>
              {del.isPending ? 'Deleting…' : 'Delete key'}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
