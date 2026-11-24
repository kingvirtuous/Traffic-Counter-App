import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { BorderRadius, Colors, Spacing, Typography, VEHICLE_CATEGORIES } from '@/src/constants';
import { VehicleSplit } from '@/src/types';

interface ModalSplitDonutChartProps {
  data: VehicleSplit[];
  totalFleet: number;
}

export function ModalSplitDonutChart({
  data,
  totalFleet,
}: ModalSplitDonutChartProps) {
  const size = 176;
  const strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  let cumulativePercent = 0;

  return (
    <View style={styles.wrapper}>
      <View style={styles.chartWrap}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <G rotation="-90" origin={`${center}, ${center}`}>
            {data.map((item) => {
              const cfg = VEHICLE_CATEGORIES.find((c) => c.key === item.category);
              const color = cfg?.color ?? Colors.primary;
              const dashLength = (item.percentage / 100) * circumference;
              const dashOffset = -(cumulativePercent / 100) * circumference;
              cumulativePercent += item.percentage;

              return (
                <Circle
                  key={item.category}
                  cx={center}
                  cy={center}
                  r={radius}
                  stroke={color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${dashLength} ${circumference}`}
                  strokeDashoffset={dashOffset}
                  fill="transparent"
                />
              );
            })}
          </G>
        </Svg>
        <View style={styles.centerOverlay}>
          <Text style={styles.centerTotal}>{totalFleet.toLocaleString()}</Text>
          <Text style={styles.centerLabel}>TOTAL FLEET</Text>
        </View>
      </View>

      <View style={styles.legendGrid}>
        {data.map((item) => {
          const cfg = VEHICLE_CATEGORIES.find((c) => c.key === item.category);
          return (
            <View
              key={item.category}
              style={[
                styles.legendCard,
                { backgroundColor: cfg?.tintColor ?? Colors.subtleSurface },
              ]}>
              <View style={styles.legendTop}>
                <View
                  style={[
                    styles.legendDot,
                    { backgroundColor: cfg?.color ?? Colors.primary },
                  ]}
                />
                <Text
                  style={[
                    styles.legendName,
                    { color: cfg?.color ?? Colors.textPrimary },
                  ]}>
                  {cfg?.shortLabel ?? item.category}
                </Text>
                <Text
                  style={[
                    styles.legendPct,
                    { color: cfg?.color ?? Colors.textPrimary },
                  ]}>
                  {item.percentage.toFixed(1)}%
                </Text>
              </View>
              <Text style={styles.legendCount}>{item.count.toLocaleString()}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    gap: Spacing.md,
  },
  chartWrap: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerOverlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerTotal: {
    ...Typography.headlineMd,
    fontFamily: Typography.counterLg.fontFamily,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  centerLabel: {
    ...Typography.labelMd,
    fontSize: 10,
    letterSpacing: 0.7,
    color: Colors.textSecondary,
  },
  legendGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  legendCard: {
    width: '48.5%',
    borderRadius: BorderRadius.lg,
    padding: 10,
    gap: 4,
  },
  legendTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: BorderRadius.full,
  },
  legendName: {
    ...Typography.labelMd,
    fontWeight: '700',
    flex: 1,
  },
  legendPct: {
    ...Typography.labelMd,
    fontWeight: '700',
  },
  legendCount: {
    ...Typography.bodyMd,
    fontFamily: Typography.counterMd.fontFamily,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
});
