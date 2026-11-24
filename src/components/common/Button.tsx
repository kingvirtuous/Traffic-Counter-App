import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { BorderRadius, Colors, Elevation, Spacing, Typography } from '@/src/constants';

export type ButtonVariant = 'primary' | 'secondary' | 'subtle' | 'danger' | 'outline';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  leftIcon,
  rightIcon,
  disabled = false,
  style,
  textStyle,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        VARIANT_STYLES[variant],
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}>
      {leftIcon ? <View style={styles.leftIcon}>{leftIcon}</View> : null}
      <Text
        style={[
          styles.label,
          VARIANT_TEXT_STYLES[variant],
          textStyle,
        ]}
        numberOfLines={1}>
        {title}
      </Text>
      {rightIcon ? <View style={styles.rightIcon}>{rightIcon}</View> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 46,
    borderRadius: BorderRadius.button,
    paddingHorizontal: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
  disabled: {
    opacity: 0.5,
  },
  leftIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightIcon: {
    marginLeft: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    ...Typography.bodyMd,
    fontWeight: '600',
  },
});

const VARIANT_STYLES: Record<ButtonVariant, ViewStyle> = {
  primary: {
    backgroundColor: Colors.primaryDark,
    ...Elevation.level1,
  },
  secondary: {
    backgroundColor: Colors.secondaryContainer,
  },
  subtle: {
    backgroundColor: Colors.subtleSurface,
    borderWidth: 1,
    borderColor: Colors.borders,
  },
  danger: {
    backgroundColor: Colors.vehicleTruckTint,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  outline: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.borders,
  },
};

const VARIANT_TEXT_STYLES: Record<ButtonVariant, TextStyle> = {
  primary: { color: Colors.onPrimary },
  secondary: { color: Colors.onSecondaryContainer },
  subtle: { color: Colors.textPrimary },
  danger: { color: Colors.vehicleTruck },
  outline: { color: Colors.textPrimary },
};
