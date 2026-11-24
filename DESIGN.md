# Traffic Count Design System & Screen Specifications

## Overview
Traffic Count is a professional Android-first mobile application engineered for vehicular traffic observation, real-time counting, classification, and transportation analytics. It supports both live camera observation and recorded video analysis.

---

## 1. Design Tokens

### Color Palette
- **Mode**: Light (Primary) with dark mode token parity.
- **Brand Primary**: `#0284C7` (Sky 600) - Main actions, interactive highlights, peak bars.
- **Brand Secondary**: `#0F172A` (Slate 900) - Primary header surface, high-contrast HUD headers.
- **Background Canvas**: `#F8FAFC` (Slate 50) - Clean, high-legibility application background.
- **Surface**: `#FFFFFF` (White) - Cards, elevated modals, sheets.
- **Subtle Surface**: `#F1F5F9` (Slate 100) - Chips, filter pills, search input fills.
- **Borders**: `#E2E8F0` (Slate 200) - Hairline dividers, subtle card outlines.
- **Text Primary**: `#0F172A` (Slate 900) - High-contrast titles, tabular figures.
- **Text Secondary**: `#475569` (Slate 600) - Section labels, metadata.
- **Text Muted**: `#94A3B8` (Slate 400) - Timestamps, units, inactive tabs.

### Vehicle Classification Colors
- **Cars**: `#059669` (Emerald 600) | Background Tint: `#D1FAE5`
- **Motorcycles**: `#D97706` (Amber 600) | Background Tint: `#FEF3C7`
- **Buses**: `#7C3AED` (Violet 600) | Background Tint: `#EDE9FE`
- **Trucks**: `#DC2626` (Rose 600) | Background Tint: `#FEE2E2`

### Status & Feedback Colors
- **Success / Validated**: `#10B981` (Emerald 500)
- **Warning / Alert**: `#F59E0B` (Amber 500)
- **Error / Hardware Fault**: `#EF4444` (Red 500)
- **Offline / Stored Local**: `#64748B` (Slate 500)

### Typography
- **Headline Font**: `Inter`, `Roboto`, `sans-serif`
- **Body Font**: `Inter`, `sans-serif`
- **Monospace / Counters**: `JetBrains Mono`, `Roboto Mono` (Enforces tabular alignment for real-time counts)

### Shapes & Elevation
- **Card Radius**: `12px` (ROUND_TWELVE)
- **Pill / Badge Radius**: `999px` (ROUND_FULL)
- **Button Radius**: `10px`
- **Elevation / Shadows**: Subtle Android Material 3 elevation (Elevation 1: `0 1px 3px rgba(0,0,0,0.08)`, Elevation 2: `0 4px 6px rgba(0,0,0,0.1)`)

---

## 2. Navigation Architecture
- **Root Layout**: Bottom Tab Navigator with 4 primary destinations:
  1. `Dashboard` (`/index`)
  2. `Sessions` (`/sessions`)
  3. `Analytics` (`/analytics`)
  4. `Reports` (`/reports`)
- **Modal & Stack Routes**:
  - Live Traffic Counting (`/counting/live`) - Fullscreen camera HUD
  - Recorded Video Counting (`/counting/video`) - Importer & processing view
  - Session Details (`/sessions/[id]`) - Deep drill-down and audit
  - Settings (`/settings`) - System preferences and calibration

---

## 3. Screen Guidelines

### Screen 1: Dashboard
- Welcome header with Station ID and active shift timer (e.g., 07:00 - 19:00).
- Offline indicator banner clearly stating "All records safely saved to local SQLite".
- Hero metric: Today's Total Vehicles with tabular numeral display.
- 4 Classification count cards (Cars, Motorcycles, Buses, Trucks) with distinct badge colors.
- Two prominent field action cards:
  - "Start Live Counting (Phone Camera)"
  - "Import Recorded Video (MP4 / MOV)"
