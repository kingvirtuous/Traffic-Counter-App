/**
 * Traffic Count — Core Type Definitions
 */

import { VehicleCategory } from '../constants/vehicles';

// ─── Session Types ───────────────────────────────────────────────

export type SessionSource = 'live_camera' | 'video_import';
export type SessionStatus = 'in_progress' | 'completed' | 'verified' | 'failed';
export type SyncStatus = 'local' | 'synced' | 'pending';
export type CountingDirection = 'inbound' | 'outbound' | 'bidirectional';

export interface TrafficSession {
  id: string;
  stationId: string;
  locationName: string;
  corridor?: string;
  startTime: string; // ISO-8601
  endTime?: string;
  durationMinutes: number;
  source: SessionSource;
  status: SessionStatus;
  totalVehicles: number;
  cars: number;
  motorcycles: number;
  buses: number;
  trucks: number;
  confidenceAvg: number;
  duplicatesSuppressed: number;
  syncStatus: SyncStatus;
  direction: CountingDirection;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Count Event Types ───────────────────────────────────────────

export interface CountEvent {
  id: string;
  sessionId: string;
  trackingId: number;
  timestamp: string; // ISO-8601 epoch ms
  vehicleCategory: VehicleCategory;
  confidence: number; // 0–100
  direction: 'inbound' | 'outbound';
  crossingLineId: number;
}

// ─── Hourly Summary Types ────────────────────────────────────────

export interface HourlySummary {
  id: string;
  sessionId: string;
  hour: number; // 0–23
  totalVehicles: number;
  cars: number;
  motorcycles: number;
  buses: number;
  trucks: number;
  inbound: number;
  outbound: number;
}

// ─── Processing Job Types ────────────────────────────────────────

export type ProcessingStatus = 'queued' | 'processing' | 'completed' | 'failed' | 'cancelled';

export interface ProcessingJob {
  id: string;
  sessionId: string;
  videoPath: string;
  status: ProcessingStatus;
  progress: number; // 0–100
  framesProcessed: number;
  totalFrames: number;
  processingRate: number; // fps
  etaSeconds: number;
  error?: string;
}

// ─── Video Metadata ──────────────────────────────────────────────

export interface VideoMetadata {
  filename: string;
  resolution: string;
  duration: string;
  fps: number;
  codec: string;
  fileSize: string;
  fileSizeBytes: number;
}

// ─── Report Types ────────────────────────────────────────────────

export type ReportFormat = 'fhwa_csv' | 'summary_matrix';

export interface GeneratedReport {
  id: string;
  filename: string;
  sessionId?: string;
  format: ReportFormat;
  createdAt: string;
  fileSize: string;
  fileSizeBytes: number;
  recordCount: number;
  badge?: string; // e.g., 'FHWA Verified', 'AASHTO Schema'
}

// ─── Analytics Types ─────────────────────────────────────────────

export type DateRange = '7d' | '30d' | '90d' | 'custom';

export interface AnalyticsSummary {
  averageDailyTraffic: number;
  totalVolume: number;
  activeStations: number;
  peakLoad: number;
  peakLoadDate: string;
  trendPercentage: number;
  dateRange: DateRange;
}

export interface CorridorRanking {
  rank: number;
  stationName: string;
  stationType: string;
  totalVehicles: number;
  percentage: number;
}

// ─── Chart Types ─────────────────────────────────────────────────

export interface HourlyDataPoint {
  hour: string; // e.g., '07-08h'
  value: number;
  isPeak?: boolean;
  isInProgress?: boolean;
}

export interface VehicleSplit {
  category: VehicleCategory;
  count: number;
  percentage: number;
}

// ─── Settings Types ──────────────────────────────────────────────

export interface AppSettings {
  defaultShiftStart: string;
  defaultShiftEnd: string;
  debounceWindow: number; // seconds
  defaultDirection: CountingDirection;
  confidenceThreshold: number; // 0–100
  keepScreenAwake: boolean;
  lowPowerViewfinder: boolean;
  cameraResolution: string;
  thermalSafeMode: boolean;
  cloudSyncEnabled: boolean;
  remoteEndpoint?: string;
}
