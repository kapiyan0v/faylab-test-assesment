import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/ui/CopyButton';
import { useCreateApiKey } from '@/api/hooks';
import { useToast } from '@/components/toast/ToastProvider';
import type { CreatedApiKey } from '@/api/types';
import { cn } from '@/lib/cn';

interface CreateKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EXPIRY_OPTIONS: Array<{ label: string; value: number | null }> = [
  { label: '30 days', value: 30 },
  { label: '60 days', value: 60 },
  { label: '90 days', value: 90 },
  { label: 'No expiry', value: null },
];

export function CreateKeyDialog({ open, onOpenChange }: CreateKeyDialogProps) {
  const [name, setName] = useState('');
  const [expiresInDays, setExpiresInDays] = useState<number | null>(30);
  const [created, setCreated] = useState<CreatedApiKey | null>(null);
  const createKey = useCreateApiKey();
  const toast = useToast();

  function reset() {
    setName('');
    setExpiresInDays(30);
    setCreated(null);
    createKey.reset();
  }

  function handleClose(next: boolean) {
    if (!next) reset();
    onOpenChange(next);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const result = await createKey.mutateAsync({ name, expiresInDays });
      setCreated(result);
      toast.success('API key created', 'Make sure to copy it now — you won\'t see it again.');
    } catch (err) {
      toast.error('Failed to create key', err instanceof Error ? err.message : undefined);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/60 radix-overlay" />
        <Dialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 z-50 w-[min(440px,calc(100vw-2rem))]',
            '-translate-x-1/2 -translate-y-1/2 rounded-xl border border-[color:var(--color-border-strong)]',
            'bg-[color:var(--color-panel)] p-5 shadow-2xl radix-content focus:outline-none',
          )}
        >
          <Dialog.Title className="text-base font-semibold text-[color:var(--color-fg)]">
            {created ? 'Your API key' : 'Create API key'}
          </Dialog.Title>
          <Dialog.Description className="mt-1 text-xs text-[color:var(--color-fg-dim)]">
            {created
              ? 'Copy this key and store it somewhere safe — it will not be shown again.'
              : 'Name your key and choose how long it should remain valid.'}
          </Dialog.Description>

          {created ? (
            <CreatedView createdKey={created} onDone={() => handleClose(false)} />
          ) : (
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
                  placeholder="e.g. ai_inference_key"
                  className="rounded-md border border-[color:var(--color-border-strong)] bg-[color:var(--color-bg)] px-2.5 py-1.5 text-sm text-[color:var(--color-fg)] placeholder:text-[color:var(--color-muted)] focus:border-[color:var(--color-accent)] focus:outline-none"
                />
              </label>

              <fieldset className="flex flex-col gap-1.5">
                <legend className="text-xs text-[color:var(--color-fg-dim)]">Expires</legend>
                <div className="grid grid-cols-4 gap-1.5">
                  {EXPIRY_OPTIONS.map((opt) => {
                    const active = expiresInDays === opt.value;
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => setExpiresInDays(opt.value)}
                        className={cn(
                          'rounded-md border px-2 py-1.5 text-xs transition-colors',
                          active
                            ? 'border-[color:var(--color-accent)] bg-[color:var(--color-accent)]/15 text-[color:var(--color-fg)]'
                            : 'border-[color:var(--color-border-strong)] bg-[color:var(--color-panel-2)] text-[color:var(--color-fg-dim)] hover:text-[color:var(--color-fg)]',
                        )}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="mt-1 flex justify-end gap-2">
                <Button type="button" variant="ghost" onClick={() => handleClose(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createKey.isPending}>
                  {createKey.isPending ? 'Creating…' : 'Create key'}
                </Button>
              </div>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function CreatedView({
  createdKey,
  onDone,
}: {
  createdKey: CreatedApiKey;
  onDone: () => void;
}) {
  return (
    <div className="mt-4 flex flex-col gap-3">
      <div className="rounded-md border border-[color:var(--color-warning)]/40 bg-[color:var(--color-warning)]/10 px-3 py-2 text-xs text-[color:var(--color-warning)]">
        Store this key securely. We won't be able to show it again.
      </div>
      <div className="flex items-center gap-2 rounded-md border border-[color:var(--color-border-strong)] bg-[color:var(--color-bg)] px-3 py-2">
        <code className="flex-1 truncate font-mono text-xs text-[color:var(--color-fg)]">
          {createdKey.secret}
        </code>
        <CopyButton value={createdKey.secret} />
      </div>
      <div className="text-xs text-[color:var(--color-fg-dim)]">
        Name: <span className="text-[color:var(--color-fg)]">{createdKey.name}</span>
      </div>
      <div className="mt-1 flex justify-end">
        <Button onClick={onDone}>Done</Button>
      </div>
    </div>
  );
}
