import { Link } from 'react-router-dom';
import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { IconChat } from '@/components/icons';

export default function PlaygroundPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 md:px-8 md:py-8">
      <PageHeader title="Playground" subtitle="Try models interactively before wiring them up." />
      <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-panel)] p-6">
        <p className="text-sm text-[color:var(--color-fg)]">
          The playground lets you try any model with sample prompts and tweak temperature, top-p,
          and max tokens. A working chat demo with the thinking animation is available below.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            to="/chat"
            className="inline-flex h-9 items-center gap-1.5 rounded-md bg-[color:var(--color-accent)] px-3.5 text-sm font-medium text-white hover:bg-[color:var(--color-accent-strong)]"
          >
            <IconChat className="h-3.5 w-3.5" /> Open chat demo
          </Link>
          <Button variant="secondary">Browse prompt library</Button>
        </div>
      </div>
    </div>
  );
}
