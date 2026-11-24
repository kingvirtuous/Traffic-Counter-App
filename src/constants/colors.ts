/**
 * Traffic Count — Design System Color Tokens
 * Source of truth: Stitch design export (designs/traffic_count/DESIGN.md)
 */

export const Colors = {
  // Brand
  primary: '#0284C7',
  primaryDark: '#006194',
  primaryContainer: '#007BB9',
  primaryFixed: '#CCE5FF',
  primaryFixedDim: '#93CCFF',
  onPrimary: '#FFFFFF',
  onPrimaryFixed: '#001D31',

  // Secondary
  secondary: '#565E74',
  secondaryContainer: '#DAE2FD',
  onSecondary: '#FFFFFF',
  onSecondaryContainer: '#5C647A',

  // Tertiary
  tertiary: '#894D00',
  tertiaryContainer: '#AC6200',
  onTertiary: '#FFFFFF',

  // Surfaces & Backgrounds
  background: '#F7F9FF',
  backgroundCanvas: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceDim: '#D7DAE0',
  surfaceBright: '#F7F9FF',
  surfaceContainerLowest: '#FFFFFF',
  surfaceContainerLow: '#F1F4FA',
  surfaceContainer: '#EBEEF4',
  surfaceContainerHigh: '#E5E8EE',
  surfaceContainerHighest: '#DFE3E8',
  subtleSurface: '#F1F5F9',
  surfaceVariant: '#DFE3E8',

  // Text
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#94A3B8',
  onSurface: '#181C20',
  onSurfaceVariant: '#3F4850',
  inverseSurface: '#2D3135',
  inverseOnSurface: '#EEF1F7',

  // Borders & Outlines
  borders: '#E2E8F0',
  outline: '#707881',
  outlineVariant: '#BFC7D2',

  // Vehicle Classification
  vehicleCar: '#059669',
  vehicleCarTint: '#D1FAE5',
  vehicleMoto: '#D97706',
  vehicleMotoTint: '#FEF3C7',
  vehicleBus: '#7C3AED',
  vehicleBusTint: '#EDE9FE',
  vehicleTruck: '#DC2626',
  vehicleTruckTint: '#FEE2E2',

  // Status & Feedback
  statusSuccess: '#10B981',
  statusWarning: '#F59E0B',
  statusError: '#EF4444',
  statusOffline: '#64748B',

  // Error
  error: '#BA1A1A',
  errorContainer: '#FFDAD6',
  onError: '#FFFFFF',
  onErrorContainer: '#93000A',
} as const;

export type ColorKey = keyof typeof Colors;
