import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  BorderRadius,
  Colors,
  Elevation,
  Spacing,
  Typography,
  VehicleCategoryConfig,
} from '@/src/constants';

interface ClassificationCardProps {
  config: VehicleCategoryConfig;
  count: number;
  percentage: number;
  onPress?: () => void;
}

export function ClassificationCard({
  config,
  count,
  percentage,
  onPress,
}: ClassificationCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && onPress && styles.pressed,
      ]}>
      <View style={styles.topRow}>
        <View style={[styles.iconWrap, { backgroundColor: config.tintColor }]}>
          <MaterialCommunityIcons
            name={config.icon as keyof typeof MaterialCommunityIcons.glyphMap}
            size={20}
            color={config.color}
          />
        </View>
        <View style={[styles.pctPill, { backgroundColor: config.tintColor }]}>
          <Text style={[styles.pctText, { color: config.color }]}>
            {percentage.toFixed(1)}%
          </Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.label} numberOfLines={1}>
          {config.label}
        </Text>
        <Text style={styles.count}>{count.toLocaleString()}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.borders,
    justifyContent: 'space-between',
    gap: 12,
    ...Elevation.level1,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pctPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
  },
  pctText: {
    ...Typography.labelMd,
    fontWeight: '700',
  },
  bottom: {
    gap: 2,
  },
  label: {
    ...Typography.bodySm,
    color: Colors.textSecondary,
  },
  count: {
    ...Typography.counterMd,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
});
