# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**PikaMood 3.0** is a standalone PWA (Progressive Web App) mood tracker with a Pikachu companion. Built with React 18 via CDN + Babel standalone transpilation — no build step required. Can be deployed by dragging the folder to Netlify.

## Architecture

- **Pattern**: Component-based SPA with global state in root `App` component
- **Component files**: Export via `Object.assign(window, { ... })` for global access
- **Styling**: Inline JSX style objects (no CSS classes or external stylesheets)
- **Persistence**: `localStorage` under key `pikamood_v1`; optional Supabase backend via `supabase-config.js`

## Key Files

| File | Purpose |
|------|---------|
| `PikaMood.html` | App entry point, mounts React |
| `AppState.jsx` | Theme system, shared utilities, exported to `window` |
| `DatabaseService.jsx` | localStorage + Supabase abstraction layer |
| `PikachuFace.jsx` | 30 animated SVG mood expressions |
| `PikaIcons.jsx` | Custom SVG icon library |
| `OnboardingScreen.jsx` | Intro + Login screens |
| `HomeScreen.jsx` | Dashboard, streak, recent entries |
| `DiaryScreen.jsx` | Journal with mood quadrant filtering |
| `StatsScreen.jsx` | Analytics, monthly calendar, streak tracking |
| `SettingsScreen.jsx` | Profile, export, account management |

## Mood System

4 quadrants with keywords:
- **HEP** (High Energy Positive): ecstatic, excited, happy, playful, loved, proud
- **LEP** (Low Energy Positive): calm, cozy, grateful, sleepy, hopeful
- **HEN** (High Energy Negative): angry, stressed, annoyed, frustrated
- **LEN** (Low Energy Negative): sad, lonely, exhausted, guilty, anxious
- **Complex**: confused, determined, nostalgic, surprised, mischievous, bored, hangry, caffeinated, monday, tgif

## Gamification

- XP: 10 base, 15 with notes
- 5 evolution stages: Egg → Baby Pichu → Young Pikachu → Mature Pikachu → Champion Pikachu
- 13 achievements with XP bonuses
- Streak tracking with visual indicators

## Running Locally

Service worker / PWA features require a local server:
```bash
python3 -m http.server 8000
# Then open http://localhost:8000/PikaMood.html
```

## Configuration

`supabase-config.js` — user must fill in Supabase URL and anon key. `SUPABASE_ENABLED` flag switches between cloud sync and local-only mode.

Schema for Supabase is in `supabase-schema.sql` (tables: `profiles`, `mood_entries`, `partner_connections`, `shared_entries`).