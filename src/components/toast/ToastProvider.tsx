import * as Toast from '@radix-ui/react-toast';
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

type ToastTone = 'success' | 'error' | 'info';
interface ToastItem {
  id: number;
  title: string;
  description?: string;
  tone: ToastTone;
}

interface ToastApi {
  show: (t: Omit<ToastItem, 'id'>) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
}

const ToastContext = createContext<ToastApi | null>(null);

export function useToast(): ToastApi {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const remove = useCallback((id: number) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const api = useMemo<ToastApi>(() => {
    const show = (t: Omit<ToastItem, 'id'>) => {
      setItems((prev) => [...prev, { ...t, id: Date.now() + Math.random() }]);
    };
    return {
      show,
      success: (title, description) => show({ title, description, tone: 'success' }),
      error: (title, description) => show({ title, description, tone: 'error' }),
    };
  }, []);

  return (
    <ToastContext.Provider value={api}>
      {children}
      {items.map((t) => (
        <Toast.Root
          key={t.id}
          duration={4000}
          onOpenChange={(open) => !open && remove(t.id)}
          className={cn(
            'pointer-events-auto rounded-lg border bg-[color:var(--color-panel)] px-4 py-3 shadow-2xl',
            'data-[state=open]:animate-[content-in_160ms_ease-out]',
            t.tone === 'success' && 'border-[color:var(--color-success)]/30',
            t.tone === 'error' && 'border-[color:var(--color-danger)]/40',
            t.tone === 'info' && 'border-[color:var(--color-border-strong)]',
          )}
        >
          <Toast.Title className="text-sm font-medium text-[color:var(--color-fg)]">
            {t.title}
          </Toast.Title>
          {t.description ? (
            <Toast.Description className="mt-0.5 text-xs text-[color:var(--color-fg-dim)]">
              {t.description}
            </Toast.Description>
          ) : null}
        </Toast.Root>
      ))}
      <Toast.Viewport className="fixed bottom-4 right-4 z-[100] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-2 outline-none" />
    </ToastContext.Provider>
  );
}
