# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Backend (Spring Boot + Gradle)
```bash
./gradlew bootRun          # start backend (port 8080)
./gradlew build            # compile and package
./gradlew test             # run all tests
```

### Frontend (React + Vite)
```bash
cd weighttracker-frontend
npm install
npm run dev                # start dev server (port 5173)
npm run build
npm run lint
```

### Local setup
Create `weighttracker-frontend/.env.local`:
```
VITE_API_URL=http://localhost:8080
```

The backend expects PostgreSQL on **port 5433** (not the default 5432). To use the local profile: `./gradlew bootRun --args='--spring.profiles.active=local'`.

## Architecture

### Backend packages
Each domain is self-contained under `com.example.weighttracker`:
- `auth` — register/login, issues JWT; no auth required (`/auth/**` is public)
- `user` — `User` entity + CRUD; `UserServiceImpl` also handles weight sync
- `measurement` — `Measurement` entity + service; triggers weight sync on add/delete
- `measurementType` — read-only lookup table of trackable metrics
- `userMeasurementPreference` — join between User and MeasurementType; defines which types a user tracks
- `shared/config` — `SecurityConfig` (JWT filter chain, CORS), `JwtUtil` (sign/validate/parse)
- `shared/converter` — `DoubleCryptoConverter` / `StringCryptoConverter` (Jasypt field-level encryption)

### Weight sync invariant
`User.currentWeight` is kept in sync automatically:
- **On add measurement**: if `measurementType.id == 1` (weight), `UserServiceImpl.updateWeight()` is called.
- **On delete measurement**: if the deleted type was weight, `currentWeight` is restored to the most recent remaining weight measurement, or to `startWeight` if none remain.
- **On profile update** (`updateUser`): if the user has no measurements at all, `currentWeight` is reset to `startWeight`.

The weight measurement type is identified by **hardcoded ID = 1** throughout `MeasurementService` and `UserServiceImpl`.

### Sensitive field encryption
`User.startWeight`, `currentWeight`, and `targetWeight` use `@Convert(converter = DoubleCryptoConverter.class)` — values are encrypted at rest via Jasypt (PBEWithMD5AndDES). The encryptor password and JWT secret are in `application.properties`.

### Auth flow
JWT subject is the user's email. `JwtFilter` validates the token on every request and loads the `UserDetails` from the database by email. Tokens expire after 1 hour.

### Frontend data flow
`App.jsx` is split into `App` (unauthenticated, shows Login) and `AuthApp` (authenticated). `AuthApp` holds a `refresh` counter incremented via `onRefresh` callbacks to re-trigger data hooks after mutations.

On first login `user.preferencesConfigured == false` → `MeasurementPreferencesSetup` is rendered instead of the main app. After the user picks their measurement types and saves, a PATCH to `/api/users/{id}/preferences-configured` flips the flag and `onRefresh()` returns the user to the normal flow.

API calls are centralised in `weighttracker-frontend/src/services/api.js`. All authenticated calls use a `Bearer` token from `localStorage`. A 401/403 response clears the token and reloads the page.
