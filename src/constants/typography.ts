/**
 * Traffic Count — Design System Typography Tokens
 * Source: Stitch design export
 *
 * Fonts: Inter (headlines, body), JetBrains Mono (counters)
 * We use system fonts for now; custom fonts loaded via expo-font later.
 */

import { TextStyle, Platform } from 'react-native';

const interFamily = Platform.select({
  android: 'Inter_400Regular',
  default: 'Inter',
});

const interMedium = Platform.select({
  android: 'Inter_500Medium',
  default: 'Inter',
});

const interSemiBold = Platform.select({
  android: 'Inter_600SemiBold',
  default: 'Inter',
});

const interBold = Platform.select({
  android: 'Inter_700Bold',
  default: 'Inter',
});

const monoSemiBold = Platform.select({
  android: 'JetBrainsMono_600SemiBold',
  default: 'JetBrains Mono',
});

const monoBold = Platform.select({
  android: 'JetBrainsMono_700Bold',
  default: 'JetBrains Mono',
});

export const Typography: Record<string, TextStyle> = {
  headlineLg: {
    fontFamily: interBold,
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700',
  },
  headlineMd: {
    fontFamily: interSemiBold,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '600',
  },
  headlineSm: {
    fontFamily: interSemiBold,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
  },
  bodyLg: {
    fontFamily: interFamily,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  bodyMd: {
    fontFamily: interFamily,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  bodySm: {
    fontFamily: interFamily,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
  },
  counterLg: {
    fontFamily: monoBold,
    fontSize: 36,
    lineHeight: 40,
    fontWeight: '700',
  },
  counterMd: {
    fontFamily: monoSemiBold,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '600',
  },
  labelMd: {
    fontFamily: interMedium,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
} as const;

export type TypographyKey = keyof typeof Typography;
