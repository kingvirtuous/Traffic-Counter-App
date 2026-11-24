import React, { useState } from 'react';
import {
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ConfirmModal } from '@/src/components';
import { BorderRadius, Colors, Spacing, Typography } from '@/src/constants';

export default function LiveCountingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isPaused, setIsPaused] = useState(false);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [stopModalVisible, setStopModalVisible] = useState(false);
  const [tripwireOffset, setTripwireOffset] = useState(56); // percentage from top

  const [counts, setCounts] = useState({
    total: 1482,
    cars: 894,
    motorcycles: 382,
    buses: 54,
    trucks: 152,
  });

  const handleSimulateIncrement = (
    key: 'cars' | 'motorcycles' | 'buses' | 'trucks'
  ) => {
    if (isPaused) return;
    setCounts((prev) => ({
      ...prev,
      total: prev.total + 1,
      [key]: prev[key] + 1,
    }));
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />

      <ImageBackground
        source={require('@/assets/images/traffic-pov-sample.png')}
        style={styles.cameraView}
        resizeMode="cover">
        {/* Top Hardware & Recording HUD */}
        <View style={[styles.topHud, { paddingTop: insets.top + 8 }]}>
          <View style={styles.topBar}>
            <View style={styles.topLeft}>
              <Pressable
                onPress={() => setStopModalVisible(true)}
                style={styles.closeBtn}>
                <MaterialCommunityIcons
                  name="close"
                  size={18}
                  color={Colors.onPrimary}
                />
              </Pressable>
              <View style={styles.recPill}>
                <View
                  style={[
                    styles.recDot,
                    {
                      backgroundColor: isPaused
                        ? Colors.statusWarning
                        : Colors.statusError,
                    },
                  ]}
                />
                <Text style={styles.recText}>
                  {isPaused ? 'PAUSED' : 'REC 01:24:18'}
                </Text>
              </View>
              <View style={styles.fpsPill}>
                <Text style={styles.fpsText}>30 FPS</Text>
              </View>
            </View>

            <View style={styles.topRight}>
              <View style={styles.hwPill}>
                <MaterialCommunityIcons
                  name="battery-80"
                  size={14}
                  color={Colors.statusSuccess}
                />
                <Text style={styles.hwText}>86%</Text>
              </View>
              <View style={styles.hwPill}>
                <MaterialCommunityIcons
                  name="thermometer"
                  size={14}
                  color={Colors.statusWarning}
                />
                <Text style={styles.hwText}>28°C</Text>
              </View>
            </View>
          </View>

          <View style={styles.subBar}>
            <View style={styles.stationPill}>
              <View style={styles.localDot} />
              <Text style={styles.stationIdText}>ID: ST-402</Text>
            </View>
            <Text style={styles.sqliteText}>SQLite Local (Zero Loss)</Text>
            <View style={styles.hudIcons}>
              <Pressable
                onPress={() => setIsCalibrating((v) => !v)}
                style={styles.hudIconBtn}>
                <MaterialCommunityIcons
                  name="grid"
                  size={16}
                  color={Colors.onPrimary}
                />
              </Pressable>
              <Pressable
                onPress={() => router.push('/settings')}
                style={styles.hudIconBtn}>
                <MaterialCommunityIcons
                  name="cog-outline"
                  size={16}
                  color={Colors.onPrimary}
                />
              </Pressable>
            </View>
          </View>

          <View style={styles.previewNotice}>
            <Text style={styles.previewNoticeText}>
              Simulated Camera Preview (Phase 1 UI) • Tap mini counters to test
            </Text>
          </View>
        </View>

        {/* Simulated Detection Overlays */}
        <View style={styles.overlayArea}>
          {/* Car Bounding Box */}
          <View style={[styles.bbox, styles.bboxCar]}>
            <View style={[styles.bboxTag, { backgroundColor: Colors.vehicleCar }]}>
              <Text style={styles.bboxTagText}>Car #104 • 94% ↓ 58mph</Text>
            </View>
          </View>

          {/* Truck Bounding Box */}
          <View style={[styles.bbox, styles.bboxTruck]}>
            <View style={[styles.bboxTag, { backgroundColor: Colors.vehicleTruck }]}>
              <Text style={styles.bboxTagText}>Truck #105 • 89% ↓ 49mph</Text>
            </View>
          </View>

          {/* Virtual Counting Tripwire Line */}
          <View style={[styles.tripwireWrap, { top: `${tripwireOffset}%` }]}>
            <View style={styles.tripwireHandle} />
            <View style={styles.tripwireLine} />
            <View style={styles.tripwireBadge}>
              <Text style={styles.tripwireBadgeText}>
                TRIPWIRE LINE A • INBOUND ↓
              </Text>
            </View>
            <View style={styles.tripwireHandle} />
          </View>

          {isCalibrating ? (
            <View style={styles.calibratePanel}>
              <Text style={styles.calibrateText}>
                Calibrate Tripwire Y-Offset: {tripwireOffset}%
              </Text>
              <View style={styles.calibrateBtns}>
                <Pressable
                  onPress={() => setTripwireOffset((y) => Math.max(25, y - 5))}
                  style={styles.calBtn}>
                  <Text style={styles.calBtnText}>Move Up ↑</Text>
                </Pressable>
                <Pressable
                  onPress={() => setTripwireOffset((y) => Math.min(80, y + 5))}
                  style={styles.calBtn}>
                  <Text style={styles.calBtnText}>Move Down ↓</Text>
                </Pressable>
                <Pressable
                  onPress={() => setIsCalibrating(false)}
                  style={[styles.calBtn, { backgroundColor: Colors.primary }]}>
                  <Text style={styles.calBtnText}>Done</Text>
                </Pressable>
              </View>
            </View>
          ) : null}
        </View>

        {/* Bottom High-Contrast Telemetry HUD */}
        <View
          style={[
            styles.bottomHud,
            { paddingBottom: Math.max(insets.bottom, 16) },
          ]}>
          <View style={styles.grabber} />

          <View style={styles.totalRow}>
            <View>
              <Text style={styles.totalLabel}>● TOTAL INBOUND TODAY</Text>
              <View style={styles.totalValRow}>
                <Text style={styles.totalValue}>
                  {counts.total.toLocaleString()}
                </Text>
                <Text style={styles.totalTrend}>▲ 14.8%</Text>
              </View>
            </View>
            <View style={styles.shiftBox}>
              <Text style={styles.shiftBoxLabel}>SHIFT TIME</Text>
              <Text style={styles.shiftBoxVal}>01h 24m 18s</Text>
            </View>
            <View style={styles.shiftBox}>
              <Text style={styles.shiftBoxLabel}>EST. FLOW RATE</Text>
              <Text style={[styles.shiftBoxVal, { color: '#38BDF8' }]}>
                348 veh/hr
              </Text>
            </View>
          </View>

          {/* 4 Mini Category Counters */}
          <View style={styles.miniRow}>
            <HudCounter
              label="Cars"
              count={counts.cars}
              pct="60.3%"
              color={Colors.vehicleCar}
              icon="car"
              onPress={() => handleSimulateIncrement('cars')}
            />
            <HudCounter
              label="M/Cycles"
              count={counts.motorcycles}
              pct="25.8%"
              color={Colors.vehicleMoto}
              icon="motorbike"
              onPress={() => handleSimulateIncrement('motorcycles')}
            />
            <HudCounter
              label="Buses"
              count={counts.buses}
              pct="3.6%"
              color={Colors.vehicleBus}
              icon="bus"
              onPress={() => handleSimulateIncrement('buses')}
            />
            <HudCounter
              label="Trucks"
              count={counts.trucks}
              pct="10.3%"
              color={Colors.vehicleTruck}
              icon="truck"
              onPress={() => handleSimulateIncrement('trucks')}
            />
          </View>

          {/* Ergonomic Field Controls */}
          <View style={styles.controlsRow}>
            <Pressable
              onPress={() => setIsCalibrating((v) => !v)}
              style={[
                styles.controlBtn,
                styles.controlDark,
                isCalibrating && { borderColor: '#06B6D4' },
              ]}>
              <MaterialCommunityIcons
                name="tune-vertical"
                size={18}
                color="#38BDF8"
              />
              <Text style={styles.controlText}>Calibrate Line</Text>
            </Pressable>

            <Pressable
              onPress={() => setIsPaused((v) => !v)}
              style={[styles.controlBtn, styles.controlWarn]}>
              <MaterialCommunityIcons
                name={isPaused ? 'play-circle' : 'pause-circle'}
                size={18}
                color={Colors.statusWarning}
              />
              <Text style={[styles.controlText, { color: Colors.statusWarning }]}>
                {isPaused ? 'Resume' : 'Pause Stream'}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setStopModalVisible(true)}
              style={[styles.controlBtn, styles.controlStop]}>
              <MaterialCommunityIcons
                name="content-save"
                size={18}
                color={Colors.onPrimary}
              />
              <Text style={styles.controlText}>Stop & Save</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>

      <ConfirmModal
        visible={stopModalVisible}
        title="Stop & Save Session?"
        message={`End this live observation session with ${counts.total.toLocaleString()} counted vehicles and save to local SQLite?`}
        confirmLabel="Stop & Save"
        destructive
        onConfirm={() => {
          setStopModalVisible(false);
          router.replace('/sessions/session-001');
        }}
        onCancel={() => setStopModalVisible(false)}
      />
    </View>
  );
}

