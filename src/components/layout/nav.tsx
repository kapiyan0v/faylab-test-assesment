import type { ComponentType, SVGProps } from 'react';
import {
  IconModels,
  IconApiKey,
  IconUsage,
  IconBilling,
  IconPlayground,
  IconNodeRewards,
  IconSettings,
  IconDocs,
  IconUser,
} from '@/components/icons';

export interface NavItem {
  label: string;
  to: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface NavGroup {
  heading: string;
  items: NavItem[];
}

export const DESKTOP_NAV: NavGroup[] = [
  {
    heading: 'Native',
    items: [
      { label: 'Models', to: '/models', Icon: IconModels },
      { label: 'API keys', to: '/api-keys', Icon: IconApiKey },
      { label: 'Usage', to: '/usage', Icon: IconUsage },
      { label: 'Billing', to: '/billing', Icon: IconBilling },
      { label: 'Playground', to: '/playground', Icon: IconPlayground },
    ],
  },
  {
    heading: 'Tools',
    items: [{ label: 'Node rewards', to: '/node-rewards', Icon: IconNodeRewards }],
  },
  {
    heading: 'System',
    items: [
      { label: 'Settings', to: '/settings', Icon: IconSettings },
      { label: 'Docs', to: '/docs', Icon: IconDocs },
    ],
  },
];

export const MOBILE_NAV: NavItem[] = [
  { label: 'Models', to: '/models', Icon: IconModels },
  { label: 'API keys', to: '/api-keys', Icon: IconApiKey },
  { label: 'Usage', to: '/usage', Icon: IconUsage },
  { label: 'Billing', to: '/billing', Icon: IconBilling },
  { label: 'Account', to: '/settings', Icon: IconUser },
];
