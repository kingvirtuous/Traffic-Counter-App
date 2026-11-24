import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  AppHeader,
  Badge,
  Button,
  Card,
  ConfirmModal,
} from '@/src/components';
import { BorderRadius, Colors, Spacing, Typography } from '@/src/constants';
import { CountingDirection } from '@/src/types';

export default function SettingsScreen() {
  const [debounce, setDebounce] = useState(1.5);
  const [confidence, setConfidence] = useState(75);
  const [direction, setDirection] = useState<CountingDirection>('bidirectional');
  const [keepAwake, setKeepAwake] = useState(true);
  const [lowPower, setLowPower] = useState(true);
  const [thermalSafe, setThermalSafe] = useState(true);
  const [cloudSync, setCloudSync] = useState(false);
  const [endpoint, setEndpoint] = useState('https://api.traffic-count.local');
  const [clearCacheVisible, setClearCacheVisible] = useState(false);

  return (
    <View style={styles.screen}>
      <AppHeader
        title="Application Settings"
        subtitle="System Parameters"
        stationId="ST-402"
        showBack
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        {/* Field Survey Preferences */}
        <Text style={styles.sectionHeader}>FIELD SURVEY PREFERENCES</Text>
        <Card style={styles.card}>
          <Text style={styles.fieldTitle}>Default Observation Window</Text>
          <View style={styles.selectBox}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={18}
              color={Colors.textSecondary}
            />
            <Text style={styles.selectText}>07:00 AM - 19:00 PM (12 Hours)</Text>
          </View>

          <View style={styles.rowBetween}>
            <View style={{ flex: 1 }}>
              <Text style={styles.fieldTitle}>Tripwire Debounce</Text>
              <Text style={styles.fieldSub}>
                Prevents multi-counting slow-moving vehicles across virtual
                tripwires.
              </Text>
            </View>
            <View style={styles.stepper}>
              <Pressable
                onPress={() => setDebounce((d) => Math.max(0.5, +(d - 0.5).toFixed(1)))}
                style={styles.stepBtn}>
                <Text style={styles.stepText}>-</Text>
              </Pressable>
              <Text style={styles.stepVal}>{debounce.toFixed(1)}s</Text>
              <Pressable
                onPress={() => setDebounce((d) => Math.min(3.0, +(d + 0.5).toFixed(1)))}
                style={styles.stepBtn}>
                <Text style={styles.stepText}>+</Text>
              </Pressable>
            </View>
          </View>

          <Text style={styles.fieldTitle}>Default Counting Vector</Text>
          <View style={styles.dirRow}>
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

          <View style={styles.rowBetween}>
            <View style={{ flex: 1 }}>
              <Text style={styles.fieldTitle}>Inference Threshold</Text>
              <Text style={styles.fieldSub}>
                Bounding box validation cut-off
              </Text>
            </View>
            <View style={styles.stepper}>
              <Pressable
                onPress={() => setConfidence((c) => Math.max(50, c - 5))}
                style={styles.stepBtn}>
                <Text style={styles.stepText}>-</Text>
              </Pressable>
              <Badge label={`${confidence}%`} variant="car" />
              <Pressable
                onPress={() => setConfidence((c) => Math.min(95, c + 5))}
                style={styles.stepBtn}>
                <Text style={styles.stepText}>+</Text>
              </Pressable>
            </View>
          </View>
        </Card>

        {/* Camera & Hardware Optimization */}
        <Text style={styles.sectionHeader}>CAMERA & HARDWARE OPTIMIZATION</Text>
        <Card style={styles.card}>
          <ToggleRow
            icon="cellphone"
            title="Keep Screen Active"
            subtitle="Maintain wake lock during active count sessions"
            value={keepAwake}
            onValueChange={setKeepAwake}
          />
          <ToggleRow
            icon="battery-heart-outline"
            title="Low Power Viewfinder"
            subtitle="Dim OLED array after 60s of field inactivity"
            value={lowPower}
            onValueChange={setLowPower}
          />
          <View style={styles.selectBox}>
            <MaterialCommunityIcons
              name="video-outline"
              size={18}
              color={Colors.textSecondary}
            />
            <Text style={styles.selectText}>1080p FHD @ 30 FPS</Text>
            <Badge label="Recommended" variant="motorcycle" />
          </View>
          <ToggleRow
            icon="thermometer-alert"
            title="Thermal Safe Mode"
            subtitle="Halt background pipeline when sensor exceeds 42°C"
            value={thermalSafe}
            onValueChange={setThermalSafe}
          />
        </Card>

        {/* Offline Data Storage */}
        <Text style={styles.sectionHeader}>OFFLINE DATA STORAGE (SQLITE)</Text>
        <Card style={styles.card}>
          <View style={styles.localSecurePill}>
            <MaterialCommunityIcons
              name="shield-check"
              size={18}
              color={Colors.vehicleCar}
            />
            <Text style={styles.localSecureText}>
              100% Local Offline Security (Zero remote retention)
            </Text>
          </View>

          <View style={styles.storageGrid}>
            <View style={styles.storageBox}>
              <Text style={styles.storageVal}>18.4 MB</Text>
              <Text style={styles.storageSub}>14 Local Sessions</Text>
            </View>
            <View style={styles.storageBox}>
              <Text style={styles.storageVal}>3.6 GB</Text>
              <Text style={styles.storageSub}>2 Video Recordings</Text>
            </View>
          </View>

          <Button
            title="Backup SQLite Database"
            onPress={() =>
              Alert.alert(
                'Phase 1 UI Preview',
                'SQLite database backup will be implemented in Phase 2.'
              )
            }
            leftIcon={
              <MaterialCommunityIcons
                name="database-export"
                size={18}
                color={Colors.onPrimary}
              />
            }
          />
          <Button
            title="Clear Cached Video Files (Free 3.6 GB)"
            variant="danger"
            onPress={() => setClearCacheVisible(true)}
            leftIcon={
              <MaterialCommunityIcons
                name="trash-can-outline"
                size={18}
                color={Colors.vehicleTruck}
              />
            }
          />
        </Card>

        {/* Connectivity & Backend Sync */}
        <Text style={styles.sectionHeader}>
          CONNECTIVITY & BACKEND SYNC (OPTIONAL)
        </Text>
        <Card style={styles.card}>
          <ToggleRow
            icon="cloud-sync-outline"
            title="Cloud Telemetry Sync"
            subtitle="Field data remains local until manual sync"
            value={cloudSync}
            onValueChange={setCloudSync}
          />
          <Text style={styles.fieldTitle}>Remote Inference Endpoint</Text>
          <View style={styles.endpointRow}>
            <TextInput
              value={endpoint}
              onChangeText={setEndpoint}
              style={styles.endpointInput}
              autoCapitalize="none"
            />
            <Pressable
              onPress={() =>
                Alert.alert(
                  'Endpoint Test',
                  'Remote AI backend connectivity will be implemented in Phase 5.'
                )
              }
              style={styles.testBtn}>
              <Text style={styles.testBtnText}>Test</Text>
            </Pressable>
          </View>
        </Card>

        {/* About & System Diagnostics */}
        <Text style={styles.sectionHeader}>ABOUT & SYSTEM DIAGNOSTICS</Text>
        <Card style={styles.card}>
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.fieldTitle}>Traffic Count Mobile</Text>
              <Text style={styles.fieldSub}>v1.0.0-build.402</Text>
            </View>
            <Badge label="Phase 1 UI" variant="success" />
          </View>
          <View style={styles.stackPills}>
            {['Expo', 'React Native', 'TypeScript', 'SQLite (Phase 2)'].map(
              (item) => (
                <Badge key={item} label={item} variant="subtle" />
              )
            )}
          </View>
        </Card>
      </ScrollView>

      <ConfirmModal
        visible={clearCacheVisible}
        title="Clear Cached Video Files?"
        message="This will remove temporary video files (3.6 GB). Your SQLite session records and count events will NOT be deleted."
        confirmLabel="Clear Cache"
        destructive
        onConfirm={() => {
          setClearCacheVisible(false);
          Alert.alert('Cache Cleared', 'Simulated cache cleanup complete.');
        }}
        onCancel={() => setClearCacheVisible(false)}
      />
    </View>
  );
}

