import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BorderRadius, Colors, Elevation, Spacing, Typography } from '@/src/constants';
import { TrafficSession } from '@/src/types';
import { Badge } from '../common/Badge';

interface SessionCardProps {
  session: TrafficSession;
  onPress: () => void;
  compact?: boolean;
}

function formatTimeRange(session: TrafficSession): string {
  const date = new Date(session.startTime);
  const dateStr = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const start = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const end = session.endTime
    ? new Date(session.endTime).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
    : 'Now';
  const hrs = (session.durationMinutes / 60).toFixed(1);
  return `${dateStr} • ${start} – ${end} (${hrs}h)`;
}

export function SessionCard({ session, onPress, compact = false }: SessionCardProps) {
  const isLive = session.source === 'live_camera';
  const isInProgress = session.status === 'in_progress';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.body}>
        <View style={styles.headerRow}>
          <View style={styles.titleWrap}>
            <Text style={styles.title} numberOfLines={1}>
              {session.locationName}
            </Text>
            <Text style={styles.timeText} numberOfLines={1}>
              {formatTimeRange(session)}
            </Text>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color={Colors.textMuted}
          />
        </View>

        <View style={styles.badgesRow}>
          <Badge
            label={isLive ? 'Live Camera' : 'Video Import'}
            variant={isLive ? 'car' : 'secondary'}
            icon={
              <MaterialCommunityIcons
                name={isLive ? 'video' : 'file-video'}
                size={13}
                color={isLive ? Colors.vehicleCar : Colors.onSecondaryContainer}
              />
            }
          />
          <Badge
            label={
              isInProgress
                ? 'In Progress • Logging'
                : session.status === 'verified'
                  ? 'Completed • Verified'
                  : 'Completed'
            }
            variant={isInProgress ? 'success' : 'subtle'}
            dotColor={isInProgress ? Colors.statusSuccess : undefined}
          />
        </View>

        {!compact ? (
          <View style={styles.telemetryBox}>
            <View style={styles.telemetryHeader}>
              <Text style={styles.telemetryLabel}>
                {isInProgress ? 'TELEMETRY TOTAL' : 'FINAL BATCH'}
              </Text>
              <Text style={styles.telemetryUnit}>vehicles counted</Text>
            </View>
            <Text style={styles.telemetryValue}>
              {session.totalVehicles.toLocaleString()}
            </Text>

            <View style={styles.miniGrid}>
              <MiniStat
                label="Cars"
                value={session.cars}
                color={Colors.vehicleCar}
                tint={Colors.vehicleCarTint}
                icon="car"
              />
              <MiniStat
                label="Bikes"
                value={session.motorcycles}
                color={Colors.vehicleMoto}
                tint={Colors.vehicleMotoTint}
                icon="motorbike"
              />
              <MiniStat
                label="Buses"
                value={session.buses}
                color={Colors.vehicleBus}
                tint={Colors.vehicleBusTint}
                icon="bus"
              />
              <MiniStat
                label="Trucks"
                value={session.trucks}
                color={Colors.vehicleTruck}
                tint={Colors.vehicleTruckTint}
                icon="truck"
              />
            </View>
          </View>
        ) : null}
      </View>

      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          <MaterialCommunityIcons
            name={
              session.syncStatus === 'synced'
                ? 'check-decagram'
                : 'check-circle-outline'
            }
            size={16}
            color={Colors.statusSuccess}
          />
          <Text style={styles.footerText}>
            {session.syncStatus === 'synced'
              ? 'Validated & Synced'
              : 'Saved to Local SQLite'}
          </Text>
        </View>
        <View style={styles.footerCountRow}>
          <Text style={styles.footerCount}>
            {session.totalVehicles.toLocaleString()}
          </Text>
          <Text style={styles.footerUnit}>veh</Text>
        </View>
      </View>
    </Pressable>
  );
}

function MiniStat({
  label,
  value,
  color,
  tint,
  icon,
}: {
  label: string;
  value: number;
  color: string;
  tint: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}) {
  return (
    <View style={[styles.miniStat, { backgroundColor: tint }]}>
      <View style={styles.miniLeft}>
        <MaterialCommunityIcons name={icon} size={14} color={color} />
        <Text style={[styles.miniLabel, { color }]}>{label}</Text>
      </View>
      <Text style={[styles.miniValue, { color }]}>{value.toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.borders,
    overflow: 'hidden',
    ...Elevation.level1,
  },
  pressed: {
    opacity: 0.92,
  },
  body: {
    padding: 14,
    gap: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  titleWrap: {
    flex: 1,
    gap: 2,
  },
  title: {
    ...Typography.bodyMd,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  timeText: {
    ...Typography.bodySm,
    color: Colors.textSecondary,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  telemetryBox: {
    backgroundColor: Colors.subtleSurface,
    borderRadius: BorderRadius.lg,
    padding: 12,
    gap: 8,
  },
  telemetryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  telemetryLabel: {
    ...Typography.labelMd,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
    color: Colors.textSecondary,
  },
  telemetryUnit: {
    ...Typography.bodySm,
    fontSize: 11,
    color: Colors.textMuted,
  },
  telemetryValue: {
    ...Typography.headlineLg,
    fontFamily: Typography.counterLg.fontFamily,
    color: Colors.textPrimary,
  },
  miniGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 2,
  },
  miniStat: {
    width: '48.5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: BorderRadius.lg,
  },
  miniLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  miniLabel: {
    ...Typography.labelMd,
    fontWeight: '600',
  },
  miniValue: {
    ...Typography.bodyMd,
    fontFamily: Typography.counterMd.fontFamily,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.subtleSurface,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.borders,
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerText: {
    ...Typography.labelMd,
    color: Colors.textSecondary,
  },
  footerCountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  footerCount: {
    ...Typography.counterMd,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  footerUnit: {
    ...Typography.bodySm,
    color: Colors.textSecondary,
  },
});
