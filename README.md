# Food Ordering System - Foundation (Phase 1)

This repository contains the initial project foundation for a multi-platform food ordering system.

## Architecture Overview

The project is split into three core applications:

- **backend/**: Node.js + Express API skeleton.
- **admin-panel/**: React-based admin interface scaffold.
- **mobile-app/**: Flutter mobile app structure with placeholder screens.

## Backend (Node.js + Express)

### Run locally

```bash
cd backend
npm install
npm run dev
```

Server starts on `PORT` from environment variables (default: `5000`).

### Current foundation includes

- Basic Express server
- `/api/` index route
- Folder structure: `controllers/`, `routes/`, `models/`, `config/`
- Environment variable loading with `dotenv`

## Admin Panel (React)

### Run locally

```bash
cd admin-panel
npm install
npm run dev
```

### Current foundation includes

- Vite + React base setup
- Login page UI placeholder
- Dashboard placeholder

## Mobile App (Flutter)

### Run locally

```bash
cd mobile-app
flutter pub get
flutter run
```

### Current foundation includes

- Flutter project structure
- Splash screen placeholder
- Home screen placeholder

---

Only project foundation is included in this phase. No full business features are implemented yet.
