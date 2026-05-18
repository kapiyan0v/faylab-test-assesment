import * as Menu from '@radix-ui/react-dropdown-menu';
import { IconMore } from '@/components/icons';
import { cn } from '@/lib/cn';

interface RowMenuProps {
  status: 'active' | 'disabled' | 'expired';
  onEdit: () => void;
  onToggleDisable: () => void;
  onDelete: () => void;
  triggerClassName?: string;
}

export function RowMenu({
  status,
  onEdit,
  onToggleDisable,
  onDelete,
  triggerClassName,
}: RowMenuProps) {
  const canToggleDisable = status !== 'expired';
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <button
          type="button"
          aria-label="Row actions"
          className={cn(
            'rounded-md p-1 text-[color:var(--color-fg-dim)] hover:bg-[color:var(--color-panel-2)] hover:text-[color:var(--color-fg)]',
            triggerClassName,
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <IconMore />
        </button>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Content
          align="end"
          sideOffset={4}
          className="min-w-[140px] rounded-md border border-[color:var(--color-border-strong)] bg-[color:var(--color-panel)] p-1 text-sm shadow-2xl radix-content"
        >
          <MenuItem onSelect={onEdit}>Edit</MenuItem>
          <MenuItem
            disabled={!canToggleDisable}
            onSelect={onToggleDisable}
          >
            {status === 'disabled' ? 'Enable' : 'Disable'}
          </MenuItem>
          <Menu.Separator className="my-1 h-px bg-[color:var(--color-border)]" />
          <MenuItem
            danger
            onSelect={onDelete}
          >
            Delete
          </MenuItem>
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  );
}

function MenuItem({
  children,
  onSelect,
  danger,
  disabled,
}: {
  children: React.ReactNode;
  onSelect: () => void;
  danger?: boolean;
  disabled?: boolean;
}) {
  return (
    <Menu.Item
      disabled={disabled}
      onSelect={(e) => {
        e.preventDefault();
        if (!disabled) onSelect();
      }}
      className={cn(
        'flex cursor-pointer select-none items-center rounded px-2 py-1.5 text-xs outline-none',
        'data-[highlighted]:bg-[color:var(--color-panel-2)]',
        disabled && 'opacity-40 cursor-not-allowed',
        danger
          ? 'text-[color:var(--color-danger)]'
          : 'text-[color:var(--color-fg)]',
      )}
    >
      {children}
    </Menu.Item>
  );
}
