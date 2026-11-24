import React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { BorderRadius, Colors, Spacing, Typography } from '@/src/constants';

export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'offline'
  | 'subtle'
  | 'car'
  | 'motorcycle'
  | 'bus'
  | 'truck';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  dotColor?: string;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const VARIANT_COLORS: Record<BadgeVariant, { bg: string; text: string }> = {
  primary: { bg: Colors.primaryFixed, text: Colors.onPrimaryFixed },
  secondary: { bg: Colors.secondaryContainer, text: Colors.onSecondaryContainer },
  success: { bg: Colors.vehicleCarTint, text: Colors.vehicleCar },
  warning: { bg: Colors.vehicleMotoTint, text: Colors.vehicleMoto },
  error: { bg: Colors.vehicleTruckTint, text: Colors.vehicleTruck },
  offline: { bg: Colors.subtleSurface, text: Colors.statusOffline },
  subtle: { bg: Colors.subtleSurface, text: Colors.textSecondary },
  car: { bg: Colors.vehicleCarTint, text: Colors.vehicleCar },
  motorcycle: { bg: Colors.vehicleMotoTint, text: Colors.vehicleMoto },
  bus: { bg: Colors.vehicleBusTint, text: Colors.vehicleBus },
  truck: { bg: Colors.vehicleTruckTint, text: Colors.vehicleTruck },
};

export function Badge({
  label,
  variant = 'subtle',
  dotColor,
  icon,
  style,
  textStyle,
}: BadgeProps) {
  const palette = VARIANT_COLORS[variant];

  return (
    <View style={[styles.badge, { backgroundColor: palette.bg }, style]}>
      {dotColor ? <View style={[styles.dot, { backgroundColor: dotColor }]} /> : null}
      {icon ? <View style={styles.iconWrap}>{icon}</View> : null}
      <Text style={[styles.text, { color: palette.text }, textStyle]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    gap: 5,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: BorderRadius.full,
  },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...Typography.labelMd,
    fontWeight: '600',
  },
});
