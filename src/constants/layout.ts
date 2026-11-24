/**
 * Traffic Count — Design System Spacing & Layout Tokens
 * Source: Stitch design export
 */

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  gutter: 16,
  margin: 16,
} as const;

export const BorderRadius = {
  sm: 2,
  default: 4,
  md: 6,
  lg: 8,
  xl: 12,
  button: 10,
  full: 999,
} as const;

export const Elevation = {
  level1: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 1,
  },
  level2: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
} as const;

export const Layout = {
  bottomTabHeight: 64,
  headerHeight: 64,
  screenPadding: Spacing.margin,
} as const;
