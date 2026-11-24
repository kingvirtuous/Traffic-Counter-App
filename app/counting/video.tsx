import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
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
import { SAMPLE_VIDEO_METADATA } from '@/src/data/sampleData';
import { CountingDirection } from '@/src/types';

type JobState = 'waiting' | 'processing' | 'completed' | 'failed';

export default function VideoCountingScreen() {
  const router = useRouter();
  const [hasFile, setHasFile] = useState(true);
  const [direction, setDirection] = useState<CountingDirection>('bidirectional');
  const [jobState, setJobState] = useState<JobState>('processing');
  const [cancelModalVisible, setCancelModalVisible] = useState(false);

  const progress =
    jobState === 'completed' ? 100 : jobState === 'processing' ? 64 : 0;

  return (
    <View style={styles.screen}>
      <AppHeader
        title="Import Recorded Video"
        subtitle="Station #ST-402 • Local Pipeline"
        stationId="ST-402"
        showBack
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <OfflineBanner showSampleTag />

        {/* File Preview / Dropzone */}
        {hasFile ? (
          <Card style={styles.fileCard}>
            <View style={styles.fileHeader}>
              <View style={styles.thumbBox}>
                <MaterialCommunityIcons
                  name="filmstrip"
                  size={28}
                  color={Colors.primaryDark}
                />
              </View>
              <View style={styles.fileInfo}>
                <Text style={styles.fileName} numberOfLines={1}>
                  {SAMPLE_VIDEO_METADATA.filename}
                </Text>
                <Text style={styles.fileMeta}>
                  {SAMPLE_VIDEO_METADATA.duration} •{' '}
                  {SAMPLE_VIDEO_METADATA.resolution}
                </Text>
                <Text style={styles.fileMeta}>
                  Codec: {SAMPLE_VIDEO_METADATA.codec} •{' '}
                  {SAMPLE_VIDEO_METADATA.fileSize}
                </Text>
              </View>
            </View>
            <Button
              title="Replace File"
              variant="subtle"
              onPress={() => setHasFile(false)}
              leftIcon={
                <MaterialCommunityIcons
                  name="refresh"
                  size={18}
                  color={Colors.textPrimary}
                />
              }
            />
          </Card>
        ) : (
          <Card style={styles.dropzone}>
            <MaterialCommunityIcons
              name="video-plus-outline"
              size={44}
              color={Colors.primaryDark}
            />
            <Text style={styles.dropTitle}>Select Recorded Traffic Video</Text>
            <Text style={styles.dropDesc}>
              Supports MP4, MOV, and MKV files recorded from fixed roadside or
              overpass cameras.
            </Text>
            <Button
              title="Load Sample Video (Preview)"
              onPress={() => {
                setHasFile(true);
                setJobState('waiting');
              }}
            />
          </Card>
        )}

        {/* Detection Configuration */}
        <Card style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Detection Configuration</Text>
            <Badge label="Preset #1" variant="subtle" />
          </View>

          <Text style={styles.fieldLabel}>Virtual Counting Tripwire</Text>
          <View style={styles.dropdownBox}>
            <MaterialCommunityIcons
              name="ruler"
              size={18}
              color={Colors.textSecondary}
            />
            <Text style={styles.dropdownText}>
              Centerline Mid-Frame (Y: 540px)
            </Text>
            <MaterialCommunityIcons
              name="chevron-down"
              size={20}
              color={Colors.textMuted}
            />
          </View>

          <Text style={styles.fieldLabel}>Count Direction Mode</Text>
          <View style={styles.directionRow}>
            {(['inbound', 'outbound', 'bidirectional'] as CountingDirection[]).map(
              (dir) => {
                const active = direction === dir;
                return (
                  <Pressable
                    key={dir}
                    onPress={() => setDirection(dir)}
                    style={[styles.dirBtn, active && styles.dirBtnActive]}>
                    <Text
                      style={[
                        styles.dirText,
                        active && styles.dirTextActive,
                      ]}>
                      {dir.charAt(0).toUpperCase() + dir.slice(1)}
                    </Text>
                  </Pressable>
                );
              }
            )}
          </View>

          <View style={styles.paramRow}>
            <Text style={styles.paramText}>Confidence: 75%</Text>
            <Text style={styles.paramText}>Tripwire Line #1</Text>
            <Text style={styles.paramText}>Tracking Active</Text>
          </View>
        </Card>

        {/* Processing Status & Progress */}
        {hasFile ? (
          <Card style={styles.sectionCard}>
            <View style={styles.cardHeaderRow}>
              <View>
                <Text style={styles.cardTitle}>
                  {jobState === 'processing'
                    ? 'Processing Batch...'
                    : jobState === 'completed'
                      ? 'Processing Completed'
                      : jobState === 'failed'
                        ? 'Processing Failed'
                        : 'Ready to Process'}
                </Text>
                <Text style={styles.cardSub}>
                  AI TensorRT / Local Pipeline (Simulated)
                </Text>
              </View>
              <Badge
                label={
                  jobState === 'failed'
                    ? 'Error'
                    : jobState === 'completed'
                      ? 'Verified'
                      : 'AI Detection Active'
                }
                variant={
                  jobState === 'failed'
                    ? 'error'
                    : jobState === 'completed'
                      ? 'success'
                      : 'primary'
                }
              />
            </View>

            <View style={styles.progressHeader}>
              <Text style={styles.progressPct}>{progress}%</Text>
              <Text style={styles.progressState}>
                {jobState === 'completed'
                  ? '100% Complete'
                  : jobState === 'processing'
                    ? 'In Progress'
                    : jobState === 'failed'
                      ? 'Frame Decode Error'
                      : 'Waiting'}
              </Text>
            </View>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${progress}%`,
                    backgroundColor:
                      jobState === 'failed'
                        ? Colors.statusError
                        : Colors.primaryDark,
                  },
                ]}
              />
            </View>

            <View style={styles.metricsRow}>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Frames</Text>
                <Text style={styles.metricVal}>
                  {jobState === 'completed' ? '108k/108k' : '69.1k/108k'}
                </Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Rate</Text>
                <Text style={styles.metricVal}>1.8x 54fps</Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>ETA</Text>
                <Text style={styles.metricVal}>
                  {jobState === 'completed' ? '00m 00s' : '04m 12s'}
                </Text>
              </View>
            </View>

            {/* Quick State Demo Controls */}
            <View style={styles.stateDemoRow}>
              {(['waiting', 'processing', 'completed', 'failed'] as JobState[]).map(
                (st) => (
                  <Pressable
                    key={st}
                    onPress={() => setJobState(st)}
                    style={[
                      styles.statePill,
                      jobState === st && styles.statePillActive,
                    ]}>
                    <Text
                      style={[
                        styles.statePillText,
                        jobState === st && { color: Colors.onPrimary },
                      ]}>
                      {st}
                    </Text>
                  </Pressable>
                )
              )}
            </View>
          </Card>
        ) : null}

        {/* Live Tally Inventory */}
        {hasFile ? (
          <Card style={styles.sectionCard}>
            <View style={styles.cardHeaderRow}>
              <View>
                <Text style={styles.fieldLabel}>CLASSIFICATION SPLIT</Text>
                <Text style={styles.cardTitle}>Detected Inventory</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.totalTally}>742</Text>
                <Text style={styles.cardSub}>Total Units</Text>
              </View>
            </View>

            <View style={styles.tallyGrid}>
              <TallyRow icon="car" label="Cars" count={450} pct="60.6%" color={Colors.vehicleCar} />
              <TallyRow icon="motorbike" label="Bikes" count={180} pct="24.2%" color={Colors.vehicleMoto} />
              <TallyRow icon="bus" label="Buses" count={28} pct="3.8%" color={Colors.vehicleBus} />
              <TallyRow icon="truck" label="Trucks" count={84} pct="11.4%" color={Colors.vehicleTruck} />
            </View>

            <View style={styles.commitRow}>
              <Text style={styles.commitText}>Live SQLite commit: ID #9842</Text>
              <Text style={styles.syncOk}>Sync: OK</Text>
            </View>
          </Card>
        ) : null}

        {/* Action Buttons */}
        {hasFile ? (
          <View style={styles.actionsRow}>
            {jobState === 'failed' ? (
              <Button
                title="Retry Processing"
                onPress={() => setJobState('processing')}
                style={{ flex: 1 }}
              />
            ) : jobState === 'completed' ? (
              <Button
                title="View Completed Session"
                onPress={() => router.push('/sessions/session-002')}
                style={{ flex: 1 }}
              />
            ) : (
              <>
                <Button
                  title="Cancel Processing"
                  variant="outline"
                  onPress={() => setCancelModalVisible(true)}
                  style={{ flex: 1 }}
                />
                <Button
                  title={
                    jobState === 'waiting' ? 'Start Processing' : 'In Background'
                  }
                  onPress={() =>
                    jobState === 'waiting'
                      ? setJobState('processing')
                      : Alert.alert(
                          'Background Mode',
                          'Video processing will continue in the background in Phase 3/4.'
                        )
                  }
                  style={{ flex: 1 }}
                />
              </>
            )}
          </View>
        ) : null}
      </ScrollView>

      <ConfirmModal
        visible={cancelModalVisible}
        title="Cancel Video Processing?"
        message="Partial detections saved so far will be preserved in local SQLite, or you can resume later."
        confirmLabel="Cancel Job"
        destructive
        onConfirm={() => {
          setCancelModalVisible(false);
          setJobState('waiting');
        }}
        onCancel={() => setCancelModalVisible(false)}
      />
    </View>
  );
}

function TallyRow({
  icon,
  label,
  count,
  pct,
  color,
}: {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  count: number;
  pct: string;
  color: string;
}) {
  return (
    <View style={styles.tallyItem}>
      <MaterialCommunityIcons name={icon} size={18} color={color} />
      <View style={{ flex: 1 }}>
        <Text style={styles.tallyLabel}>{label}</Text>
        <Text style={styles.tallyCount}>{count}</Text>
      </View>
      <Text style={styles.tallyPct}>{pct}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.backgroundCanvas },
  scroll: { flex: 1 },
  content: { padding: Spacing.margin, gap: Spacing.md, paddingBottom: Spacing.xl },
  fileCard: { gap: 12 },
  fileHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  thumbBox: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.primaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileInfo: { flex: 1, gap: 2 },
  fileName: { ...Typography.bodyMd, fontWeight: '700', color: Colors.textPrimary },
  fileMeta: { ...Typography.bodySm, color: Colors.textSecondary },
  dropzone: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    gap: 10,
    borderStyle: 'dashed',
  },
  dropTitle: { ...Typography.headlineSm, color: Colors.textPrimary },
  dropDesc: { ...Typography.bodySm, color: Colors.textSecondary, textAlign: 'center' },
  sectionCard: { gap: 10 },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardTitle: { ...Typography.headlineSm, color: Colors.textPrimary },
  cardSub: { ...Typography.bodySm, color: Colors.textSecondary },
  fieldLabel: { ...Typography.labelMd, color: Colors.textSecondary, fontWeight: '700' },
  dropdownBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.subtleSurface,
    padding: 12,
    borderRadius: BorderRadius.xl,
  },
  dropdownText: { ...Typography.bodyMd, color: Colors.textPrimary, flex: 1 },
  directionRow: { flexDirection: 'row', gap: 8 },
  dirBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.subtleSurface,
    alignItems: 'center',
  },
  dirBtnActive: { backgroundColor: Colors.primaryDark },
  dirText: { ...Typography.labelMd, color: Colors.textSecondary, fontWeight: '600' },
  dirTextActive: { color: Colors.onPrimary },
  paramRow: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 4 },
  paramText: { ...Typography.bodySm, color: Colors.textSecondary },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  progressPct: { ...Typography.headlineMd, fontFamily: Typography.counterMd.fontFamily, color: Colors.textPrimary },
  progressState: { ...Typography.labelMd, color: Colors.textSecondary },
  progressTrack: { height: 8, backgroundColor: Colors.subtleSurface, borderRadius: BorderRadius.full, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: BorderRadius.full },
  metricsRow: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 4 },
  metricItem: { gap: 2 },
  metricLabel: { ...Typography.labelMd, color: Colors.textMuted },
  metricVal: { ...Typography.bodyMd, fontFamily: Typography.counterMd.fontFamily, fontWeight: '700', color: Colors.textPrimary },
  stateDemoRow: { flexDirection: 'row', gap: 6, paddingTop: 4 },
  statePill: {
    flex: 1,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.subtleSurface,
    alignItems: 'center',
  },
  statePillActive: { backgroundColor: Colors.primaryDark },
  statePillText: { ...Typography.labelMd, fontSize: 10, color: Colors.textSecondary, textTransform: 'capitalize' },
  totalTally: { ...Typography.headlineMd, fontFamily: Typography.counterMd.fontFamily, color: Colors.textPrimary },
  tallyGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  tallyItem: { width: '48%', flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: Colors.subtleSurface, padding: 10, borderRadius: BorderRadius.lg },
  tallyLabel: { ...Typography.labelMd, color: Colors.textSecondary },
  tallyCount: { ...Typography.bodyMd, fontFamily: Typography.counterMd.fontFamily, fontWeight: '700', color: Colors.textPrimary },
  tallyPct: { ...Typography.labelMd, color: Colors.textMuted },
  commitRow: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 4 },
  commitText: { ...Typography.bodySm, color: Colors.textSecondary },
  syncOk: { ...Typography.labelMd, color: Colors.vehicleCar, fontWeight: '700' },
  actionsRow: { flexDirection: 'row', gap: 10 },
});
