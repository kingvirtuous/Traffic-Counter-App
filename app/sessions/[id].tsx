import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  AppHeader,
  Badge,
  Button,
  Card,
  ConfirmModal,
  HourlyBarChart,
  OfflineBanner,
} from '@/src/components';
import {
  BorderRadius,
  Colors,
  Spacing,
  Typography,
  VEHICLE_CATEGORIES,
} from '@/src/constants';
import { SAMPLE_SESSION_DETAIL } from '@/src/data/sampleData';

export default function SessionDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [deleteVisible, setDeleteVisible] = useState(false);

  const detail = SAMPLE_SESSION_DETAIL;

  return (
    <View style={styles.screen}>
      <AppHeader
        title="Session Details"
        subtitle={id ? `#${id.toUpperCase()}` : '#TRF-9024'}
        stationId="ST-402"
        showBack
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <OfflineBanner showSampleTag />

        {/* Audit Verified Banner */}
        <View style={styles.auditBanner}>
          <MaterialCommunityIcons
            name="check-decagram"
            size={18}
            color={Colors.primaryDark}
          />
          <Text style={styles.auditText}>
            Audit Session Verified • Ready for Transit
          </Text>
          <Badge label="#TRF-9024" variant="primary" />
        </View>

        {/* Station & Metadata Card */}
        <Card style={styles.sectionCard}>
          <View style={styles.locRow}>
            <View style={styles.locIcon}>
              <MaterialCommunityIcons
                name="map-marker"
                size={20}
                color={Colors.primaryDark}
              />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.locTitleRow}>
                <Text style={styles.locTitle}>Arterial Route 12</Text>
                <Badge label="Corridor S" variant="subtle" />
              </View>
              <Text style={styles.locSub}>
                South Gate Crossing & Interchange
              </Text>
            </View>
          </View>

          <View style={styles.metaPill}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={14}
              color={Colors.textSecondary}
            />
            <Text style={styles.metaText}>
              Nov 20, 2026 • 07:00 AM – 19:00 PM (12.0 Hrs)
            </Text>
          </View>
          <View style={styles.metaPill}>
            <MaterialCommunityIcons
              name="video-outline"
              size={14}
              color={Colors.textSecondary}
            />
            <Text style={styles.metaText}>
              Recorded Video Import (1080p 30fps)
            </Text>
          </View>

          <View style={styles.qualityRow}>
            <Text style={styles.qualityText}>
              <Text style={{ fontWeight: '700', color: Colors.textPrimary }}>
                {detail.confidenceAvg}%
              </Text>{' '}
              Confidence
            </Text>
            <Text style={styles.qualityText}>
              • {detail.duplicatesSuppressed} duplicate drops suppressed
            </Text>
            <Text style={styles.zeroLoss}>Zero Data Loss</Text>
          </View>
        </Card>

        {/* Gross Traffic Count */}
        <Card style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.overline}>GROSS TRAFFIC COUNT</Text>
            <Badge label="+8.3% vs baseline" variant="success" />
          </View>
          <View style={styles.grossRow}>
            <Text style={styles.grossVal}>
              {detail.totalVehicles.toLocaleString()}
            </Text>
            <Text style={styles.grossUnit}>vehicles</Text>
          </View>

          <View style={styles.summaryGrid}>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryLabel}>Avg Flow</Text>
              <Text style={styles.summaryVal}>{detail.avgFlowRate}</Text>
              <Text style={styles.summaryUnit}>veh / hr</Text>
            </View>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryLabel}>Peak Flow</Text>
              <Text style={[styles.summaryVal, { color: Colors.primaryDark }]}>
                {detail.peakFlowRate.toLocaleString()}
              </Text>
              <Text style={styles.summaryUnit}>veh / hr (08h)</Text>
            </View>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryLabel}>Duration</Text>
              <Text style={styles.summaryVal}>12.0</Text>
              <Text style={styles.summaryUnit}>continuous hrs</Text>
            </View>
          </View>
        </Card>

        {/* Classification Split */}
        <Card style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Classification Split</Text>
            <Text style={styles.cardSub}>FHWA 13-Class Grouped</Text>
          </View>

          {detail.classificationSplit.map((item) => {
            const cfg = VEHICLE_CATEGORIES.find((c) => c.key === item.category);
            return (
              <View key={item.category} style={styles.splitItem}>
                <View style={styles.splitTop}>
                  <View style={styles.splitLeft}>
                    <View
                      style={[
                        styles.splitIcon,
                        { backgroundColor: cfg?.tintColor },
                      ]}>
                      <MaterialCommunityIcons
                        name={
                          (cfg?.icon ?? 'car') as keyof typeof MaterialCommunityIcons.glyphMap
                        }
                        size={16}
                        color={cfg?.color}
                      />
                    </View>
                    <Text style={styles.splitLabel}>{item.label}</Text>
                  </View>
                  <View style={styles.splitRight}>
                    <Text style={styles.splitCount}>
                      {item.count.toLocaleString()}
                    </Text>
                    <Badge
                      label={`${item.percentage}%`}
                      variant={item.category}
                    />
                  </View>
                </View>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.barFill,
                      {
                        width: `${item.percentage}%`,
                        backgroundColor: cfg?.color ?? Colors.primaryDark,
                      },
                    ]}
                  />
                </View>
              </View>
            );
          })}
        </Card>

        {/* Directional Split */}
        <Card style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Directional Split</Text>
            <Text style={styles.cardSub}>Bidirectional Tripwire</Text>
          </View>

          <View style={styles.splitBar}>
            <View
              style={[
                styles.splitBarLeft,
                { flex: detail.directionalSplit.inbound.percentage },
              ]}
            />
            <View
              style={[
                styles.splitBarRight,
                { flex: detail.directionalSplit.outbound.percentage },
              ]}
            />
          </View>

          <View style={styles.dirCards}>
            <View style={styles.dirCard}>
              <Text style={styles.dirCardLabel}>Inbound (N → S)</Text>
              <Text style={styles.dirCardVal}>
                {detail.directionalSplit.inbound.count.toLocaleString()}
              </Text>
              <Text style={styles.dirCardSub}>
                {detail.directionalSplit.inbound.percentage}% • Peak{' '}
                {detail.directionalSplit.inbound.peakTime}
              </Text>
            </View>
            <View style={styles.dirCard}>
              <Text style={styles.dirCardLabel}>Outbound (S → N)</Text>
              <Text style={styles.dirCardVal}>
                {detail.directionalSplit.outbound.count.toLocaleString()}
              </Text>
              <Text style={styles.dirCardSub}>
                {detail.directionalSplit.outbound.percentage}% • Peak{' '}
                {detail.directionalSplit.outbound.peakTime}
              </Text>
            </View>
          </View>
        </Card>

        {/* Hourly Volume Distribution */}
        <Card style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Hourly Volume Distribution</Text>
            <Badge label="Peak: 1,120 veh/hr" variant="primary" />
          </View>
          <HourlyBarChart data={detail.hourlyDistribution} />
        </Card>

        {/* Calibration & Engine Telemetry */}
        <Card style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Calibration & Engine Telemetry</Text>
            <Badge label="FP16 Locked" variant="success" />
          </View>
          <TelemetryRow label="Neural Detector Model" value={detail.detectorModel} />
          <TelemetryRow label="Detection Tripwire Trigger" value={detail.tripwireConfig} />
          <TelemetryRow label="Cryptographic Checksum" value={detail.checksum} />
          <TelemetryRow
            label="Local Persistence Format"
            value="Local SQLite (14.2 MB batch payload)"
          />
        </Card>

        <Button
          title="Export CSV Report (FHWA / AASHTO)"
          onPress={() => router.push('/(tabs)/reports')}
          leftIcon={
            <MaterialCommunityIcons
              name="download"
              size={18}
              color={Colors.onPrimary}
            />
          }
        />
        <Button
          title="Delete Survey Session"
          variant="danger"
          onPress={() => setDeleteVisible(true)}
          leftIcon={
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={18}
              color={Colors.vehicleTruck}
            />
          }
        />
      </ScrollView>

      <ConfirmModal
        visible={deleteVisible}
        title="Delete Survey Session?"
        message="This will permanently remove the session and all associated count events from local SQLite."
        confirmLabel="Delete Session"
        destructive
        onConfirm={() => {
          setDeleteVisible(false);
          Alert.alert('Phase 1 UI Preview', 'Session deletion will be persisted in Phase 2.');
          router.back();
        }}
        onCancel={() => setDeleteVisible(false)}
      />
    </View>
  );
}

function TelemetryRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.telemetryRow}>
      <Text style={styles.telemetryLabel}>{label}</Text>
      <Text style={styles.telemetryValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.backgroundCanvas },
  scroll: { flex: 1 },
  content: { padding: Spacing.margin, gap: Spacing.md, paddingBottom: Spacing.xl },
  auditBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F2FE',
    borderRadius: BorderRadius.xl,
    padding: 12,
    gap: 8,
  },
  auditText: { ...Typography.labelMd, color: Colors.primaryDark, fontWeight: '700', flex: 1 },
  sectionCard: { gap: 10 },
  locRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  locIcon: {
    width: 38,
    height: 38,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  locTitle: { ...Typography.headlineSm, color: Colors.textPrimary },
  locSub: { ...Typography.bodySm, color: Colors.textSecondary },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.subtleSurface,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: BorderRadius.lg,
  },
  metaText: { ...Typography.bodySm, color: Colors.textSecondary },
  qualityRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 6, paddingTop: 4 },
  qualityText: { ...Typography.labelMd, color: Colors.textSecondary },
  zeroLoss: { ...Typography.labelMd, color: Colors.vehicleCar, fontWeight: '700' },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  overline: { ...Typography.labelMd, fontWeight: '700', color: Colors.textSecondary, letterSpacing: 0.5 },
  grossRow: { flexDirection: 'row', alignItems: 'baseline', gap: 8 },
  grossVal: { ...Typography.counterLg, color: Colors.textPrimary },
  grossUnit: { ...Typography.bodyMd, color: Colors.textSecondary },
  summaryGrid: { flexDirection: 'row', gap: 8 },
  summaryBox: { flex: 1, backgroundColor: Colors.subtleSurface, borderRadius: BorderRadius.lg, padding: 10, gap: 2 },
  summaryLabel: { ...Typography.labelMd, color: Colors.textSecondary },
  summaryVal: { ...Typography.bodyLg, fontFamily: Typography.counterMd.fontFamily, fontWeight: '700', color: Colors.textPrimary },
  summaryUnit: { ...Typography.bodySm, fontSize: 10, color: Colors.textMuted },
  cardTitle: { ...Typography.headlineSm, color: Colors.textPrimary },
  cardSub: { ...Typography.labelMd, color: Colors.textSecondary },
  splitItem: { gap: 6 },
  splitTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  splitLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  splitIcon: { width: 28, height: 28, borderRadius: BorderRadius.lg, alignItems: 'center', justifyContent: 'center' },
  splitLabel: { ...Typography.bodyMd, fontWeight: '600', color: Colors.textPrimary },
  splitRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  splitCount: { ...Typography.bodyMd, fontFamily: Typography.counterMd.fontFamily, fontWeight: '700', color: Colors.textPrimary },
  barTrack: { height: 6, backgroundColor: Colors.subtleSurface, borderRadius: BorderRadius.full, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: BorderRadius.full },
  splitBar: { flexDirection: 'row', height: 8, borderRadius: BorderRadius.full, overflow: 'hidden', gap: 2 },
  splitBarLeft: { backgroundColor: Colors.vehicleCar },
  splitBarRight: { backgroundColor: Colors.primaryDark },
  dirCards: { flexDirection: 'row', gap: 8 },
  dirCard: { flex: 1, backgroundColor: Colors.subtleSurface, borderRadius: BorderRadius.xl, padding: 12, gap: 4 },
  dirCardLabel: { ...Typography.labelMd, color: Colors.textSecondary },
  dirCardVal: { ...Typography.headlineMd, fontFamily: Typography.counterMd.fontFamily, color: Colors.textPrimary },
  dirCardSub: { ...Typography.bodySm, fontSize: 11, color: Colors.textMuted },
  telemetryRow: { backgroundColor: Colors.subtleSurface, borderRadius: BorderRadius.lg, padding: 10, gap: 2 },
  telemetryLabel: { ...Typography.labelMd, color: Colors.textMuted },
  telemetryValue: { ...Typography.bodySm, fontWeight: '700', color: Colors.textPrimary },
});
