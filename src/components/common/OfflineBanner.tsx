import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BorderRadius, Colors, Spacing, Typography } from '@/src/constants';

interface OfflineBannerProps {
  message?: string;
  showSampleTag?: boolean;
}

export function OfflineBanner({
  message = 'SQLite Local • 100% Offline Mode (Zero Data Loss)',
  showSampleTag = false,
}: OfflineBannerProps) {
  return (
    <View style={styles.container}>
      <View style={styles.pill}>
        <View style={styles.dot} />
        <Text style={styles.text}>{message}</Text>
      </View>
      {showSampleTag ? (
        <View style={styles.samplePill}>
          <MaterialCommunityIcons
            name="flask-outline"
            size={13}
            color={Colors.vehicleMoto}
          />
          <Text style={styles.sampleText}>Sample Data (Phase 1 UI Preview)</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: Colors.vehicleCarTint,
    paddingHorizontal: Spacing.sm + 4,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.vehicleCar,
  },
  text: {
    ...Typography.labelMd,
    color: Colors.vehicleCar,
    fontWeight: '600',
  },
  samplePill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: Colors.vehicleMotoTint,
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    gap: 5,
  },
  sampleText: {
    ...Typography.labelMd,
    color: Colors.vehicleMoto,
    fontWeight: '600',
  },
});
