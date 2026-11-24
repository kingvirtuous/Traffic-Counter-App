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
  ConfirmModal,
  OfflineBanner,
} from '@/src/components';
import { BorderRadius, Colors, Spacing, Typography } from '@/src/constants';
import { SAMPLE_REPORTS, SAMPLE_SESSIONS } from '@/src/data/sampleData';
import { GeneratedReport, ReportFormat } from '@/src/types';

export default function ReportsScreen() {
  const [mode, setMode] = useState<'single' | 'multi'>('single');
  const [selectedSessionIdx, setSelectedSessionIdx] = useState(0);
  const [format, setFormat] = useState<ReportFormat>('fhwa_csv');
  const [inclusions, setInclusions] = useState({
    rawTimestamps: true,
    directionalMatrix: true,
    hourlyAggregates: true,
    telemetryHash: false,
  });
  const [reports, setReports] = useState<GeneratedReport[]>(SAMPLE_REPORTS);
  const [deleteTarget, setDeleteTarget] = useState<GeneratedReport | null>(null);

  const selectedSession = SAMPLE_SESSIONS[selectedSessionIdx];

  const toggleInclusion = (key: keyof typeof inclusions) => {
    setInclusions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleGenerate = (action: 'share' | 'save') => {
    const newReport: GeneratedReport = {
      id: `report-${Date.now()}`,
      filename: `${selectedSession.stationId}_${format === 'fhwa_csv' ? 'FHWA' : 'Matrix'}_${new Date().toISOString().slice(0, 10)}.csv`,
      sessionId: selectedSession.id,
      format,
      createdAt: new Date().toISOString(),
      fileSize: '142 KB',
      fileSizeBytes: 145408,
      recordCount: selectedSession.totalVehicles,
      badge: format === 'fhwa_csv' ? 'FHWA Verified' : 'AASHTO Schema',
    };
    setReports((prev) => [newReport, ...prev]);
    Alert.alert(
      action === 'share' ? 'Report Ready to Share' : 'Saved to Device Storage',
      `${newReport.filename} (${selectedSession.totalVehicles.toLocaleString()} rows) added to archive. Native file sharing & SQLite export will be wired in Phase 2.`
    );
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      setReports((prev) => prev.filter((r) => r.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  return (
    <View style={styles.screen}>
      <AppHeader
        title="Traffic Reports Hub"
        subtitle="AASHTO / FHWA Packaging"
        stationId="ST-402"
        isOnline
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <OfflineBanner showSampleTag />

        {/* Segmented Mode Switch */}
        <View style={styles.segmentWrap}>
          <Pressable
            onPress={() => setMode('single')}
            style={[styles.segmentBtn, mode === 'single' && styles.segmentActive]}>
            <Text
              style={[
                styles.segmentText,
                mode === 'single' && styles.segmentTextActive,
              ]}>
              Single Survey Session
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setMode('multi')}
            style={[styles.segmentBtn, mode === 'multi' && styles.segmentActive]}>
            <Text
              style={[
                styles.segmentText,
                mode === 'multi' && styles.segmentTextActive,
              ]}>
              Multi-Day Composite
            </Text>
          </Pressable>
        </View>

        {/* Configurator Card */}
        <Card style={styles.configCard}>
          {/* Target Survey Session */}
          <Text style={styles.fieldLabel}>TARGET SURVEY SESSION</Text>
          <Pressable
            onPress={() =>
              setSelectedSessionIdx((prev) => (prev + 1) % SAMPLE_SESSIONS.length)
            }
            style={styles.pickerBox}>
            <View style={styles.pickerLeft}>
              <Text style={styles.pickerTitle} numberOfLines={1}>
                {selectedSession.locationName}
              </Text>
              <View style={styles.pickerMetaRow}>
                <Badge
                  label={`${selectedSession.totalVehicles.toLocaleString()} veh`}
                  variant="primary"
                />
                <Text style={styles.pickerSub}>
                  {(selectedSession.durationMinutes / 60).toFixed(1)}h •{' '}
                  {selectedSession.status}
                </Text>
              </View>
            </View>
            <MaterialCommunityIcons
              name="chevron-down"
              size={22}
              color={Colors.textSecondary}
            />
          </Pressable>

          {/* Export Format */}
          <Text style={[styles.fieldLabel, { marginTop: 8 }]}>EXPORT FORMAT</Text>
          <Pressable
            onPress={() => setFormat('fhwa_csv')}
            style={[
              styles.radioCard,
              format === 'fhwa_csv' && styles.radioCardActive,
            ]}>
            <View style={styles.radioCircle}>
              {format === 'fhwa_csv' ? <View style={styles.radioDot} /> : null}
            </View>
            <View style={styles.radioInfo}>
              <Text style={styles.radioTitle}>
                Standard FHWA / AASHTO Traffic CSV
              </Text>
              <Text style={styles.radioDesc}>
                FHWA 13-Class mapped schema compliant with municipal transit DOT
                standards.
              </Text>
            </View>
          </Pressable>

          <Pressable
            onPress={() => setFormat('summary_matrix')}
            style={[
              styles.radioCard,
              format === 'summary_matrix' && styles.radioCardActive,
            ]}>
            <View style={styles.radioCircle}>
              {format === 'summary_matrix' ? (
                <View style={styles.radioDot} />
              ) : null}
            </View>
            <View style={styles.radioInfo}>
              <Text style={styles.radioTitle}>Summary Matrix</Text>
              <Text style={styles.radioDesc}>
                Condensed 1-hour interval pivot table with peak hour factoring
                (PHF).
              </Text>
            </View>
          </Pressable>

          {/* Export Inclusions */}
          <Text style={[styles.fieldLabel, { marginTop: 8 }]}>
            EXPORT INCLUSIONS & PAYLOADS
          </Text>
          <CheckRow
            checked={inclusions.rawTimestamps}
            title="Raw timestamp & vehicle tracking IDs"
            subtitle="High-frequency per-vehicle event log (epoch ms)"
            onPress={() => toggleInclusion('rawTimestamps')}
          />
          <CheckRow
            checked={inclusions.directionalMatrix}
            title="Directional classification matrix"
            subtitle="Inbound vs Outbound split per vehicle class"
            onPress={() => toggleInclusion('directionalMatrix')}
          />
          <CheckRow
            checked={inclusions.hourlyAggregates}
            title="Hourly aggregate intervals"
            subtitle="FHWA 60-min volume tallies"
            onPress={() => toggleInclusion('hourlyAggregates')}
          />
          <CheckRow
            checked={inclusions.telemetryHash}
            title="Telemetry metadata & cryptographic hash"
            subtitle="Optional SHA-256 verification payload"
            onPress={() => toggleInclusion('telemetryHash')}
          />

          {/* Payload Estimator */}
          <View style={styles.estimatorBox}>
            <View style={styles.estimatorTop}>
              <View style={styles.estimatorTitleRow}>
                <MaterialCommunityIcons
                  name="chart-line"
                  size={16}
                  color={Colors.primaryDark}
                />
                <Text style={styles.estimatorTitle}>Payload Estimator</Text>
              </View>
              <Badge label="Instant compile < 0.2s" variant="success" />
            </View>
            <Text style={styles.estimatorBody}>
              {selectedSession.totalVehicles.toLocaleString()} individual count
              rows • 12 hourly summary rows • 142 KB (CSV)
            </Text>
          </View>
        </Card>

        {/* Export CTAs */}
        <Button
          title="Generate & Share CSV Report"
          onPress={() => handleGenerate('share')}
          leftIcon={
            <MaterialCommunityIcons
              name="share-variant"
              size={18}
              color={Colors.onPrimary}
            />
          }
        />
        <Button
          title="Save to Device Storage"
          variant="outline"
          onPress={() => handleGenerate('save')}
          leftIcon={
            <MaterialCommunityIcons
              name="download-outline"
              size={18}
              color={Colors.textPrimary}
            />
          }
        />

        {/* Generated Reports Archive */}
        <View style={styles.archiveSection}>
          <View style={styles.archiveHeader}>
            <Text style={styles.archiveTitle}>Generated Reports Archive</Text>
            <Text style={styles.archiveCount}>{reports.length} files</Text>
          </View>

          {reports.map((report) => (
            <Card key={report.id} style={styles.reportCard}>
              <View style={styles.reportRow}>
                <View style={styles.reportIcon}>
                  <MaterialCommunityIcons
                    name="file-delimited-outline"
                    size={22}
                    color={Colors.vehicleCar}
                  />
                </View>
                <View style={styles.reportInfo}>
                  <Text style={styles.reportName} numberOfLines={1}>
                    {report.filename}
                  </Text>
                  <Text style={styles.reportMeta}>
                    {new Date(report.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}{' '}
                    • {report.fileSize} • {report.recordCount.toLocaleString()}{' '}
                    rows
                  </Text>
                  {report.badge ? (
                    <Badge
                      label={report.badge}
                      variant={
                        report.badge.includes('FHWA') ? 'primary' : 'motorcycle'
                      }
                    />
                  ) : null}
                </View>
                <View style={styles.reportActions}>
                  <Pressable
                    onPress={() =>
                      Alert.alert(
                        'Share Report',
                        `Android Share Sheet for ${report.filename} will be connected in Phase 2.`
                      )
                    }
                    style={styles.iconBtn}>
                    <MaterialCommunityIcons
                      name="share-variant-outline"
                      size={20}
                      color={Colors.textSecondary}
                    />
                  </Pressable>
                  <Pressable
                    onPress={() => setDeleteTarget(report)}
                    style={styles.iconBtn}>
                    <MaterialCommunityIcons
                      name="trash-can-outline"
                      size={20}
                      color={Colors.vehicleTruck}
                    />
                  </Pressable>
                </View>
              </View>
            </Card>
          ))}
        </View>

        <View style={styles.isoNote}>
          <MaterialCommunityIcons
            name="code-braces"
            size={18}
            color={Colors.textMuted}
          />
          <Text style={styles.isoText}>
            Exports are formatted with standard ISO-8601 UTC timestamps and
            ready for GIS, VISSIM, and Synchro traffic modeling imports.
          </Text>
        </View>
      </ScrollView>

      <ConfirmModal
        visible={!!deleteTarget}
        title="Delete Exported Report?"
        message={`Remove ${deleteTarget?.filename ?? 'this report'} from your generated reports archive?`}
        confirmLabel="Delete"
        destructive
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </View>
  );
}

function CheckRow({
  checked,
  title,
  subtitle,
  onPress,
}: {
  checked: boolean;
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.checkRow}>
      <MaterialCommunityIcons
        name={checked ? 'checkbox-marked' : 'checkbox-blank-outline'}
        size={22}
        color={checked ? Colors.primaryDark : Colors.textMuted}
      />
      <View style={styles.checkInfo}>
        <Text style={styles.checkTitle}>{title}</Text>
        <Text style={styles.checkSub}>{subtitle}</Text>
      </View>
    </Pressable>
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
  segmentWrap: {
    flexDirection: 'row',
    backgroundColor: Colors.subtleSurface,
    padding: 4,
    borderRadius: BorderRadius.xl,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
  },
  segmentActive: {
    backgroundColor: Colors.primaryDark,
  },
  segmentText: {
    ...Typography.labelMd,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  segmentTextActive: {
    color: Colors.onPrimary,
  },
  configCard: {
    gap: 10,
  },
  fieldLabel: {
    ...Typography.labelMd,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
    color: Colors.textMuted,
  },
  pickerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.subtleSurface,
    borderRadius: BorderRadius.xl,
    padding: 12,
    gap: 8,
  },
  pickerLeft: {
    flex: 1,
    gap: 4,
  },
  pickerTitle: {
    ...Typography.bodyMd,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  pickerMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pickerSub: {
    ...Typography.bodySm,
    color: Colors.textSecondary,
  },
  radioCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 12,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.borders,
    backgroundColor: Colors.surface,
  },
  radioCardActive: {
    borderColor: Colors.primaryDark,
    backgroundColor: '#F0F9FF',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    borderColor: Colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primaryDark,
  },
  radioInfo: {
    flex: 1,
    gap: 2,
  },
  radioTitle: {
    ...Typography.bodyMd,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  radioDesc: {
    ...Typography.bodySm,
    color: Colors.textSecondary,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingVertical: 4,
  },
  checkInfo: {
    flex: 1,
    gap: 1,
  },
  checkTitle: {
    ...Typography.bodyMd,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  checkSub: {
    ...Typography.bodySm,
    color: Colors.textSecondary,
  },
  estimatorBox: {
    backgroundColor: '#F0F9FF',
    borderRadius: BorderRadius.xl,
    padding: 12,
    gap: 6,
    marginTop: 4,
  },
  estimatorTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  estimatorTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  estimatorTitle: {
    ...Typography.labelMd,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  estimatorBody: {
    ...Typography.bodySm,
    fontFamily: Typography.counterMd.fontFamily,
    color: Colors.textPrimary,
  },
  archiveSection: {
    gap: Spacing.sm,
    marginTop: 4,
  },
  archiveHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  archiveTitle: {
    ...Typography.headlineSm,
    color: Colors.textPrimary,
  },
  archiveCount: {
    ...Typography.labelMd,
    color: Colors.textSecondary,
  },
  reportCard: {
    padding: 12,
  },
  reportRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  reportIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.vehicleCarTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportInfo: {
    flex: 1,
    gap: 3,
  },
  reportName: {
    ...Typography.bodyMd,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  reportMeta: {
    ...Typography.bodySm,
    color: Colors.textSecondary,
  },
  reportActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  iconBtn: {
    padding: 6,
  },
  isoNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.subtleSurface,
    padding: 12,
    borderRadius: BorderRadius.xl,
    gap: 10,
  },
  isoText: {
    flex: 1,
    ...Typography.bodySm,
    color: Colors.textSecondary,
  },
});
