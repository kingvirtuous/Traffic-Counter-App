import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BorderRadius, Colors, Spacing, Typography } from '@/src/constants';

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  stationId?: string;
  isOnline?: boolean;
  showBack?: boolean;
  rightAction?: React.ReactNode;
}

export function AppHeader({
  title = 'Traffic Count',
  subtitle = 'Survey Dashboard',
  stationId = 'ST-402',
  isOnline = true,
  showBack = false,
  rightAction,
}: AppHeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingTop: insets.top }]}>
      <View style={styles.bar}>
        <View style={styles.left}>
          {showBack ? (
            <Pressable
              onPress={() => router.back()}
              style={styles.backBtn}
              accessibilityLabel="Go back">
              <MaterialCommunityIcons
                name="arrow-left"
                size={22}
                color={Colors.textPrimary}
              />
            </Pressable>
          ) : (
            <View style={styles.logoBox}>
              <MaterialCommunityIcons
                name="road-variant"
                size={20}
                color={Colors.onPrimary}
              />
            </View>
          )}
          <View style={styles.titleGroup}>
            <View style={styles.titleRow}>
              <Text style={styles.title} numberOfLines={1}>
                {title}
              </Text>
              {stationId ? (
                <View style={styles.stationBadge}>
                  <Text style={styles.stationText}>{stationId}</Text>
                </View>
              ) : null}
            </View>
            {subtitle ? (
              <Text style={styles.subtitle} numberOfLines={1}>
                {subtitle}
              </Text>
            ) : null}
          </View>
        </View>

        <View style={styles.right}>
          {rightAction ? (
            rightAction
          ) : (
            <>
              <View style={styles.statusPill}>
                <View
                  style={[
                    styles.statusDot,
                    {
                      backgroundColor: isOnline
                        ? Colors.statusSuccess
                        : Colors.statusOffline,
                    },
                  ]}
                />
                <Text style={styles.statusLabel}>
                  {isOnline ? 'ONLINE' : 'OFFLINE'}
                </Text>
              </View>
              <Pressable
                onPress={() => router.push('/settings')}
                style={styles.settingsBtn}
                accessibilityLabel="Open settings">
                <MaterialCommunityIcons
                  name="cog-outline"
                  size={19}
                  color={Colors.onPrimary}
                />
              </Pressable>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borders,
  },
  bar: {
    height: 60,
    paddingHorizontal: Spacing.margin,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flex: 1,
    minWidth: 0,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBox: {
    width: 34,
    height: 34,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleGroup: {
    flex: 1,
    minWidth: 0,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    ...Typography.headlineSm,
    color: Colors.textPrimary,
    flexShrink: 1,
  },
  stationBadge: {
    backgroundColor: Colors.primaryFixed,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  stationText: {
    ...Typography.labelMd,
    fontSize: 11,
    fontWeight: '700',
    color: Colors.onPrimaryFixed,
  },
  subtitle: {
    ...Typography.labelMd,
    color: Colors.textSecondary,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.subtleSurface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: BorderRadius.full,
  },
  statusLabel: {
    ...Typography.labelMd,
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textSecondary,
    letterSpacing: 0.5,
  },
  settingsBtn: {
    width: 34,
    height: 34,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
