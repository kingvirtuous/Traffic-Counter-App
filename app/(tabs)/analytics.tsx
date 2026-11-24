import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  AppHeader,
  Badge,
  Button,
  Card,
  CommuteCurveChart,
  ModalSplitDonutChart,
  OfflineBanner,
} from '@/src/components';
import { BorderRadius, Colors, Spacing, Typography } from '@/src/constants';
import {
  SAMPLE_ANALYTICS,
  SAMPLE_COMMUTE_CURVE,
  SAMPLE_CORRIDORS,
  SAMPLE_VEHICLE_SPLIT,
} from '@/src/data/sampleData';
import { DateRange } from '@/src/types';

const DATE_RANGES: { key: DateRange; label: string }[] = [
  { key: '7d', label: '7D' },
  { key: '30d', label: '30D' },
  { key: '90d', label: '90D' },
  { key: 'custom', label: 'Custom' },
];

export default function AnalyticsScreen() {
  const [range, setRange] = useState<DateRange>('7d');

  return (
    <View style={styles.screen}>
      <AppHeader
        title="Transportation Analytics"
        subtitle="Multi-Station Insights"
        stationId="ST-402"
        isOnline
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        {/* Date Range & Sync Header */}
        <View style={styles.rangeTop}>
          <View style={styles.rangeDropdown}>
            <MaterialCommunityIcons
              name="calendar-range"
              size={16}
              color={Colors.primaryDark}
            />
            <Text style={styles.rangeDropdownText}>
              Past 7 Days (Nov 15 – Nov 21)
            </Text>
          </View>
          <Badge
            label="6 Synced"
            variant="success"
            dotColor={Colors.statusSuccess}
          />
        </View>

        <View style={styles.rangeTabsRow}>
          <View style={styles.rangeTabs}>
            {DATE_RANGES.map((item) => {
              const active = range === item.key;
              return (
                <Pressable
                  key={item.key}
                  onPress={() => setRange(item.key)}
                  style={[styles.rangeTab, active && styles.rangeTabActive]}>
                  <Text
                    style={[
                      styles.rangeTabText,
                      active && styles.rangeTabTextActive,
                    ]}>
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <View style={styles.engineLabel}>
            <MaterialCommunityIcons
              name="database-check-outline"
              size={14}
              color={Colors.vehicleCar}
            />
            <Text style={styles.engineText}>SQLite Engine</Text>
          </View>
        </View>

        <OfflineBanner showSampleTag />

        {/* ADT Hero Card */}
        <Card style={styles.adtCard}>
          <View style={styles.adtTop}>
            <Text style={styles.adtLabel}>AVERAGE DAILY TRAFFIC (ADT)</Text>
            <Badge
              label={`+${SAMPLE_ANALYTICS.trendPercentage}%`}
              variant="success"
            />
          </View>
          <View style={styles.adtValueRow}>
            <Text style={styles.adtValue}>
              {SAMPLE_ANALYTICS.averageDailyTraffic.toLocaleString()}
            </Text>
            <Text style={styles.adtUnit}>veh / day</Text>
          </View>
          <Text style={styles.adtSub}>
            Calculated across 168 aggregate survey hours
          </Text>

          <View style={styles.adtGrid}>
            <View style={styles.adtMiniBox}>
              <Text style={styles.adtMiniLabel}>TOTAL VOLUME</Text>
              <Text style={styles.adtMiniVal}>
                {SAMPLE_ANALYTICS.totalVolume.toLocaleString()}
              </Text>
              <Text style={styles.adtMiniSub}>Vehicles verified</Text>
            </View>
            <View style={styles.adtMiniBox}>
              <Text style={styles.adtMiniLabel}>FOOTPRINT</Text>
              <Text style={styles.adtMiniVal}>
                {SAMPLE_ANALYTICS.activeStations}
              </Text>
              <Text style={styles.adtMiniSub}>Active stations</Text>
            </View>
            <View style={styles.adtMiniBox}>
              <Text style={styles.adtMiniLabel}>PEAK LOAD</Text>
              <Text style={[styles.adtMiniVal, { color: Colors.primaryDark }]}>
                {SAMPLE_ANALYTICS.peakLoad.toLocaleString()}
              </Text>
              <Text style={styles.adtMiniSub}>
                veh/hr ({SAMPLE_ANALYTICS.peakLoadDate})
              </Text>
            </View>
          </View>
        </Card>

        {/* Vehicle Modal Split Donut Chart */}
        <Card style={styles.sectionCard}>
          <View>
            <Text style={styles.cardTitle}>Vehicle Modal Split</Text>
            <Text style={styles.cardSub}>
              FHWA 4-Category Multi-Station Aggregate
            </Text>
          </View>
          <ModalSplitDonutChart
            data={SAMPLE_VEHICLE_SPLIT}
            totalFleet={SAMPLE_ANALYTICS.totalVolume}
          />
        </Card>

        {/* Composite Commute Curve */}
        <Card style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <View>
              <Text style={styles.cardTitle}>Composite Commute Curve</Text>
              <Text style={styles.cardSub}>06:00 – 21:00 Hourly Network Load</Text>
            </View>
            <Badge label="Hourly" variant="subtle" />
          </View>

          <View style={styles.peakRow}>
            <View style={styles.peakBox}>
              <Text style={styles.peakBoxLabel}>AM SURGE PEAK</Text>
              <Text style={styles.peakBoxVal}>
                {SAMPLE_COMMUTE_CURVE.amPeak.time}{' '}
                <Text style={{ color: Colors.primaryDark }}>
                  {SAMPLE_COMMUTE_CURVE.amPeak.volume.toLocaleString()} v/h
                </Text>
              </Text>
            </View>
            <View style={styles.peakBox}>
              <Text style={styles.peakBoxLabel}>PM COMMUTE PEAK</Text>
              <Text style={styles.peakBoxVal}>
                {SAMPLE_COMMUTE_CURVE.pmPeak.time}{' '}
                <Text style={{ color: Colors.primaryDark }}>
                  {SAMPLE_COMMUTE_CURVE.pmPeak.volume.toLocaleString()} v/h
                </Text>
              </Text>
            </View>
          </View>

          <CommuteCurveChart data={SAMPLE_COMMUTE_CURVE.hourlyData} />
        </Card>

        {/* Corridor Traffic Share Ranking */}
        <Card style={styles.sectionCard}>
          <View>
            <Text style={styles.cardTitle}>Corridor Traffic Share</Text>
            <Text style={styles.cardSub}>
              Station Volume Ranking (Past 7 Days)
            </Text>
          </View>

          <View style={styles.corridorList}>
            {SAMPLE_CORRIDORS.map((corridor) => (
              <View key={corridor.rank} style={styles.corridorItem}>
                <View style={styles.rankBadge}>
                  <Text style={styles.rankText}>{corridor.rank}</Text>
                </View>
                <View style={styles.corridorInfo}>
                  <View style={styles.corridorTop}>
                    <Text style={styles.corridorName} numberOfLines={1}>
                      {corridor.stationName}
                    </Text>
                    <Text style={styles.corridorVol}>
                      {corridor.totalVehicles.toLocaleString()} veh
                    </Text>
                  </View>
                  <View style={styles.corridorBottom}>
                    <Text style={styles.corridorType}>
                      {corridor.stationType}
                    </Text>
                    <View style={styles.corridorPctPill}>
                      <Text style={styles.corridorPctText}>
                        {corridor.percentage.toFixed(1)}%
                      </Text>
                    </View>
                  </View>
                  <View style={styles.progressTrack}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${corridor.percentage}%` },
                      ]}
                    />
                  </View>
                </View>
              </View>
            ))}
          </View>
        </Card>

        <Button
          title="Export Transportation Study (CSV / PDF)"
          onPress={() =>
            Alert.alert(
              'Phase 1 UI Preview',
              'Multi-station study export will generate real SQLite aggregates in Phase 2.'
            )
          }
          leftIcon={
            <MaterialCommunityIcons
              name="download"
              size={18}
              color={Colors.onPrimary}
            />
          }
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.backgroundCanvas,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: Spacing.margin,
    gap: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  rangeTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  rangeDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.borders,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: BorderRadius.xl,
  },
  rangeDropdownText: {
    ...Typography.labelMd,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  rangeTabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rangeTabs: {
    flexDirection: 'row',
    gap: 6,
  },
  rangeTab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.borders,
  },
  rangeTabActive: {
    backgroundColor: Colors.primaryDark,
    borderColor: Colors.primaryDark,
  },
  rangeTabText: {
    ...Typography.labelMd,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  rangeTabTextActive: {
    color: Colors.onPrimary,
  },
  engineLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  engineText: {
    ...Typography.labelMd,
    color: Colors.textSecondary,
  },
  adtCard: {
    gap: 10,
  },
  adtTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  adtLabel: {
    ...Typography.labelMd,
    fontWeight: '700',
    letterSpacing: 0.6,
    color: Colors.textSecondary,
  },
  adtValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  adtValue: {
    ...Typography.counterLg,
    color: Colors.textPrimary,
  },
  adtUnit: {
    ...Typography.bodyMd,
    color: Colors.textSecondary,
  },
  adtSub: {
    ...Typography.bodySm,
    color: Colors.textMuted,
  },
  adtGrid: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  adtMiniBox: {
    flex: 1,
    backgroundColor: Colors.subtleSurface,
    borderRadius: BorderRadius.lg,
    padding: 10,
    gap: 2,
  },
  adtMiniLabel: {
    ...Typography.labelMd,
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  adtMiniVal: {
    ...Typography.bodyLg,
    fontFamily: Typography.counterMd.fontFamily,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  adtMiniSub: {
    ...Typography.bodySm,
    fontSize: 10,
    color: Colors.textSecondary,
  },
  sectionCard: {
    gap: 14,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  cardTitle: {
    ...Typography.headlineSm,
    color: Colors.textPrimary,
  },
  cardSub: {
    ...Typography.bodySm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  peakRow: {
    flexDirection: 'row',
    gap: 8,
  },
  peakBox: {
    flex: 1,
    backgroundColor: Colors.subtleSurface,
    borderRadius: BorderRadius.lg,
    padding: 10,
    gap: 2,
  },
  peakBoxLabel: {
    ...Typography.labelMd,
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  peakBoxVal: {
    ...Typography.bodySm,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  corridorList: {
    gap: 12,
  },
  corridorItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: Colors.subtleSurface,
    borderRadius: BorderRadius.xl,
    padding: 12,
  },
  rankBadge: {
    width: 26,
    height: 26,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  rankText: {
    ...Typography.labelMd,
    color: Colors.onPrimary,
    fontWeight: '700',
  },
  corridorInfo: {
    flex: 1,
    gap: 4,
  },
  corridorTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  corridorName: {
    ...Typography.bodyMd,
    fontWeight: '700',
    color: Colors.textPrimary,
    flex: 1,
  },
  corridorVol: {
    ...Typography.bodyMd,
    fontFamily: Typography.counterMd.fontFamily,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  corridorBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  corridorType: {
    ...Typography.bodySm,
    color: Colors.textSecondary,
    flex: 1,
  },
  corridorPctPill: {
    backgroundColor: Colors.primaryFixed,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  corridorPctText: {
    ...Typography.labelMd,
    fontSize: 11,
    fontWeight: '700',
    color: Colors.onPrimaryFixed,
  },
  progressTrack: {
    height: 5,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.borders,
    overflow: 'hidden',
    marginTop: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primaryDark,
    borderRadius: BorderRadius.full,
  },
});