- Hourly traffic trend bar chart.
- Recent session list with quick navigation.

### Screen 2: Live Traffic Counting
- Fullscreen camera viewfinder feed with 30fps indicator.
- Configurable virtual counting line (neon cyan, draggable endpoints, directional arrow).
- Live bounding boxes around detected vehicles with category chips and confidence percentages.
- High-contrast HUD overlay at bottom:
  - Big bold tabular total counter.
  - 4 mini counters with category icons.
  - Elapsed duration timer.
- Ergonomic field controls: Pause, Calibrate Line, and "Stop & Save Session".
- Hardware status badges: Battery level, device thermal status, camera state.

### Screen 3: Recorded Video Counting
- Video file picker dropzone with metadata preview (Filename, resolution, duration, FPS, size).
- Virtual line configuration preset selector and direction selector.
- Processing progress tracker:
  - Batch / frame progress bar (e.g. 64% complete).
  - Estimated Time Remaining (ETA).
  - Processed frame count.
- Live tally of detected vehicles updating as video frames process.
- Actions: "Cancel Processing", "Process in Background", "View Completed Session".

### Screen 4: Traffic Sessions
- Search bar filtering by location name, station ID, or notes.
- Quick filter chips: "All", "Live Camera", "Video Import", "Completed", "In Progress".
- Date range picker dropdown.
- Session cards showing:
  - Station / Road location name.
  - Date and time window.
  - Vehicle total and mini category badges.
  - Collection source badge.
  - Verification / sync status.

### Screen 5: Session Details
- Session header with road location, timestamp, duration, and hardware/source metadata.
- Metric summary cards: Total vehicles, average vehicles per hour, peak hour.
- Modal split category breakdown (percentage and raw count).
- Directional traffic comparison: Inbound vs. Outbound flow.
- Interactive hourly volume distribution bar chart.
- Audit & quality score: Confidence average and duplicate count suppression count.
- Actions: "Export CSV Report", "Delete Session".

### Screen 6: Analytics
- Multi-session aggregate analytics view.
- Date range selector (Today, Past 7 Days, Past 30 Days, Custom Range).
- Average Daily Traffic (ADT) calculation.
- Modal split donut / pie chart across vehicle types.
- 24-hour commute volume curve comparing Morning Peak (07:00 - 09:00) vs Evening Peak (16:30 - 18:30).
- Corridor ranking table comparing volume across different surveyed road stations.

### Screen 7: Reports
- Standardized report generator for transportation engineers.
- Session picker and date-range selector.
- Format selector (Standard Traffic CSV, AASHTO / FHWA compliant layout).
- Content toggles: Include hourly aggregates, raw timestamp logs, classification matrix.
- Export preview: Total rows, estimated CSV file size.
- Export CTA: Native Android Share Sheet trigger or Save to Downloads.
- List of previously generated CSV exports with share and delete actions.

### Screen 8: Settings
- Survey preferences: Default shift hours (default 07:00 AM - 07:00 PM), default direction.
- AI & detection parameters: Confidence threshold slider (default 75%), duplicate suppression window (default 1.5s).
- Camera settings: Resolution, keep screen awake during observation, low-power display mode.
- Local SQLite database management: Total sessions stored, database size, cache cleanup, backup SQLite database.
- Backend connectivity: Optional remote AI processing endpoint URL and sync options.
- About section: Version number, privacy terms, offline guarantees.

---

## 4. Interaction & System States
- **Empty States**: Friendly illustration with clear primary button to create a first session or import video.
- **Loading States**: Shimmer skeleton cards on data lists; determinate progress bars on video jobs.
- **Error States**: Non-blocking toasts for export failures; clear guidance modal for camera permissions.
- **Safety Confirmations**: Destructive alerts before stopping an active session, deleting data, or clearing cache.
- **Offline States**: Clear indicators that the app operates fully offline with zero data loss.