function HudCounter({
  label,
  count,
  pct,
  color,
  icon,
  onPress,
}: {
  label: string;
  count: number;
  pct: string;
  color: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.hudCounter, { borderColor: color }]}>
      <View style={styles.hudCounterTop}>
        <MaterialCommunityIcons name={icon} size={14} color={color} />
        <Text style={[styles.hudCounterPct, { color }]}>{pct}</Text>
      </View>
      <Text style={styles.hudCounterLabel}>{label}</Text>
      <Text style={styles.hudCounterVal}>{count}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0B1120' },
  cameraView: { flex: 1, justifyContent: 'space-between' },
  topHud: {
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    paddingHorizontal: Spacing.margin,
    paddingBottom: 10,
    gap: 8,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  closeBtn: {
    width: 30,
    height: 30,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  recDot: { width: 8, height: 8, borderRadius: BorderRadius.full },
  recText: {
    ...Typography.labelMd,
    fontFamily: Typography.counterMd.fontFamily,
    color: Colors.onPrimary,
    fontWeight: '700',
  },
  fpsPill: {
    backgroundColor: 'rgba(2, 132, 199, 0.25)',
    borderWidth: 1,
    borderColor: '#38BDF8',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.lg,
  },
  fpsText: { ...Typography.labelMd, fontSize: 10, color: '#38BDF8', fontWeight: '700' },
  topRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  hwPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.lg,
  },
  hwText: { ...Typography.labelMd, fontSize: 11, color: Colors.onPrimary },
  subBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  stationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.lg,
  },
  localDot: { width: 6, height: 6, borderRadius: BorderRadius.full, backgroundColor: Colors.statusSuccess },
  stationIdText: { ...Typography.labelMd, fontSize: 11, color: Colors.onPrimary, fontWeight: '700' },
  sqliteText: { ...Typography.labelMd, fontSize: 11, color: Colors.statusSuccess, flex: 1 },
  hudIcons: { flexDirection: 'row', gap: 6 },
  hudIconBtn: {
    width: 30,
    height: 30,
    borderRadius: BorderRadius.lg,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewNotice: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    borderRadius: BorderRadius.lg,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignSelf: 'center',
  },
  previewNoticeText: {
    ...Typography.labelMd,
    fontSize: 11,
    color: '#FDE68A',
  },
  overlayArea: { flex: 1, position: 'relative' },
  bbox: {
    position: 'absolute',
    borderWidth: 2,
    borderRadius: 4,
  },
  bboxCar: {
    top: '30%',
    left: '26%',
    width: 90,
    height: 75,
    borderColor: Colors.vehicleCar,
  },
  bboxTruck: {
    top: '34%',
    right: '14%',
    width: 115,
    height: 110,
    borderColor: Colors.vehicleTruck,
  },
  bboxTag: {
    position: 'absolute',
    top: -22,
    left: -2,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  bboxTagText: {
    ...Typography.labelMd,
    fontSize: 10,
    color: Colors.onPrimary,
    fontWeight: '700',
  },
  tripwireWrap: {
    position: 'absolute',
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tripwireHandle: {
    width: 12,
    height: 12,
    borderRadius: BorderRadius.full,
    backgroundColor: '#06B6D4',
    borderWidth: 2,
    borderColor: Colors.onPrimary,
  },
  tripwireLine: {
    flex: 1,
    height: 2.5,
    backgroundColor: '#06B6D4',
  },
  tripwireBadge: {
    position: 'absolute',
    alignSelf: 'center',
    left: '26%',
    top: -20,
    backgroundColor: 'rgba(6, 182, 212, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  tripwireBadgeText: {
    ...Typography.labelMd,
    fontSize: 10,
    color: '#0F172A',
    fontWeight: '700',
  },
  calibratePanel: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderRadius: BorderRadius.xl,
    padding: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: '#06B6D4',
  },
  calibrateText: { ...Typography.labelMd, color: '#38BDF8', textAlign: 'center' },
  calibrateBtns: { flexDirection: 'row', justifyContent: 'center', gap: 8 },
  calBtn: {
    backgroundColor: 'rgba(255,255,255,0.14)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: BorderRadius.lg,
  },
  calBtnText: { ...Typography.labelMd, color: Colors.onPrimary, fontWeight: '700' },
  bottomHud: {
    backgroundColor: 'rgba(15, 23, 42, 0.94)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: Spacing.margin,
    paddingTop: 10,
    gap: 12,
  },
  grabber: {
    width: 36,
    height: 4,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignSelf: 'center',
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  totalLabel: {
    ...Typography.labelMd,
    fontSize: 10,
    color: '#38BDF8',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  totalValRow: { flexDirection: 'row', alignItems: 'baseline', gap: 8 },
  totalValue: {
    ...Typography.counterLg,
    fontSize: 32,
    color: Colors.onPrimary,
  },
  totalTrend: { ...Typography.labelMd, color: Colors.statusSuccess, fontWeight: '700' },
  shiftBox: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: BorderRadius.lg,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 2,
  },
  shiftBoxLabel: { ...Typography.labelMd, fontSize: 9, color: Colors.textMuted },
  shiftBoxVal: {
    ...Typography.bodySm,
    fontFamily: Typography.counterMd.fontFamily,
    color: Colors.onPrimary,
    fontWeight: '700',
  },
  miniRow: { flexDirection: 'row', gap: 6 },
  hudCounter: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: 8,
    gap: 2,
  },
  hudCounterTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hudCounterPct: { ...Typography.labelMd, fontSize: 9, fontWeight: '700' },
  hudCounterLabel: { ...Typography.labelMd, fontSize: 10, color: Colors.textMuted },
  hudCounterVal: {
    ...Typography.bodyLg,
    fontFamily: Typography.counterMd.fontFamily,
    color: Colors.onPrimary,
    fontWeight: '700',
  },
  controlsRow: { flexDirection: 'row', gap: 8 },
  controlBtn: {
    flex: 1,
    height: 44,
    borderRadius: BorderRadius.button,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
  },
  controlDark: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderColor: 'rgba(255,255,255,0.16)',
  },
  controlWarn: {
    backgroundColor: 'rgba(245, 158, 11, 0.16)',
    borderColor: 'rgba(245, 158, 11, 0.45)',
  },
  controlStop: {
    backgroundColor: '#E11D48',
    borderColor: '#E11D48',
  },
  controlText: {
    ...Typography.labelMd,
    color: Colors.onPrimary,
    fontWeight: '700',
  },
});
