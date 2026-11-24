/**
 * Traffic Count — Vehicle Configuration Constants
 */

import { Colors } from './colors';

export type VehicleCategory = 'car' | 'motorcycle' | 'bus' | 'truck';

export interface VehicleCategoryConfig {
  key: VehicleCategory;
  label: string;
  shortLabel: string;
  icon: string; // MaterialCommunityIcons name
  color: string;
  tintColor: string;
}

export const VEHICLE_CATEGORIES: VehicleCategoryConfig[] = [
  {
    key: 'car',
    label: 'Passenger Cars',
    shortLabel: 'Cars',
    icon: 'car',
    color: Colors.vehicleCar,
    tintColor: Colors.vehicleCarTint,
  },
  {
    key: 'motorcycle',
    label: 'Motorcycles',
    shortLabel: 'M/Cycles',
    icon: 'motorbike',
    color: Colors.vehicleMoto,
    tintColor: Colors.vehicleMotoTint,
  },
  {
    key: 'bus',
    label: 'Transit Buses',
    shortLabel: 'Buses',
    icon: 'bus',
    color: Colors.vehicleBus,
    tintColor: Colors.vehicleBusTint,
  },
  {
    key: 'truck',
    label: 'Heavy Trucks',
    shortLabel: 'Trucks',
    icon: 'truck',
    color: Colors.vehicleTruck,
    tintColor: Colors.vehicleTruckTint,
  },
];

export const DEFAULT_SHIFT_START = '07:00';
export const DEFAULT_SHIFT_END = '19:00';
export const DEFAULT_CONFIDENCE_THRESHOLD = 75;
export const DEFAULT_DEBOUNCE_WINDOW = 1.5; // seconds
export const DEFAULT_COUNTING_DIRECTION = 'bidirectional' as const;
export const DEFAULT_CAMERA_RESOLUTION = '1080p';
export const DEFAULT_CAMERA_FPS = 30;
