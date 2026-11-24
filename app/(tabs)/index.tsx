import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  AppHeader,
  Badge,
  Button,
  Card,
  ClassificationCard,
  HourlyBarChart,
  OfflineBanner,
  SessionCard,
} from '@/src/components';
import {
  BorderRadius,
  Colors,
  Elevation,
  Spacing,
  Typography,
  VEHICLE_CATEGORIES,
} from '@/src/constants';
import {
  SAMPLE_DASHBOARD,
  SAMPLE_HOURLY_DATA,
  SAMPLE_SESSIONS,
} from '@/src/data/sampleData';

export default function DashboardScreen() {
  const router = useRouter();
  const { classification } = SAMPLE_DASHBOARD;

  const categoryCounts: Record<string, { count: number; percentage: number }> = {
    car: classification.cars,
    motorcycle: classification.motorcycles,
    truck: classification.trucks,
    bus: classification.buses,
  };

  return (
    <View style={styles.screen}>
      <AppHeader
        title="Traffic Count"
        subtitle="Survey Dashboard"
        stationId={SAMPLE_DASHBOARD.stationId}
        isOnline={SAMPLE_DASHBOARD.isOnline}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Card style={styles.stationCard}>
          <View style={styles.stationTop}>
            <View style={styles.stationTitleWrap}>
              <View style={styles.stationNameRow}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={18}
                  color={Colors.primaryDark}
                />
                <Text style={styles.stationName} numberOfLines={1}>
                  {SAMPLE_DASHBOARD.locationName}
                </Text>
              </View>
              <Text style={styles.corridorText}>{SAMPLE_DASHBOARD.corridor}</Text>
            </View>
            <Badge label="Active Shift" variant="secondary" />
          </View>

          <OfflineBanner showSampleTag />

          <View style={styles.shiftPill}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={14}
              color={Colors.textMuted}
            />
            <Text style={styles.shiftText}>
              {SAMPLE_DASHBOARD.shiftStart} – {SAMPLE_DASHBOARD.shiftEnd} (In
              Progress • {SAMPLE_DASHBOARD.shiftElapsed} elapsed)
            </Text>
          </View>
        </Card>

        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View style={styles.heroLabelRow}>
              <MaterialCommunityIcons
                name="traffic-light"
                size={18}
                color={Colors.primaryFixed}
              />
              <Text style={styles.heroLabel}>TOTAL VEHICLES COUNTED TODAY</Text>
            </View>
            <View style={styles.activeFeedBadge}>
              <View style={styles.activeDot} />
              <Text style={styles.activeFeedText}>Active Feed</Text>
            </View>
          </View>

          <View style={styles.heroMetricRow}>
            <Text style={styles.heroValue}>
              {SAMPLE_DASHBOARD.todayTotal.toLocaleString()}
            </Text>
            <Text style={styles.heroUnit}>vehicles</Text>
          </View>

          <View style={styles.heroStatsGrid}>
            <View style={styles.heroStatBox}>
              <Text style={styles.heroStatLabel}>Live Flow Rate</Text>
              <View style={styles.heroStatValRow}>
                <Text style={styles.heroStatVal}>
                  {SAMPLE_DASHBOARD.liveFlowRate}
                </Text>
                <Text style={styles.heroStatUnit}>veh/hr</Text>
              </View>
            </View>
            <View style={styles.heroStatBox}>
              <Text style={styles.heroStatLabel}>Peak Variance</Text>
              <View style={styles.heroStatValRow}>
                <MaterialCommunityIcons
                  name="trending-up"
                  size={17}
                  color={Colors.vehicleCarTint}
                />
                <Text style={[styles.heroStatVal, { color: Colors.vehicleCarTint }]}>
                  +{SAMPLE_DASHBOARD.peakVariance}%
                </Text>
                <Text style={styles.heroStatUnit}>vs yest.</Text>
              </View>
            </View>
          </View>

          <View style={styles.heroFooter}>
            <View style={styles.heroFooterLeft}>
              <MaterialCommunityIcons
                name="history"
                size={14}
                color={Colors.primaryFixed}
              />
              <Text style={styles.heroFooterText}>
                Last vehicle recorded {SAMPLE_DASHBOARD.lastVehicleAgo} ago
              </Text>
            </View>
            <Text style={styles.heroSyncId}>
              Sync ID: {SAMPLE_DASHBOARD.syncId}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Classification Split</Text>
            <Text style={styles.sectionMeta}>4 Categories</Text>
          </View>
          <View style={styles.gridRow}>
            {VEHICLE_CATEGORIES.slice(0, 2).map((cat) => (
              <ClassificationCard
                key={cat.key}
                config={cat}
                count={categoryCounts[cat.key].count}
                percentage={categoryCounts[cat.key].percentage}
                onPress={() => router.push('/(tabs)/analytics')}
              />
            ))}
          </View>
          <View style={styles.gridRow}>
            {VEHICLE_CATEGORIES.slice(2, 4).map((cat) => (
              <ClassificationCard
                key={cat.key}
                config={cat}
                count={categoryCounts[cat.key].count}
                percentage={categoryCounts[cat.key].percentage}
                onPress={() => router.push('/(tabs)/analytics')}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Card style={styles.launcherCard}>
            <View style={styles.launcherTop}>
              <View style={[styles.launcherIcon, { backgroundColor: Colors.primaryFixed }]}>
                <MaterialCommunityIcons
                  name="video"
                  size={24}
                  color={Colors.primaryDark}
                />
                <View style={styles.liveDot} />
              </View>
              <View style={styles.launcherInfo}>
                <Text style={styles.launcherTitle}>Start Live Counting</Text>
                <Text style={styles.launcherDesc}>
                  Real-time AI camera detection & virtual line tripwire telemetry
                </Text>
              </View>
            </View>
            <Button
              title="Launch Camera HUD"
              onPress={() => router.push('/counting/live')}
              leftIcon={
                <MaterialCommunityIcons
                  name="video"
                  size={18}
                  color={Colors.onPrimary}
                />
              }
              rightIcon={
                <MaterialCommunityIcons
                  name="arrow-right"
                  size={18}
                  color={Colors.onPrimary}
                />
              }
            />
          </Card>

          <Card style={styles.launcherCard}>
            <View style={styles.launcherTop}>
              <View
                style={[
                  styles.launcherIcon,
                  { backgroundColor: Colors.secondaryContainer },
                ]}>
                <MaterialCommunityIcons
                  name="file-video"
                  size={24}
                  color={Colors.onSecondaryContainer}
                />
              </View>
              <View style={styles.launcherInfo}>
                <Text style={styles.launcherTitle}>Import Recorded Video</Text>
                <Text style={styles.launcherDesc}>
                  Batch process MP4 / MOV video files with automated tally &
                  validation
                </Text>
              </View>
            </View>
            <Button
              title="Select Video File"
              variant="subtle"
              onPress={() => router.push('/counting/video')}
              leftIcon={
                <MaterialCommunityIcons
                  name="upload"
                  size={18}
                  color={Colors.textSecondary}
                />
              }
              rightIcon={
                <MaterialCommunityIcons
                  name="plus"
                  size={18}
                  color={Colors.textMuted}
                />
              }
            />
          </Card>
        </View>

        <Card style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={styles.sectionTitle}>Hourly Volume Distribution</Text>
              <Text style={styles.chartSub}>Window: 07:00 – 12:00</Text>
            </View>
            <Badge label="Peak: 428 veh" variant="motorcycle" />
          </View>

          <HourlyBarChart data={SAMPLE_HOURLY_DATA} />

          <View style={styles.chartLegend}>
            <View style={styles.legendItems}>
              <View style={styles.legendItem}>
                <View
                  style={[styles.legendSwatch, { backgroundColor: Colors.primaryDark }]}
                />
                <Text style={styles.legendText}>Full Hour</Text>
              </View>
              <View style={styles.legendItem}>
                <View
                  style={[
                    styles.legendSwatch,
                    { backgroundColor: Colors.primaryFixedDim },
                  ]}
                />
                <Text style={styles.legendText}>*Current Hour (In-flight)</Text>
              </View>
            </View>
            <Text style={styles.legendTotal}>
              Total: {SAMPLE_DASHBOARD.todayTotal.toLocaleString()}
            </Text>
          </View>
        </Card>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Survey Sessions</Text>
            <Pressable
              onPress={() => router.push('/(tabs)/sessions')}
              style={styles.viewAllBtn}>
              <Text style={styles.viewAllText}>View All</Text>
              <MaterialCommunityIcons
                name="chevron-right"
                size={16}
                color={Colors.primaryDark}
              />
            </Pressable>
          </View>

          {SAMPLE_SESSIONS.slice(0, 2).map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              compact
              onPress={() => router.push(`/sessions/${session.id}`)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.backgroundCanvas },
  scroll: { flex: 1 },
  content: { padding: Spacing.margin, gap: Spacing.md, paddingBottom: Spacing.xl },
  stationCard: { gap: 10 },
  stationTop: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 },
  stationTitleWrap: { flex: 1, gap: 2 },
  stationNameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  stationName: { ...Typography.headlineSm, color: Colors.textPrimary, flexShrink: 1 },
  corridorText: { ...Typography.bodySm, color: Colors.textSecondary, paddingLeft: 24 },
  shiftPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: Colors.subtleSurface,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
    gap: 6,
  },
  shiftText: { ...Typography.labelMd, color: Colors.textSecondary },
  heroCard: {
    backgroundColor: Colors.primaryDark,
    borderRadius: BorderRadius.xl,
    padding: 18,
    gap: 14,
    ...Elevation.level2,
  },
  heroTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  heroLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  heroLabel: { ...Typography.labelMd, color: Colors.primaryFixed, fontWeight: '700', letterSpacing: 0.6 },
  activeFeedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.16)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
  },
  activeDot: { width: 6, height: 6, borderRadius: BorderRadius.full, backgroundColor: Colors.statusSuccess },
  activeFeedText: { ...Typography.labelMd, fontSize: 11, color: Colors.onPrimary },
  heroMetricRow: { flexDirection: 'row', alignItems: 'baseline', gap: 10 },
  heroValue: { ...Typography.counterLg, color: Colors.onPrimary },
  heroUnit: { ...Typography.bodyMd, color: Colors.primaryFixed },
  heroStatsGrid: { flexDirection: 'row', gap: 8 },
  heroStatBox: { flex: 1, backgroundColor: 'rgba(0,0,0,0.18)', borderRadius: BorderRadius.lg, padding: 10, gap: 2 },
  heroStatLabel: { ...Typography.labelMd, color: Colors.primaryFixed },
  heroStatValRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4 },
  heroStatVal: { ...Typography.counterMd, color: Colors.onPrimary, fontWeight: '700' },
  heroStatUnit: { ...Typography.bodySm, color: Colors.primaryFixed },
  heroFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  heroFooterLeft: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  heroFooterText: { ...Typography.labelMd, color: Colors.primaryFixed },
  heroSyncId: { ...Typography.labelMd, color: 'rgba(255,255,255,0.8)' },
  section: { gap: Spacing.sm },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 2 },
  sectionTitle: { ...Typography.headlineSm, color: Colors.textPrimary },
  sectionMeta: { ...Typography.labelMd, color: Colors.textSecondary },
  gridRow: { flexDirection: 'row', gap: Spacing.sm },
  launcherCard: { gap: 12 },
  launcherTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  launcherIcon: { width: 48, height: 48, borderRadius: BorderRadius.xl, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  liveDot: { position: 'absolute', top: 4, right: 4, width: 9, height: 9, borderRadius: BorderRadius.full, backgroundColor: Colors.statusError, borderWidth: 1.5, borderColor: Colors.surface },
  launcherInfo: { flex: 1, gap: 2 },
  launcherTitle: { ...Typography.headlineSm, color: Colors.textPrimary },
  launcherDesc: { ...Typography.bodySm, color: Colors.textSecondary },
  chartCard: { gap: 12 },
  chartHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  chartSub: { ...Typography.labelMd, color: Colors.textSecondary, marginTop: 2 },
  chartLegend: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: Colors.subtleSurface, paddingHorizontal: 12, paddingVertical: 8, borderRadius: BorderRadius.lg },
  legendItems: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  legendSwatch: { width: 10, height: 10, borderRadius: 3 },
  legendText: { ...Typography.labelMd, fontSize: 11, color: Colors.textSecondary },
  legendTotal: { ...Typography.labelMd, color: Colors.textPrimary, fontWeight: '700' },
  viewAllBtn: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  viewAllText: { ...Typography.labelMd, color: Colors.primaryDark, fontWeight: '700' },
});
