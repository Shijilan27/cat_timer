# CAT 2025 Study Timer

A focused study tracker with an 8-week roadmap, smart timer, progress analytics, and cloud persistence.

## Overview
- Static frontend: `index.html`, `styles.css`, `script.js`
- API routes: `api/roadmap.js`, `api/progress.js` (Edge Functions)
- Data storage: Vercel Blob (`small-data/roadmap.json`, `small-data/user-progress.json`)

## Features
- 8-week roadmap
  - Previous/Next week navigation and current week header
  - Day selector (Mon–Sun) with automatic day-complete state when both sessions are done
  - Morning/Night session switch with per-session tasks (title + description)
- Smart timer system
  - 2-hour study session countdown with circular progress UI
  - Mandatory 15-minute break after every 1 hour of accumulated study time (prompted automatically)
  - Short Break timer mode available via tab
  - Overtime mode: when a study timer hits zero, it auto-marks complete and continues counting up
  - Controls: Pause/Resume, Reset, +5 minutes, Mark as Complete (auto on zero)
- Progress tracking and analytics
  - Overall completion bar (% of 112 tasks) and counters (tasks, days)
  - Total study time aggregation (hh:mm)
  - Time distribution tracking by session (morning/night/shortBreak) and by day (Mon–Sun)
  - Charts (Chart.js):
    - Study Time Distribution (pie)
    - Daily Progress (bar)
- Persistence and recoverability
  - Auto-save throttled while ticking (every ~5s) to `/api/progress`
  - Manual Save Progress snapshot (restores timer/week/day/session state on next load)
  - LocalStorage fallback if network/API fails
- Schedule-based access control
  - Only today’s sessions can be edited; past/future days are view-only
  - Displays informative lock messages and disables timer/action buttons when edits are not allowed
- Full reset
  - Reset All clears progress, timers, and marks; attempts to persist cleared state via API

## API and Data
- `/api/roadmap`
  - GET: Returns the roadmap JSON. On first access, seeds from embedded official roadmap text and persists to Blob
  - POST/PUT: Overwrite roadmap JSON
- `/api/progress`
  - GET: Returns the user progress object
  - POST/PUT: Upserts the user progress object with light validation/sanitization

Progress object shape:
```json
{
  "completedTasks": ["Week X: ...-monday-morning", "Week X: ...-monday-night"],
  "totalStudyTime": 0,
  "lastState": {
    "currentWeek": "Week 1: ...",
    "currentDay": "monday",
    "currentSession": "morning",
    "timerType": "all",
    "timerSeconds": 7200,
    "isOvertime": false,
    "overtimeSeconds": 0,
    "timestamp": 0
  },
  "timeBySession": { "morning": 0, "night": 0, "shortBreak": 0 },
  "timeByDay": { "monday": 0, "tuesday": 0, "wednesday": 0, "thursday": 0, "friday": 0, "saturday": 0, "sunday": 0 }
}
```

## Deploy (Vercel)
- Import repo into Vercel; use defaults (static, no build command)
- `/api/*` routes run as Edge Functions; first GET creates blobs for roadmap/progress

## Local development
- Open `index.html` directly or serve statically
- Optional Flask dev server (`app.py`) exists for local testing with a JSON file; not used on Vercel
