import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';

export default function SettingsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 md:px-8 md:py-8">
      <PageHeader title="Account settings" subtitle="Profile, organisation and preferences." />
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-5 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-panel)] p-5"
      >
        <Field label="Display name" defaultValue="Kirill Tagintsev" />
        <Field label="Email" defaultValue="kapiyanovt@gmail.com" type="email" />
        <Field label="Organization" defaultValue="Faylab Inc." />
        <fieldset className="flex items-start gap-3">
          <input id="notify" type="checkbox" defaultChecked className="mt-1" />
          <label htmlFor="notify" className="text-sm">
            Email me when an API key is created or expires.
          </label>
        </fieldset>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" type="reset">
            Reset
          </Button>
          <Button type="submit">Save changes</Button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, ...input }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs text-[color:var(--color-fg-dim)]">{label}</span>
      <input
        {...input}
        className="rounded-md border border-[color:var(--color-border-strong)] bg-[color:var(--color-bg)] px-2.5 py-1.5 text-sm text-[color:var(--color-fg)] focus:border-[color:var(--color-accent)] focus:outline-none"
      />
    </label>
  );
}
