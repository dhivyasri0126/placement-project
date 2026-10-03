/**
 * CareerPilot Design System Tokens - TypeScript Definitions
 * Version 1.0 (WCAG 2.2 AA Compliant)
 * Source of Truth: docs/ui/design-tokens.png
 */

export const colors = {
  primary: {
    50: '#EEF4FF',
    100: '#D9E6FF',
    500: '#2563EB',
    600: '#1D4ED8',
    700: '#1E40AF',
  },
  secondary: {
    50: '#F1F5F9',
    100: '#E2E8F0',
    500: '#475569',
    600: '#334155',
    700: '#1E293B',
  },
  success: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    500: '#10B981',
    600: '#059669',
    700: '#047857',
  },
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
  },
  danger: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
  },
  neutral: {
    50: '#FAFAFA',
    100: '#F4F4F5',
    200: '#E4E4E7',
    300: '#D4D4D8',
    400: '#A1A1AA',
    500: '#71717A',
    600: '#52525B',
    700: '#3F3F46',
    800: '#27272A',
    900: '#18181B',
  },
} as const;

export const surfaces = {
  appBg: '#F8FAFC',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  sidebar: '#F1F5F9',
  hover: '#E2E8F0',
  divider: '#E5E7EB',
} as const;

export const typography = {
  fontFamily: {
    sans: 'Inter, system-ui, sans-serif',
    mono: 'JetBrains Mono, monospace',
    fallback: 'ui-sans-serif, system-ui',
  },
  scale: {
    display: { size: '56px', weight: 700, lineHeight: '64px' },
    h1: { size: '40px', weight: 700, lineHeight: '48px' },
    h2: { size: '32px', weight: 700, lineHeight: '40px' },
    h3: { size: '24px', weight: 600, lineHeight: '32px' },
    h4: { size: '20px', weight: 600, lineHeight: '28px' },
    h5: { size: '18px', weight: 600, lineHeight: '26px' },
    bodyLg: { size: '16px', weight: 500, lineHeight: '24px' },
    bodyMd: { size: '14px', weight: 500, lineHeight: '20px' },
    bodySm: { size: '12px', weight: 500, lineHeight: '18px' },
    caption: { size: '12px', weight: 400, lineHeight: '16px' },
    overline: { size: '11px', weight: 500, lineHeight: '16px' },
  },
} as const;

export const spacing = {
  4: '4px',
  8: '8px',
  12: '12px',
  16: '16px',
  24: '24px',
  32: '32px',
  48: '48px',
  64: '64px',
  96: '96px',
} as const;

export const borderRadius = {
  none: '0px',
  xs: '2px',
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  '3xl': '24px',
  full: '999px',
} as const;

export const shadows = {
  none: 'none',
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px rgba(0, 0, 0, 0.07)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px rgba(0, 0, 0, 0.15)',
} as const;

export const charts = {
  chart1: '#2563EB',
  chart2: '#0EA5E9',
  chart3: '#10B981',
  chart4: '#F59E0B',
  chart5: '#64748B',
  chart6: '#94A3B8',
} as const;

export const buttons = {
  primary: {
    default: colors.primary[500],
    hover: colors.primary[600],
    active: colors.primary[700],
    disabled: colors.primary[100],
  },
  secondary: {
    default: colors.secondary[500],
    hover: colors.secondary[600],
    active: colors.secondary[700],
    disabled: colors.secondary[100],
  },
  success: {
    default: colors.success[500],
    hover: colors.success[600],
    active: colors.success[700],
    disabled: colors.success[100],
  },
  warning: {
    default: colors.warning[500],
    hover: colors.warning[600],
    active: colors.warning[700],
    disabled: colors.warning[100],
  },
  danger: {
    default: colors.danger[500],
    hover: colors.danger[600],
    active: colors.danger[700],
    disabled: colors.danger[100],
  },
} as const;

export const badges = {
  primary: { bg: colors.primary[100], text: colors.primary[700] },
  secondary: { bg: colors.secondary[100], text: colors.secondary[700] },
  success: { bg: colors.success[100], text: colors.success[700] },
  warning: { bg: colors.warning[100], text: colors.warning[700] },
  danger: { bg: colors.danger[100], text: colors.danger[700] },
} as const;

export const tokens = {
  colors,
  surfaces,
  typography,
  spacing,
  borderRadius,
  shadows,
  charts,
  buttons,
  badges,
} as const;

export type Tokens = typeof tokens;
export default tokens;
