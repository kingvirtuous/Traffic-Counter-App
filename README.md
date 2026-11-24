# Traffic Count — Project Handoff Document

> **Last updated:** 2026-11-24  
> **Project status:** ✅ **Phase 1 (UI Implementation) complete — awaiting user approval for Phase 2**  
> **Current milestone:** All 8 screens, design system tokens, navigation, and sample data implemented in Expo + TypeScript  

---

## Table of Contents

1. [Quick Summary](#quick-summary)
2. [Product Vision](#product-vision)
3. [Current Project Status](#current-project-status)
4. [Design System (Approved in Stitch)](#design-system)
5. [Screen Inventory](#screen-inventory)
6. [Navigation Architecture](#navigation-architecture)
7. [Technology Stack](#technology-stack)
8. [Project Architecture](#project-architecture)
9. [Data Architecture](#data-architecture)
10. [Development Phases](#development-phases)
11. [File & Folder Reference](#file--folder-reference)
12. [Workflow Rules](#workflow-rules)
13. [How to Continue This Project](#how-to-continue-this-project)

---

## Quick Summary

**Traffic Count** is a professional Android-first mobile application that automatically counts vehicles passing a road using either a live phone camera or previously recorded traffic videos. It detects, tracks, classifies, and counts vehicles (Cars, Motorcycles, Buses, Trucks) while preventing duplicate counts. The app is built with **Expo + React Native + TypeScript** and designed in **Google Stitch**.

> [!IMPORTANT]
> **This project follows a strict design-first, approval-gated workflow.** No application code may be written until the user explicitly says: *"UI approved. Proceed with development."* Each development phase also requires explicit user approval before moving to the next.

---

## Product Vision

### What It Does
- Counts vehicles from **live camera feed** or **recorded video files**
- Classifies vehicles into 4 categories: Cars, Motorcycles, Buses, Trucks
- Tracks objects to prevent duplicate counting via virtual counting-line detection
- Manages traffic observation sessions (7:00 AM – 7:00 PM typical)
- Provides hourly statistics, daily analytics, and historical trends
- Generates CSV reports (FHWA/AASHTO compliant)
- Works fully **offline** with local SQLite storage
- Optionally connects to a backend for AI video processing

### Who It's For
Traffic observers, transportation engineers, and researchers collecting vehicle count data at road stations.

### Core Capabilities
| Capability | Priority | Phase |
|---|---|---|
| Live vehicle counting via camera | Core | Phase 3–5 |
| Recorded-video vehicle counting | Core | Phase 3–4 |
| Vehicle classification (4 types) | Core | Phase 4 |
| Object tracking & duplicate prevention | Core | Phase 4 |
| Virtual counting-line crossing detection | Core | Phase 4 |
| Traffic session management | Core | Phase 2 |
| Hourly/daily analytics & charts | Core | Phase 2 |
| CSV export & file sharing | Core | Phase 2 |
| Offline data collection (SQLite) | Core | Phase 2 |
| Optional online AI processing | Future | Phase 5 |

---

## Current Project Status

### ✅ What Has Been Done

1. **Complete UI/UX designs created in Google Stitch** — 8 main screens designed with a unified design system
2. **Design system established** — Colors, typography, spacing, component library, all documented
3. **Design specifications documented** — See `designs/design.md` and `designs/traffic_count/DESIGN.md`
4. **Screen mockup screenshots exported** — PNG screenshots for all 8 screens
5. **HTML reference code exported** — Stitch-generated HTML for each screen (use as visual reference only, NOT for direct code copy)
6. **Design handoff document created** — `DESIGN.md` at project root

### ❌ What Has NOT Been Done

- ❌ Expo project NOT initialized
- ❌ No application code written
- ❌ No dependencies installed
- ❌ No database implemented
- ❌ No camera functionality implemented
- ❌ No AI/ML detection implemented
- ❌ No backend created
- ❌ **User has NOT yet approved the designs** — approval is required before any coding

### 🔲 What Needs to Happen Next

1. **User reviews the 8 Stitch screen designs** (screenshots in `designs/` folder)
2. **User provides feedback or requests revisions**
3. **User gives explicit approval:** *"UI approved. Proceed with development."*
4. **Only then:** Begin Phase 1 (UI Implementation)

---

## Design System

The complete design system is defined in the Stitch project. Here are the exact specifications:

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| Brand Primary | `#0284C7` | Main actions, interactive highlights, peak bars |
| Brand Secondary | `#0F172A` | Header surfaces, high-contrast HUD |
| Background Canvas | `#F8FAFC` | Application background |
| Surface | `#FFFFFF` | Cards, modals, sheets |
| Subtle Surface | `#F1F5F9` | Chips, filter pills, search inputs |
| Borders | `#E2E8F0` | Dividers, card outlines |
| Text Primary | `#0F172A` | Titles, tabular figures |
| Text Secondary | `#475569` | Labels, metadata |
| Text Muted | `#94A3B8` | Timestamps, units, inactive tabs |

### Vehicle Classification Colors

| Vehicle | Color | Tint Background |
|---|---|---|
| Cars | `#059669` (Emerald 600) | `#D1FAE5` |
| Motorcycles | `#D97706` (Amber 600) | `#FEF3C7` |
| Buses | `#7C3AED` (Violet 600) | `#EDE9FE` |
| Trucks | `#DC2626` (Rose 600) | `#FEE2E2` |

### Status & Feedback Colors

| Status | Hex |
|---|---|
| Success / Validated | `#10B981` |
| Warning / Alert | `#F59E0B` |
| Error / Hardware Fault | `#EF4444` |
| Offline / Stored Local | `#64748B` |

### Typography

| Style | Font | Size | Weight | Line Height |
|---|---|---|---|---|
| Headline Large | Inter | 28px | 700 | 36px |
| Headline Medium | Inter | 22px | 600 | 28px |
| Headline Small | Inter | 18px | 600 | 24px |
| Body Large | Inter | 16px | 400 | 24px |
| Body Medium | Inter | 14px | 400 | 20px |
| Body Small | Inter | 12px | 400 | 16px |
| Counter Large | JetBrains Mono | 36px | 700 | 40px |
| Counter Medium | JetBrains Mono | 20px | 600 | 24px |
| Label Medium | Inter | 12px | 500 | 16px |

### Shapes & Elevation

| Element | Value |
|---|---|
| Card Radius | 12px |
| Pill / Badge Radius | 999px (full) |
| Button Radius | 10px |
| Elevation 1 | `0 1px 3px rgba(0,0,0,0.08)` |
| Elevation 2 | `0 4px 6px rgba(0,0,0,0.1)` |

### Spacing

| Token | Value |
|---|---|
| Gutter | 16px |
| Margin | 16px |
| Space XS | 4px |
| Space SM | 8px |
| Space MD | 16px |
| Space LG | 24px |
| Space XL | 32px |

---

## Screen Inventory

All 8 screens have been designed in Google Stitch. Each has a **screenshot** (PNG) and **HTML reference** (code.html) in the `designs/` folder.

### Screen 1: Dashboard (`designs/traffic_count_dashboard/`)
**Route:** `/index` (bottom tab)

The main overview and entry point. Features:
- Welcome header with Station ID (e.g., ST-402) and active shift timer
- Online/Offline status indicator
- SQLite offline mode banner ("100% Offline Mode, Zero Data Loss")
- Hero metric: Today's total vehicles counted (large tabular numeral)
- Live Flow Rate and Peak Variance stats
- 4 Classification count cards (Cars, Motorcycles, Buses, Trucks) with percentages
- "Start Live Counting" action card → launches camera HUD
- "Import Recorded Video" action card → opens video importer
- Hourly Volume Distribution bar chart (shows peak hours highlighted)
- Recent Survey Sessions list with quick navigation
- Bottom tab bar: Dashboard, Sessions, Analytics, Reports

### Screen 2: Live Traffic Counting HUD (`designs/live_camera_counting_hud/`)
**Route:** `/counting/live` (fullscreen modal/stack)

Fullscreen dark-themed camera interface. Features:
- Full camera viewfinder with live video feed
- REC indicator with elapsed time and 30 FPS badge
- Battery percentage and device temperature display
- Station ID badge and SQLite local status
- Vehicle detection bounding boxes with:
  - Category label (Car, Truck, etc.)
  - Tracking ID number (#104, #105)
  - Confidence percentage (94%, 89%)
  - Direction arrow and estimated speed
- Virtual counting tripwire line (neon cyan, horizontal)
- Track prediction labels (ETA to crossing)
- Dark HUD overlay at bottom:
  - Total Inbound Today counter (large tabular)
  - Percentage change indicator
  - Shift Time elapsed
  - Estimated Flow Rate (veh/hr)
  - 4 mini category counters with icons and percentages
- Action buttons: Calibrate Line, Pause Stream, Stop & Save

### Screen 3: Import Recorded Video (`designs/import_recorded_video/`)
**Route:** `/counting/video` (stack)

Video import and processing interface. Features:
- Video file preview thumbnail with metadata
- File details: duration, resolution, FPS, codec, file size
- Replace File action
- Detection Configuration panel:
  - Virtual Counting Tripwire preset selector
  - Count Direction Mode (Inbound / Outbound / Bidirectional)
  - Confidence threshold, Tripwire Line number, Tracking status
- Processing progress section:
  - "AI Detection Active" status badge
  - Progress bar with percentage (e.g., 64%)
  - Frame count (69.1k/108k), processing rate (1.8x 54fps), ETA
  - Status message
- Classification Split showing live tally of detected vehicles
- SQLite commit ID and sync status
- Actions: Cancel Processing, Process in Background

### Screen 4: Traffic Sessions (`designs/traffic_sessions/`)
**Route:** `/sessions` (bottom tab)

Session management list. Features:
- Header with Station ID and "New Survey" button
- Search bar (station, corridor, or note)
- Filter chips: All (14), Live Camera (8), Video Import (6)
- Session cards showing:
  - Station/Road name and location
  - Date and time window with duration
  - Source badges (Live Camera / Video Import)
  - Status badges (In Progress, Completed, Verified, CSV Exported)
  - Telemetry Total with large vehicle count
  - 4 mini category count badges
  - Quick actions: Audit Log, View Live Feed, Export CSV, Details & Analytics, Archive, Share Report
- Offline storage confirmation footer

### Screen 5: Session Details (`designs/session_details_trf_9024/`)
**Route:** `/sessions/[id]` (stack)

Deep drill-down into a single session. Features:
- Session header with verification badge and session ID (#TRF-9024)
- Location info: Road name, corridor, crossing/interchange
- Date, time window, duration
- Source metadata (Recorded Video Import, resolution, FPS)
- SQLite storage and verification ID
- Confidence score (98.4%), duplicate drops suppressed count, zero data loss badge
- Gross Traffic Count hero metric with baseline comparison
- Avg Flow, Peak Flow, Duration summary cards
- Classification Split (FHWA 13-Class grouped):
  - Passenger Cars, Motorcycles, Heavy Trucks & Articulated, Transit Buses
  - Counts and percentages with colored bars
- Directional Split:
  - Inbound vs Outbound percentage and counts
  - Peak time for each direction
- Hourly Volume Distribution bar chart:
  - AM Peak, PM Peak, Off-Peak color coding
- Calibration & Engine Telemetry:
  - Neural detector model (YOLOv8-Traffic / TensorRT FP16)
  - Detection tripwire configuration
  - Cryptographic checksum (SHA-256)
  - Local persistence format info
- Actions: Export CSV Report (FHWA/AASHTO), Delete Survey Session

### Screen 6: Transportation Analytics (`designs/transportation_analytics/`)
**Route:** `/analytics` (bottom tab)

Multi-session aggregate analytics dashboard. Features:
- Date range selector tabs: 7D, 30D, 90D, Custom
- Synced session count badge
- Average Daily Traffic (ADT) hero metric with trend percentage
- Summary cards: Total Volume, Footprint (active stations), Peak Load
- Vehicle Modal Split donut/pie chart:
  - Cars 64.0%, Motos 22.0%, Trucks 10.0%, Buses 4.0%
  - Total Fleet count in center
- Composite Commute Curve (24-hour):
  - AM Surge Peak time and volume
  - PM Commute Peak time and volume
  - Hourly line chart with morning/evening surge shading
- Corridor Traffic Share ranking table:
  - Top stations by volume (past 7 days)
  - Bidirectional/merge type labels
  - Percentage of total traffic
- Export Transportation Study button (CSV / PDF)
- Cryptographic verification footer

### Screen 7: Traffic Reports Hub (`designs/traffic_reports_hub/`)
**Route:** `/reports` (bottom tab)

Report generation and export center. Features:
- Zero Data Loss status badge
- AASHTO / FHWA Standardized Packaging label
- Tab selector: Single Survey Session / Multi-Day Composite
- Target Survey Session picker dropdown
- Export Format selector:
  - Standard FHWA / AASHTO Traffic CSV
  - Summary Matrix (condensed with PHF)
- Export Inclusions & Payloads checkboxes:
  - Raw timestamp & vehicle tracking IDs
  - Directional classification matrix
  - Hourly aggregate intervals
  - Telemetry metadata & cryptographic hash
- Payload Estimator: row count, summary rows, estimated file size
- "Generate & Share CSV Report" primary action
- "Save to Device Storage" secondary action
- Generated Reports Archive:
  - Previously exported files with name, date, size, record count
  - FHWA Verified / AASHTO Schema badges
  - Share and delete actions per file
- ISO-8601 UTC timestamp format notice

### Screen 8: Application Settings (`designs/application_settings/`)
**Route:** `/settings` (stack)

System preferences and calibration. Features:
- System Parameters header with sync status
- Field Survey Preferences:
  - Default Observation Window (07:00 AM – 19:00 PM, 12 Hours)
  - Tripwire Debounce slider (0.5s – 3.0s, default 1.5s)
  - Default Counting Vector (Inbound / Outbound / Bidirectional)
  - Inference Threshold (default 75% confidence)
- Camera & Hardware Optimization:
  - Keep Screen Active toggle
  - Low Power Viewfinder toggle
  - Camera Capture Target dropdown (1080p FHD @ 30 FPS)
  - Thermal Safe Mode toggle (halt at 42°C)
- Offline Data Storage (SQLite):
  - 100% Local Offline Security notice
  - Database size and session count
  - Cached video recordings size
  - Backup SQLite Database button
  - Clear Cached Video Files button
- Connectivity & Backend Sync (Optional):
  - Cloud Telemetry Sync toggle
  - Remote Inference Endpoint URL with Test button
- About & System Diagnostics:
  - Version (v1.0.0-build.402)
  - Runtime stack: Expo, React Native, SQLite 3.42, TensorRT / ONNX
  - Export Diagnostic Logs, License & Terms

---

## Navigation Architecture

```
Bottom Tab Bar (4 tabs)
├── Dashboard (/index)
│   ├── → Start Live Counting → /counting/live (fullscreen)
│   └── → Import Recorded Video → /counting/video (stack)
├── Sessions (/sessions)
│   └── → Session Details → /sessions/[id] (stack)
├── Analytics (/analytics)
└── Reports (/reports)

Top-right/Header access:
└── Settings (/settings) (stack)
```

### Key User Flows

**Live Counting Flow:**
Dashboard → Start Live Counting → Camera Permission → Live Counting HUD → Pause/Resume → Stop & Save → Session Summary → Session Details → Export Report

**Recorded Video Flow:**
Dashboard → Import Recorded Video → Select Video File → Preview & Configure → Start Processing → Processing Progress → Results → Session Summary

**Reporting Flow:**
Reports Tab → Select Session/Date Range → Choose Format → Configure Inclusions → Generate CSV → Share via Android Share Sheet

---

## Technology Stack

### Mobile Application
| Technology | Purpose |
|---|---|
| Expo | Build framework |
| React Native | Cross-platform UI |
| TypeScript | Type safety |
| Expo Router | File-based navigation |
| expo-sqlite | Local database |
| expo-camera | Camera access |
| Video picker (compatible) | Recorded video import |
| React Native chart library | Analytics charts |
| CSV generation library | Report export |
| Expo FileSystem + Sharing | File export & sharing |

### AI / Vehicle Detection (Future)
| Technology | Purpose |
|---|---|
| Python | Detection pipeline |
| OpenCV | Video frame processing |
| YOLOv8-Traffic | Vehicle detection model |
| TensorRT / ONNX | On-device inference runtime |
| Multi-object tracker | Vehicle tracking |
| Counting-line algorithm | Crossing detection |

### Backend (Optional, Future)
| Technology | Purpose |
|---|---|
| Python + FastAPI | AI processing server |
| Optional cloud sync | Remote processing |

> [!NOTE]
> The app MUST remain fully functional offline without any backend for: local sessions, manual counting, historical records, analytics, and report generation.

---

## Project Architecture

```
traffic-count/
│
├── app/                          # Expo Router routes
│   ├── (tabs)/                   # Bottom tab navigator
│   │   ├── index.tsx             # Dashboard
│   │   ├── sessions.tsx          # Sessions list
│   │   ├── analytics.tsx         # Analytics
│   │   └── reports.tsx           # Reports
│   ├── counting/
│   │   ├── live.tsx              # Live camera HUD
│   │   └── video.tsx             # Video import & processing
│   ├── sessions/
│   │   └── [id].tsx              # Session details
│   └── settings.tsx              # Settings
│
├── src/
│   ├── components/               # Reusable UI components
│   │   ├── cards/                # Stat cards, session cards
│   │   ├── charts/               # Bar charts, donut charts
│   │   ├── common/               # Buttons, badges, inputs
│   │   └── layout/               # Headers, footers, navigation
│   ├── features/                 # Feature-specific modules
│   ├── detection/                # AI detection interfaces & mocks
│   ├── database/                 # SQLite setup, migrations, repos
│   ├── services/                 # Business logic services
│   ├── hooks/                    # Custom React hooks
│   ├── constants/                # Design tokens, config values
│   ├── types/                    # TypeScript type definitions
│   └── utils/                    # Utility functions
│
├── assets/                       # Images, fonts, icons
├── designs/                      # Stitch design exports (source of truth)
│   ├── design.md                 # Design system specification
│   ├── traffic_count/DESIGN.md   # Design system with YAML tokens
│   ├── traffic_count_dashboard/  # Dashboard screen
│   ├── live_camera_counting_hud/ # Live counting HUD screen
│   ├── import_recorded_video/    # Video import screen
│   ├── traffic_sessions/         # Sessions list screen
│   ├── session_details_trf_9024/ # Session details screen
│   ├── transportation_analytics/ # Analytics screen
│   ├── traffic_reports_hub/      # Reports screen
│   └── application_settings/     # Settings screen
│
├── backend/                      # (Future) Python AI backend
│   └── app/
│       ├── api/
│       ├── detection/
│       ├── tracking/
│       └── services/
│
├── DESIGN.md                     # Design handoff document
├── README.md                     # This file — project handoff
├── package.json                  # (Not yet created)
├── tsconfig.json                 # (Not yet created)
└── app.json                      # (Not yet created)
```

---

## Data Architecture

### Core Entities

```typescript
// TrafficSession — A single observation session
interface TrafficSession {
  id: string;
  stationId: string;
  locationName: string;
  corridor?: string;
  startTime: string;        // ISO-8601
  endTime?: string;
  duration: number;          // minutes
  source: 'live_camera' | 'video_import';
  status: 'in_progress' | 'completed' | 'verified' | 'failed';
  videoMetadata?: VideoMetadata;
  totalVehicles: number;
  cars: number;
  motorcycles: number;
  buses: number;
  trucks: number;
  confidenceAvg: number;
  duplicatesSuppressed: number;
  syncStatus: 'local' | 'synced' | 'pending';
  createdAt: string;
  updatedAt: string;
}

// CountEvent — A single vehicle crossing the counting line
interface CountEvent {
  id: string;
  sessionId: string;
  trackingId: number;        // Vehicle tracking ID
  timestamp: string;         // ISO-8601 epoch ms
  vehicleCategory: 'car' | 'motorcycle' | 'bus' | 'truck';
  confidence: number;        // 0–100
  direction: 'inbound' | 'outbound';
  crossingLineId: number;
}

// HourlySummary — Aggregated hourly data
interface HourlySummary {
  id: string;
  sessionId: string;
  hour: number;              // 0–23
  totalVehicles: number;
  cars: number;
  motorcycles: number;
  buses: number;
  trucks: number;
  inbound: number;
  outbound: number;
}

// ProcessingJob — Video processing status
interface ProcessingJob {
  id: string;
  sessionId: string;
  videoPath: string;
  status: 'queued' | 'processing' | 'completed' | 'failed' | 'cancelled';
  progress: number;          // 0–100
  framesProcessed: number;
  totalFrames: number;
  processingRate: number;    // fps
  eta: number;               // seconds remaining
  error?: string;
}
```

### Key Data Rules
- A **CountEvent** represents a vehicle **crossing the virtual counting line**, NOT every detection frame
- Duplicate-count prevention via tracking ID and debounce window (default 1.5s)
- All timestamps stored in ISO-8601 UTC, displayed in local time
- Sample/demo data must be **clearly labeled** — never presented as real collected data
- Analytics calculated from actual stored count events or verified aggregates

---

## Development Phases

> [!CAUTION]
> Each phase requires explicit user approval before proceeding to the next. Do not combine phases or skip ahead.

### Phase 1: UI Implementation ⏳ (Next after design approval)
- Initialize Expo with TypeScript
- Configure Expo Router with tab + stack navigation
- Implement all 8 screens faithfully matching Stitch designs
- Create reusable UI components following the design system
- Add clearly labeled sample data for demonstration
- Test all screens and navigation
- Run TypeScript checks

### Phase 2: Database & Reporting
- Set up expo-sqlite with migrations
- Implement data repositories (sessions, count events, summaries)
- Session CRUD operations
- Manual count entry
- Analytics calculations from real data
- Hourly summaries
- CSV export (FHWA/AASHTO format)
- Test data persistence

### Phase 3: Camera & Video
- Camera permissions handling
- Live camera preview
- Video recording capability
- Recorded video import (MP4/MOV)
- Video preview and metadata display
- Processing progress UI
- Error handling and retry

### Phase 4: AI Prototype
- Python detection pipeline
- OpenCV video frame processing
- YOLOv8 vehicle classification
- Multi-object tracking
- Counting-line crossing algorithm
- Duplicate prevention logic
- Accuracy testing against manually verified footage
- **Priority: recorded-video processing first**

### Phase 5: Live AI & Connectivity
- Investigate Android on-device inference feasibility
- Native camera frame processing
- TensorRT/ONNX model runtime
- Live detection and tracking
- Backend API for remote processing
- Offline job queue
- Optional data sync

### Phase 6: Quality Assurance & Release
- Counting accuracy tests
- Android device testing
- Long-session testing (12-hour sessions)
- Low-light conditions
- Battery optimization
- Storage management
- Error recovery testing
- Production Android build

---

## File & Folder Reference

### Design Assets (Source of Truth)

| File | Purpose |
|---|---|
| `designs/design.md` | Complete design system specification |
| `designs/traffic_count/DESIGN.md` | Design system with YAML frontmatter tokens (colors, typography, spacing, rounded corners) |
| `designs/*/screen.png` | Screenshot mockup of each screen |
| `designs/*/code.html` | Stitch-generated HTML reference (do NOT copy into app — use as visual reference only) |
| `DESIGN.md` | Root-level design handoff summary |

### Design Screen Folders

| Folder | Screen |
|---|---|
| `designs/traffic_count_dashboard/` | Screen 1: Dashboard |
| `designs/live_camera_counting_hud/` | Screen 2: Live Camera Counting HUD |
| `designs/import_recorded_video/` | Screen 3: Import Recorded Video |
| `designs/traffic_sessions/` | Screen 4: Traffic Sessions |
| `designs/session_details_trf_9024/` | Screen 5: Session Details |
| `designs/transportation_analytics/` | Screen 6: Transportation Analytics |
| `designs/traffic_reports_hub/` | Screen 7: Traffic Reports Hub |
| `designs/application_settings/` | Screen 8: Application Settings |

### Additional Design Image
| File | Purpose |
|---|---|
| `designs/realistic_high_angle_pov_shot.../screen.png` | Reference photo showing ideal camera angle for traffic observation (high-angle overpass POV) |

---

## Workflow Rules

These rules MUST be followed throughout the entire project:

1. **Never skip the design phase** — All UI must match approved Stitch designs
2. **Never start coding before explicit design approval** — Wait for: *"UI approved. Proceed with development."*
3. **Approved Stitch designs are the visual source of truth** — Do not independently redesign
4. **One phase at a time** — Do not combine phases or build everything at once
5. **Test each phase** before continuing to the next
6. **Clearly identify incomplete functionality** — Don't claim features work unless implemented
7. **Never present sample data as real data** — Label all demo/sample data clearly
8. **Keep architecture modular** — Reusable components, clean separation of concerns
9. **Explain important technical decisions** — Document any deviations from the plan
10. **Avoid unnecessary paid services** — Prioritize open-source and free-tier solutions
11. **Prioritize Android compatibility** — Android-first, test on Android
12. **Protect user data** — Local-first, offline-capable, zero data loss guarantee
13. **Maintain UI consistency** — Follow the design system tokens exactly
14. **Do not silently change approved requirements** — Ask before deviating
15. **At the end of each phase, STOP and report** — List files created, dependencies, test results, known limitations

---

## How to Continue This Project

### If You Are a New Agent Picking Up This Project:

1. **Read this README.md first** — It contains everything you need to understand the project state
2. **Read `designs/design.md`** — The complete design system specification
3. **Read `designs/traffic_count/DESIGN.md`** — Design tokens in YAML format (copy these into your constants)
4. **Look at the screen PNGs in `designs/*/screen.png`** — These are the approved visual targets
5. **Check if `DESIGN.md` at root** has any additional notes

### Current Status Checklist:
- [x] Product requirements defined
- [x] Design system created in Stitch
- [x] All 8 screens designed in Stitch
- [x] Screen screenshots exported
- [x] HTML reference code exported
- [x] Design specifications documented
- [x] UI approved by user
- [x] Phase 1: UI Implementation
- [ ] **⬅️ YOU ARE HERE:** Phase 1 review & approval for Phase 2 (Database & Reporting)
- [ ] Phase 2: Database & Reporting
- [ ] Phase 3: Camera & Video
- [ ] Phase 4: AI Prototype
- [ ] Phase 5: Live AI & Connectivity
- [ ] Phase 6: QA & Release

### What to Do Next:
1. **Present the designs to the user for review** (reference the PNG screenshots)
2. **Wait for user feedback** — make only requested changes
3. **Wait for explicit approval:** *"UI approved. Proceed with development."*
4. **Begin Phase 1** — Initialize Expo, implement all screens, create components
5. **At end of Phase 1, STOP and report** — Wait for approval before Phase 2

### The Stitch HTML Files (`code.html`)
- These are **reference only** — they show the visual structure as HTML/CSS
- Do **NOT** copy HTML/CSS into the React Native app
- Use them to understand layout structure, element hierarchy, and styling values
- The final app must be a **genuine Expo React Native** application, not a WebView wrapper

---

> [!TIP]
> The design zip file (`stitch_traffic_count.zip`) in the project root contains all original Stitch exports if you need to re-extract them.

---

*This document serves as the single source of truth for project continuity. Any agent continuing this project should read it completely before taking any action.*
