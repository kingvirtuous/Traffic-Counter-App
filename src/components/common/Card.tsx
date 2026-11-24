import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { BorderRadius, Colors, Elevation, Spacing } from '@/src/constants';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
  elevated?: boolean;
}

export function Card({
  children,
  style,
  padding = Spacing.md,
  elevated = false,
}: CardProps) {
  return (
    <View
      style={[
        styles.card,
        elevated ? Elevation.level2 : Elevation.level1,
        { padding },
        style,
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.borders,
  },
});
