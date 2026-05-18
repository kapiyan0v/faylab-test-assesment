import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 16,
  height: 16,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

export const IconModels = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="4" width="7" height="7" rx="1.5" />
    <rect x="14" y="4" width="7" height="7" rx="1.5" />
    <rect x="3" y="13" width="7" height="7" rx="1.5" />
    <rect x="14" y="13" width="7" height="7" rx="1.5" />
  </svg>
);

export const IconApiKey = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="8" cy="14" r="3.5" />
    <path d="M10.5 11.5 21 3" />
    <path d="m17 7 3 3" />
    <path d="m14 10 3 3" />
  </svg>
);

export const IconUsage = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 20V10" />
    <path d="M10 20V4" />
    <path d="M17 20v-7" />
  </svg>
);

export const IconBilling = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="6" width="18" height="13" rx="2" />
    <path d="M3 10h18" />
    <path d="M7 15h3" />
  </svg>
);

export const IconPlayground = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M14 4 4 14l6 6 10-10z" />
    <path d="m11 7 6 6" />
  </svg>
);

export const IconNodeRewards = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="9" r="5" />
    <path d="M8 13.5 6 21l6-3 6 3-2-7.5" />
  </svg>
);

export const IconSettings = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
  </svg>
);

export const IconDocs = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M8 13h8" />
    <path d="M8 17h6" />
  </svg>
);

export const IconUser = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
  </svg>
);

export const IconPlus = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconCopy = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V5a2 2 0 0 1 2-2h10" />
  </svg>
);

export const IconCheck = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m5 12 5 5L20 7" />
  </svg>
);

export const IconMore = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="5" cy="12" r="1.4" />
    <circle cx="12" cy="12" r="1.4" />
    <circle cx="19" cy="12" r="1.4" />
  </svg>
);

export const IconChat = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M21 11.5a8.4 8.4 0 0 1-8.4 8.4 8.6 8.6 0 0 1-3.9-.9L3 21l1.9-5.7a8.4 8.4 0 1 1 16.1-3.8z" />
  </svg>
);

export const IconSearch = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export const IconUpload = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="M17 8 12 3 7 8" />
    <path d="M12 3v12" />
  </svg>
);

export const IconArrowUp = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 19V5" />
    <path d="m5 12 7-7 7 7" />
  </svg>
);

export const IconSend = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M22 2 11 13" />
    <path d="m22 2-7 20-4-9-9-4z" />
  </svg>
);

export const IconSidebar = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M9 4v16" />
  </svg>
);
