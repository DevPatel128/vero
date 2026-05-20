// ─────────────────────────────────────────────────────────
// RIE Design System — "Black & Gold"
// Luxury through restraint. Every token is intentional.
// ─────────────────────────────────────────────────────────

export const colors = {
  // Backgrounds
  bgPrimary: '#050508',
  bgSurface: '#0A0A0C',
  bgElevated: '#111113',

  // Glass
  glassBg: 'rgba(255, 255, 255, 0.03)',
  glassBorder: 'rgba(255, 255, 255, 0.05)',
  glassBlur: 'blur(40px) saturate(120%)',
  glassHoverBg: 'rgba(255, 255, 255, 0.05)',

  // Accent — Champagne Gold
  accentGold: '#C9A55A',
  accentGoldMuted: '#8B7340',
  accentGoldSubtle: 'rgba(201, 165, 90, 0.06)',
  accentGoldGlow: 'rgba(201, 165, 90, 0.15)',

  // Semantic
  accentSuccess: '#34C759',
  accentSuccessMuted: 'rgba(52, 199, 89, 0.12)',
  accentDanger: '#FF453A',
  accentDangerMuted: 'rgba(255, 69, 58, 0.12)',
  accentInfo: '#60A5FA',
  accentInfoMuted: 'rgba(96, 165, 250, 0.12)',
  accentLavender: '#A78BFA',
  accentLavenderMuted: 'rgba(167, 139, 250, 0.12)',

  // Tier colors
  tierBronze: '#CD7F32',
  tierSilver: '#C0C0C0',
  tierGold: '#C9A55A',
  tierPlatinum: '#E5E4E2',
  tierDiamond: '#B9F2FF',
  tierMaster: '#FFD700',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#8A8A8E',
  textTertiary: '#48484A',
  textGold: '#C9A55A',

  // Separators
  separator: 'rgba(255, 255, 255, 0.05)',
  separatorStrong: 'rgba(255, 255, 255, 0.08)',
} as const;

export const typography = {
  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    cjk: "'Noto Sans SC', 'Noto Sans JP', sans-serif",
    devanagari: "'Noto Sans Devanagari', sans-serif",
    bengali: "'Noto Sans Bengali', sans-serif",
    arabic: "'Noto Sans Arabic', sans-serif",
    cyrillic: "'Inter', sans-serif",
    mono: "'SF Mono', 'Fira Code', monospace",
  },
  fontSize: {
    xs: '10px',
    sm: '12px',
    base: '14px',
    md: '16px',
    lg: '20px',
    xl: '24px',
    '2xl': '28px',
    '3xl': '32px',
    '4xl': '40px',
    '5xl': '48px',
    '6xl': '64px',
    score: '64px',
  },
  fontWeight: {
    thin: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.04em',
    tracking: '0.12em',
  },
  lineHeight: {
    tight: '1.1',
    normal: '1.4',
    relaxed: '1.6',
  },
} as const;

export const spacing = {
  '0': '0px',
  '1': '4px',
  '2': '8px',
  '3': '12px',
  '4': '16px',
  '5': '20px',
  '6': '24px',
  '7': '28px',
  '8': '32px',
  '10': '40px',
  '12': '48px',
  '16': '64px',
  '20': '80px',
  '24': '96px',
} as const;

export const borderRadius = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '28px',
  full: '9999px',
} as const;

export const shadows = {
  none: 'none',
  subtle: '0 1px 2px rgba(0, 0, 0, 0.3)',
  glass: '0 4px 24px rgba(0, 0, 0, 0.2)',
  elevated: '0 8px 32px rgba(0, 0, 0, 0.4)',
  goldGlow: '0 0 40px rgba(201, 165, 90, 0.15)',
  goldGlowStrong: '0 0 60px rgba(201, 165, 90, 0.25)',
  successGlow: '0 0 20px rgba(52, 199, 89, 0.2)',
} as const;

export const animation = {
  duration: {
    instant: '100ms',
    fast: '200ms',
    normal: '300ms',
    slow: '500ms',
    glacial: '800ms',
  },
  easing: {
    default: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  },
} as const;

export const glass = {
  card: {
    background: colors.glassBg,
    border: `1px solid ${colors.glassBorder}`,
    backdropFilter: colors.glassBlur,
    borderRadius: borderRadius.xl,
  },
  nav: {
    background: colors.glassBg,
    border: `1px solid ${colors.glassBorder}`,
    backdropFilter: 'blur(40px) saturate(150%)',
    borderRadius: borderRadius['2xl'],
  },
  input: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: `1px solid ${colors.glassBorder}`,
    backdropFilter: 'blur(20px)',
    borderRadius: borderRadius.md,
  },
} as const;

export const zIndex = {
  base: 0,
  card: 10,
  dropdown: 100,
  sticky: 200,
  modal: 300,
  toast: 400,
  nav: 500,
} as const;

// ── CSS Variable Map ────────────────────────────────────
// Maps each design token to its CSS custom property name.
// Used in globals.css :root declarations.

export const cssVariables = {
  // Backgrounds
  bgPrimary: '--bg-primary',
  bgSurface: '--bg-surface',
  bgElevated: '--bg-elevated',

  // Glass
  glassBg: '--glass-bg',
  glassBorder: '--glass-border',
  glassBorderHover: '--glass-border-hover',
  glassBlur: '--glass-blur',

  // Accent — Champagne Gold
  accentGold: '--accent-gold',
  accentGoldMuted: '--accent-gold-muted',
  accentGoldSubtle: '--accent-gold-subtle',
  accentGoldGlow: '--accent-gold-glow',

  // Semantic
  accentSuccess: '--accent-success',
  accentSuccessMuted: '--accent-success-muted',
  accentDanger: '--accent-danger',
  accentDangerMuted: '--accent-danger-muted',
  accentInfo: '--accent-info',
  accentInfoMuted: '--accent-info-muted',
  accentLavender: '--accent-lavender',
  accentLavenderMuted: '--accent-lavender-muted',

  // Tier Colors
  tierBronze: '--tier-bronze',
  tierSilver: '--tier-silver',
  tierGold: '--tier-gold',
  tierPlatinum: '--tier-platinum',
  tierDiamond: '--tier-diamond',
  tierMaster: '--tier-master',

  // Text
  textPrimary: '--text-primary',
  textSecondary: '--text-secondary',
  textTertiary: '--text-tertiary',
  textGold: '--text-gold',

  // Separators
  separator: '--separator',
  separatorStrong: '--separator-strong',

  // Typography
  fontPrimary: '--font-primary',
  fontMono: '--font-mono',

  // Spacing
  space1: '--space-1',
  space2: '--space-2',
  space3: '--space-3',
  space4: '--space-4',
  space5: '--space-5',
  space6: '--space-6',
  space8: '--space-8',
  space10: '--space-10',
  space12: '--space-12',
  space16: '--space-16',

  // Border Radius
  radiusSm: '--radius-sm',
  radiusMd: '--radius-md',
  radiusLg: '--radius-lg',
  radiusXl: '--radius-xl',
  radius2xl: '--radius-2xl',
  radiusFull: '--radius-full',

  // Shadows
  shadowGlass: '--shadow-glass',
  shadowElevated: '--shadow-elevated',
  shadowGoldGlow: '--shadow-gold-glow',

  // Animation
  easeDefault: '--ease-default',
  easeSpring: '--ease-spring',
  easeOut: '--ease-out',
  durationFast: '--duration-fast',
  durationNormal: '--duration-normal',
  durationSlow: '--duration-slow',
} as const;
