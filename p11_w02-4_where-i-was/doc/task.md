# Task List: Where I Was (어디갔었지) MVP

## Phase 1: Project Setup & Configuration
- [x] Initialize Expo project with TypeScript
- [x] Install core dependencies (`react-native-maps`, `expo-location`, `expo-task-manager`, `expo-sqlite` or `realm`)
- [x] Configure app permissions (Location - Foreground & Background) in `app.json` / `app.config.js`
- [x] Set up project structure (src/components, src/screens, src/utils, src/db, etc.)
- [x] Create basic navigation structure (Main Map Screen, List Screen, Settings Screen)

## Phase 2: Local Database Implementation
- [x] Design Database Schema (`LOCATIONS` table)
- [x] Initialize Database Connection (SQLite/Realm)
- [x] Implement CRUD Helper Functions
    - [x] `insertLocation(locationData)`
    - [x] `getLocations()`
    - [x] `deleteLocation(id)`
    - [x] `updateLocationNote(id, note)`

## Phase 3: Location Tracking Logic (Core)
- [x] Implement Foreground Location Access Logic
- [x] Implement Background Location Task (`Task Manager`)
- [x] Implement "Smart Stay" Logic (Detect > 30 mins stay)
    - [ ] Logic to buffer location updates
    - [ ] Logic to determine "entry" and "exit" of a location
    - [ ] Filter noise/transient movements
- [ ] Implement User Settings for Tracking (Frequency/Accuracy - if applicable in MVP)

## Phase 4: Map Visualization & UI
- [x] Implement `MainMapScreen` with `MapView`
- [x] Render Markers for saved locations from DB
- [x] Implement Marker Callout/Card (Place Name, Time, Note)
- [x] Implement `LocationListScreen` (List view of history)
- [x] Implement Manual Note Adding UI

## Phase 5: Data Enrichment (Reverse Geocoding)
- [x] Integrate Reverse Geocoding API (Google Maps or Expo Location Geocoding)
- [x] Implement logic to fetch place name upon "Stay" confirmation
- [x] Handle API errors/limits gracefully

## Phase 6: Testing & Polish
- [/] Verify Background Location Tracking (Battery efficiency check)
- [/] Verify Database Persistence
- [/] UI/UX Polish (Theme, Transitions)
- [x] Create Walkthrough/Demo
