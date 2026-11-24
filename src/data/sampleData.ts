/**
 * Traffic Count — Sample Data
 *
 * ⚠️ SAMPLE DATA — This is demo data for UI development only.
 * Not real collected traffic records.
 */

import {
  TrafficSession,
  HourlySummary,
  HourlyDataPoint,
  VehicleSplit,
  AnalyticsSummary,
  CorridorRanking,
  GeneratedReport,
  VideoMetadata,
} from '../types';

// ─── Sample Sessions ─────────────────────────────────────────────

export const SAMPLE_SESSIONS: TrafficSession[] = [
  {
    id: 'session-001',
    stationId: 'ST-402',
    locationName: 'Station 104 - Highway Junction',
    corridor: 'Northbound Corridor',
    startTime: '2026-11-24T07:00:00Z',
    endTime: undefined,
    durationMinutes: 195,
    source: 'live_camera',
    status: 'in_progress',
    totalVehicles: 1482,
    cars: 894,
    motorcycles: 382,
    buses: 54,
    trucks: 152,
    confidenceAvg: 96.2,
    duplicatesSuppressed: 23,
    syncStatus: 'local',
    direction: 'bidirectional',
    notes: 'Morning rush hour observation',
    createdAt: '2026-11-24T07:00:00Z',
    updatedAt: '2026-11-24T10:15:00Z',
  },
  {
    id: 'session-002',
    stationId: 'ST-402',
    locationName: 'Arterial Route 12 - South Gate',
    corridor: 'South Gate Crossing & Interchange',
    startTime: '2026-11-20T07:00:00Z',
    endTime: '2026-11-20T19:00:00Z',
    durationMinutes: 720,
    source: 'video_import',
    status: 'verified',
    totalVehicles: 8924,
    cars: 5618,
    motorcycles: 2110,
    buses: 314,
    trucks: 882,
    confidenceAvg: 98.4,
    duplicatesSuppressed: 42,
    syncStatus: 'synced',
    direction: 'bidirectional',
    createdAt: '2026-11-20T07:00:00Z',
    updatedAt: '2026-11-20T19:30:00Z',
  },
  {
    id: 'session-003',
    stationId: 'ST-402',
    locationName: 'Bypass Ring Rd - Survey #3',
    corridor: 'Outer Perimeter Collector',
    startTime: '2026-11-19T14:00:00Z',
    endTime: '2026-11-19T16:00:00Z',
    durationMinutes: 120,
    source: 'video_import',
    status: 'completed',
    totalVehicles: 1208,
    cars: 840,
    motorcycles: 195,
    buses: 45,
    trucks: 128,
    confidenceAvg: 95.1,
    duplicatesSuppressed: 18,
    syncStatus: 'local',
    direction: 'bidirectional',
    createdAt: '2026-11-19T14:00:00Z',
    updatedAt: '2026-11-19T16:30:00Z',
  },
];

// ─── Current Dashboard Data (SAMPLE) ────────────────────────────

export const SAMPLE_DASHBOARD = {
  stationId: 'ST-402',
  locationName: 'Station #104 Arterial Bypass',
  corridor: 'Northbound Corridor • KM 14.2',
  isOnline: true,
  shiftStart: '07:00',
  shiftEnd: '19:00',
  shiftElapsed: '4h 15m',
  isShiftActive: true,

  todayTotal: 1482,
  liveFlowRate: 348,
  peakVariance: 12.4,
  lastVehicleAgo: '12s',
  syncId: '#9842',

  classification: {
    cars: { count: 894, percentage: 60.3 },
    motorcycles: { count: 382, percentage: 25.8 },
    trucks: { count: 152, percentage: 10.3 },
    buses: { count: 54, percentage: 3.6 },
  },
};

// ─── Sample Hourly Data ──────────────────────────────────────────

export const SAMPLE_HOURLY_DATA: HourlyDataPoint[] = [
  { hour: '07-08h', value: 215 },
  { hour: '08-09h', value: 428, isPeak: true },
  { hour: '09-10h', value: 384 },
  { hour: '10-11h', value: 310 },
  { hour: '11-12h', value: 145, isInProgress: true },
];

// ─── Sample Vehicle Split ────────────────────────────────────────

export const SAMPLE_VEHICLE_SPLIT: VehicleSplit[] = [
  { category: 'car', count: 27398, percentage: 64.0 },
  { category: 'motorcycle', count: 9418, percentage: 22.0 },
  { category: 'truck', count: 4281, percentage: 10.0 },
  { category: 'bus', count: 1713, percentage: 4.0 },
];

// ─── Sample Analytics Summary ────────────────────────────────────

export const SAMPLE_ANALYTICS: AnalyticsSummary = {
  averageDailyTraffic: 6115.7,
  totalVolume: 42810,
  activeStations: 6,
  peakLoad: 1240,
  peakLoadDate: 'Nov 18',
  trendPercentage: 5.4,
  dateRange: '7d',
};

