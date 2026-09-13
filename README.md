# TradingAppInterface

A mobile stock-monitoring app: track a watchlist of tickers, see live-ish prices and
intraday charts, and (eventually) get buy/hold/sell signals based on a couple of
trading heuristics. Originally built to help decide what to buy or sell on a personal
watchlist.

**Status: paused / exploratory.** This is a personal project that was left mid-refactor.
It is not currently in active development. See [Known Issues](#known-issues) before
trying to run it.

## What it does

- Email/password auth via Supabase
- Home screen: horizontal scroll of ticker "chips" showing the latest price, polled
  every 5 seconds
- "My Stocks" screen: intended to show a live intraday chart per ticker (currently
  disabled — see Known Issues)
- A small Flask backend that fetches quotes and OHLCV data via `yfinance`, plus early,
  unfinished signal logic (a long-trend momentum check and a short RSI thrust check)

## Stack

- **App:** Expo (React Native) + Expo Router, TypeScript, Supabase JS client,
  `victory-native` / `react-native-chart-kit` for charts
- **Backend:** Python, Flask, `yfinance`, `pandas`, `ta`

## Setup

### App

```bash
npm install
npx expo start
```

Then set your own Supabase project values in `app/utils/supabase.ts` (it currently
holds placeholders):

```ts
const SUPABASE_URL = 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-public-key';
```

### Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

The backend must be run with `backend/` as the working directory — it loads its
ticker lists with a path relative to `cwd`, not to the script location. It listens on
`http://127.0.0.1:5000`, which the app currently calls directly (see Known Issues —
this won't reach a physical device, only a simulator/emulator on the same machine).

## Known Issues

The app is not runnable as-is. At minimum:

- **Routing is broken.** Routes were moved into `app/screens/`, but Expo Router
  requires the root layout at `app/_layout.tsx`. There is currently no root layout, so
  navigation doesn't work.
- **App icons are missing.** `assets/images/` was deleted from the working tree while
  `app.json` still references icons inside it.
- The home screen (`app/screens/(tabs)/index.tsx`) calls `useState`/`useEffect` after
  an early `return`, which violates the Rules of Hooks and will throw once a user is
  loaded.
- The live chart on "My Stocks" is commented out — the screen currently only renders
  ticker titles, no chart.
- Both polling loops (5s intervals) have no error backoff or user-facing error state.
- `backend/app.py` runs with `debug=True` on `0.0.0.0` — fine locally, not safe to
  expose as-is.
- The API base URL (`http://127.0.0.1:5000`) is hardcoded in the app rather than
  configurable, so it only works against a local simulator/emulator.
- `longTrendHighMomentum()` and `shortRsiThrust()` in `backend/utils.py` are unfinished
  (no return value) and not wired to any route yet.
- Login also writes a hardcoded `'dev-token'` to `AsyncStorage` alongside the real
  Supabase session — leftover from early auth scaffolding.
- `package.json` includes three overlapping UI/chart libraries
  (`@gluestack-ui/themed`, `victory-native`, `react-native-chart-kit`) — only one is
  meaningfully used; the others are unused leftovers from experimentation.

## Roadmap ideas (not implemented)

- Finish the trading-signal functions and expose them via the API
- Re-enable and finish the intraday chart view
- Move the API base URL to configuration/env instead of a hardcoded localhost address
- Watchlist management (add/remove tickers) instead of a static JSON file