function ToggleRow({
  icon,
  title,
  subtitle,
  value,
  onValueChange,
}: {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  subtitle: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
}) {
  return (
    <View style={styles.toggleRow}>
      <MaterialCommunityIcons name={icon} size={20} color={Colors.textSecondary} />
      <View style={{ flex: 1 }}>
        <Text style={styles.fieldTitle}>{title}</Text>
        <Text style={styles.fieldSub}>{subtitle}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: Colors.borders, true: Colors.primaryDark }}
        thumbColor={Colors.surface}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.backgroundCanvas },
  scroll: { flex: 1 },
  content: { padding: Spacing.margin, gap: Spacing.sm, paddingBottom: Spacing.xl },
  sectionHeader: {
    ...Typography.labelMd,
    fontWeight: '700',
    letterSpacing: 0.7,
    color: Colors.textMuted,
    marginTop: Spacing.sm,
    paddingHorizontal: 2,
  },
  card: { gap: 12 },
  fieldTitle: { ...Typography.bodyMd, fontWeight: '700', color: Colors.textPrimary },
  fieldSub: { ...Typography.bodySm, color: Colors.textSecondary },
  selectBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.subtleSurface,
    padding: 12,
    borderRadius: BorderRadius.xl,
  },
  selectText: { ...Typography.bodyMd, color: Colors.textPrimary, flex: 1 },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  stepBtn: {
    width: 30,
    height: 30,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.subtleSurface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.borders,
  },
  stepText: { ...Typography.bodyLg, fontWeight: '700', color: Colors.textPrimary },
  stepVal: { ...Typography.bodyMd, fontFamily: Typography.counterMd.fontFamily, fontWeight: '700', color: Colors.primaryDark },
  dirRow: { flexDirection: 'row', gap: 8 },
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
  toggleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  localSecurePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.vehicleCarTint,
    padding: 10,
    borderRadius: BorderRadius.lg,
  },
  localSecureText: { ...Typography.labelMd, color: Colors.vehicleCar, fontWeight: '700', flex: 1 },
  storageGrid: { flexDirection: 'row', gap: 8 },
  storageBox: { flex: 1, backgroundColor: Colors.subtleSurface, padding: 12, borderRadius: BorderRadius.xl, gap: 2 },
  storageVal: { ...Typography.headlineMd, fontFamily: Typography.counterMd.fontFamily, color: Colors.textPrimary },
  storageSub: { ...Typography.bodySm, color: Colors.textSecondary },
  endpointRow: { flexDirection: 'row', gap: 8 },
  endpointInput: {
    flex: 1,
    backgroundColor: Colors.subtleSurface,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: 12,
    height: 40,
    ...Typography.bodySm,
    color: Colors.textPrimary,
  },
  testBtn: {
    backgroundColor: Colors.primaryFixed,
    paddingHorizontal: 14,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  testBtnText: { ...Typography.labelMd, color: Colors.onPrimaryFixed, fontWeight: '700' },
  stackPills: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
});