// ─── Sample Corridor Rankings ────────────────────────────────────

export const SAMPLE_CORRIDORS: CorridorRanking[] = [
  {
    rank: 1,
    stationName: 'Route 12 Arterial',
    stationType: 'South Gate • Bidirectional',
    totalVehicles: 18420,
    percentage: 43.0,
  },
  {
    rank: 2,
    stationName: 'Station 104 Highway Jct',
    stationType: 'Northbound Ramp & Merge',
    totalVehicles: 14210,
    percentage: 33.2,
  },
  {
    rank: 3,
    stationName: 'Bypass Ring Road',
    stationType: 'Outer Perimeter Collector',
    totalVehicles: 10180,
    percentage: 23.8,
  },
];

// ─── Sample Reports ──────────────────────────────────────────────

export const SAMPLE_REPORTS: GeneratedReport[] = [
  {
    id: 'report-001',
    filename: 'Route12_Survey_20261120....',
    sessionId: 'session-002',
    format: 'fhwa_csv',
    createdAt: '2026-11-20T19:30:00Z',
    fileSize: '248 KB',
    fileSizeBytes: 253952,
    recordCount: 8924,
    badge: 'FHWA Verified',
  },
  {
    id: 'report-002',
    filename: 'Station104_Composite_W47...',
    sessionId: undefined,
    format: 'summary_matrix',
    createdAt: '2026-11-18T18:00:00Z',
    fileSize: '890 KB',
    fileSizeBytes: 911360,
    recordCount: 14210,
    badge: 'AASHTO Schema',
  },
];

// ─── Sample Session Detail ───────────────────────────────────────

export const SAMPLE_SESSION_DETAIL = {
  ...SAMPLE_SESSIONS[1],
  avgFlowRate: 743.6,
  peakFlowRate: 1120,
  peakFlowHour: '08:00',
  classificationSplit: [
    { category: 'car' as const, label: 'Passenger Cars', count: 5618, percentage: 62.9 },
    { category: 'motorcycle' as const, label: 'Motorcycles', count: 2110, percentage: 23.6 },
    { category: 'truck' as const, label: 'Heavy Trucks & Articulated', count: 890, percentage: 10.0 },
    { category: 'bus' as const, label: 'Transit Buses', count: 314, percentage: 3.5 },
  ],
  directionalSplit: {
    inbound: { count: 4812, percentage: 53.9, peakTime: '08:30 AM' },
    outbound: { count: 4112, percentage: 46.1, peakTime: '17:15 PM' },
  },
  hourlyDistribution: [
    { hour: '07h', value: 580 },
    { hour: '08h', value: 1120, isPeak: true },
    { hour: '09h', value: 980 },
    { hour: '10h', value: 750 },
    { hour: '11h', value: 680 },
    { hour: '12h', value: 620 },
    { hour: '13h', value: 590 },
    { hour: '14h', value: 650 },
    { hour: '15h', value: 780 },
    { hour: '16h', value: 920 },
    { hour: '17h', value: 1050 },
    { hour: '18h', value: 304 },
  ],
  detectorModel: 'YOLOv8-Traffic / TensorRT FP16',
  tripwireConfig: 'Line A (Mid-Screen Y:540) Bidirectional',
  checksum: 'sha256:7f8a92e401b...c841',
};

// ─── Sample Commute Curve ────────────────────────────────────────

export const SAMPLE_COMMUTE_CURVE = {
  amPeak: { time: '08:15 AM', volume: 1240 },
  pmPeak: { time: '17:45 PM', volume: 1180 },
  hourlyData: [
    { hour: '06h', value: 320 },
    { hour: '07h', value: 780 },
    { hour: '08h', value: 1240 },
    { hour: '09h', value: 980 },
    { hour: '10h', value: 650 },
    { hour: '11h', value: 580 },
    { hour: '12h', value: 620 },
    { hour: '13h', value: 590 },
    { hour: '14h', value: 650 },
    { hour: '15h', value: 780 },
    { hour: '16h', value: 950 },
    { hour: '17h', value: 1180 },
    { hour: '18h', value: 850 },
    { hour: '19h', value: 520 },
    { hour: '20h', value: 350 },
    { hour: '21h', value: 220 },
  ],
};

// ─── Sample Video Metadata ───────────────────────────────────────

export const SAMPLE_VIDEO_METADATA: VideoMetadata = {
  filename: 'highway_junction_am_rush.mp4',
  resolution: '1080p @ 30fps',
  duration: '01:00:00',
  fps: 30,
  codec: 'H.264 / AAC',
  fileSize: '1.84 GB',
  fileSizeBytes: 1975684956,
};
