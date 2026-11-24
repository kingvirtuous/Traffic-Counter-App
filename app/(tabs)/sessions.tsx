import React, { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  AppHeader,
  Button,
  Card,
  OfflineBanner,
  SessionCard,
} from '@/src/components';
import { BorderRadius, Colors, Spacing, Typography } from '@/src/constants';
import { SAMPLE_SESSIONS } from '@/src/data/sampleData';

type FilterType = 'all' | 'live_camera' | 'video_import' | 'completed' | 'in_progress';

const FILTERS: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'live_camera', label: 'Live Camera' },
  { key: 'video_import', label: 'Video Import' },
  { key: 'completed', label: 'Completed' },
  { key: 'in_progress', label: 'In Progress' },
];

export default function SessionsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredSessions = useMemo(() => {
    return SAMPLE_SESSIONS.filter((session) => {
      const matchesFilter =
        activeFilter === 'all' ||
        (activeFilter === 'live_camera' && session.source === 'live_camera') ||
        (activeFilter === 'video_import' && session.source === 'video_import') ||
        (activeFilter === 'in_progress' && session.status === 'in_progress') ||
        (activeFilter === 'completed' &&
          (session.status === 'completed' || session.status === 'verified'));

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        session.locationName.toLowerCase().includes(q) ||
        session.stationId.toLowerCase().includes(q) ||
        (session.corridor?.toLowerCase().includes(q) ?? false) ||
        (session.notes?.toLowerCase().includes(q) ?? false);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <View style={styles.screen}>
      <AppHeader
        title="Traffic Count"
        subtitle="Survey Dashboard"
        stationId="ST-402"
        isOnline
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        {/* Title & New Survey CTA */}
        <View style={styles.topRow}>
          <View style={styles.topLeft}>
            <Text style={styles.pageTitle}>Traffic Sessions</Text>
            <View style={styles.dbSubRow}>
              <MaterialCommunityIcons
                name="database-outline"
                size={14}
                color={Colors.textSecondary}
              />
              <Text style={styles.dbSubText}>
                Station #ST-402 • SQLite Stored
              </Text>
            </View>
          </View>
          <Button
            title="New Survey"
            onPress={() => router.push('/counting/live')}
            leftIcon={
              <MaterialCommunityIcons
                name="plus"
                size={18}
                color={Colors.onPrimary}
              />
            }
            style={styles.newBtn}
          />
        </View>

        <OfflineBanner showSampleTag />

        {/* Search Input */}
        <View style={styles.searchWrap}>
          <MaterialCommunityIcons
            name="magnify"
            size={20}
            color={Colors.textMuted}
          />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search station, corridor, or note..."
            placeholderTextColor={Colors.textMuted}
            style={styles.searchInput}
          />
          {searchQuery.length > 0 ? (
            <Pressable onPress={() => setSearchQuery('')}>
              <MaterialCommunityIcons
                name="close-circle"
                size={18}
                color={Colors.textMuted}
              />
            </Pressable>
          ) : null}
        </View>

        {/* Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsRow}>
          {FILTERS.map((filter) => {
            const active = activeFilter === filter.key;
            return (
              <Pressable
                key={filter.key}
                onPress={() => setActiveFilter(filter.key)}
                style={[styles.chip, active && styles.chipActive]}>
                <Text
                  style={[styles.chipText, active && styles.chipTextActive]}>
                  {filter.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Session List or Empty State */}
        {filteredSessions.length > 0 ? (
          <View style={styles.list}>
            {filteredSessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                onPress={() => router.push(`/sessions/${session.id}`)}
              />
            ))}
          </View>
        ) : (
          <Card style={styles.emptyCard}>
            <MaterialCommunityIcons
              name="clipboard-text-search-outline"
              size={44}
              color={Colors.textMuted}
            />
            <Text style={styles.emptyTitle}>No matching sessions</Text>
            <Text style={styles.emptyDesc}>
              Try adjusting your search query or filter selection, or start a new
              traffic observation session.
            </Text>
            <Button
              title="Reset Filters"
              variant="subtle"
              onPress={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
            />
          </Card>
        )}

        {/* Offline Integrity Notice */}
        <View style={styles.footerNote}>
          <MaterialCommunityIcons
            name="shield-check-outline"
            size={18}
            color={Colors.vehicleCar}
          />
          <Text style={styles.footerNoteText}>
            All session logs are stored offline in local SQLite with
            cryptographic audit hashes.
          </Text>
        </View>
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
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  topLeft: {
    flex: 1,
    gap: 2,
  },
  pageTitle: {
    ...Typography.headlineMd,
    color: Colors.textPrimary,
  },
  dbSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  dbSubText: {
    ...Typography.bodySm,
    color: Colors.textSecondary,
  },
  newBtn: {
    height: 40,
    paddingHorizontal: 14,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.borders,
    paddingHorizontal: 12,
    height: 44,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    ...Typography.bodyMd,
    color: Colors.textPrimary,
  },
  chipsRow: {
    gap: 8,
    paddingVertical: 2,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.borders,
  },
  chipActive: {
    backgroundColor: Colors.primaryDark,
    borderColor: Colors.primaryDark,
  },
  chipText: {
    ...Typography.labelMd,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  chipTextActive: {
    color: Colors.onPrimary,
  },
  list: {
    gap: Spacing.md,
  },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    gap: Spacing.sm,
  },
  emptyTitle: {
    ...Typography.headlineSm,
    color: Colors.textPrimary,
  },
  emptyDesc: {
    ...Typography.bodySm,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: Spacing.md,
  },
  footerNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.subtleSurface,
    padding: 12,
    borderRadius: BorderRadius.xl,
    gap: 10,
  },
  footerNoteText: {
    flex: 1,
    ...Typography.bodySm,
    color: Colors.textSecondary,
  },
});
