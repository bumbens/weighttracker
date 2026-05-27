# WeightTracker

A full-stack body measurement tracking application built with Spring Boot and React. Users can register, log in, and track body measurements with progress monitoring.

## Features

- JWT-based authentication — registration and login
- Animated onboarding — users choose which measurements to track on first login
- BMI calculation with a visual scale indicator
- Measurement logging — customizable per user (weight, waist, chest, and more)
- User profile dashboard with start weight, target weight and start date
- Dark mode support
- Mobile-first responsive design with hamburger navigation

## Tech Stack

### Backend
- Java 17
- Spring Boot
- Spring Data JPA / Hibernate
- Spring Security with JWT
- PostgreSQL
- Gradle

### Frontend
- React 19
- Vite
- React Router
- CSS Modules

## Project Structure

```
weighttracker/
├── src/
│   └── main/java/com/example/weighttracker/
│       ├── auth/                          # Registration and login endpoints
│       ├── user/                          # User entity, repository, service, controller
│       ├── measurement/                   # Measurement entity, repository, service, controller
│       ├── measurementType/               # MeasurementType entity, repository, service, controller
│       ├── userMeasurementPreference/     # User measurement preferences
│       └── shared/
│           ├── config/                    # Security, JWT, CORS configuration
│           └── converter/                 # Encryption converters
└── weighttracker-frontend/
    └── src/
        ├── components/
        │   ├── auth/           # Sign in and registration pages
        │   ├── bmi/            # BMI calculator and scale
        │   ├── home/           # Home page
        │   ├── layout/         # Navbar, Layout
        │   └── user/           # UserProfile, AllMeasurements, RecentMeasurements, MeasurementPreferencesSetup
        ├── hooks/              # Custom React hooks
        └── services/           # API service layer
```

## Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- PostgreSQL

### Backend

1. Create a PostgreSQL database:
```sql
CREATE DATABASE weighttracker;
```

2. Copy `src/main/resources/application.properties.example` to `application.properties` and configure:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/weighttracker
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=validate
jwt.secret=your_jwt_secret_min_32_chars
```

3. Run:
```bash
./gradlew bootRun
```

Backend runs on `http://localhost:8080`

### Frontend

1. Create `.env.local` in `weighttracker-frontend/`:
```
VITE_API_URL=http://localhost:8080
```

2. Run:
```bash
cd weighttracker-frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and receive JWT token |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/me` | Get current authenticated user |
| PUT | `/api/users/update/{id}` | Update user data |
| PATCH | `/api/users/{id}/preferences-configured` | Mark preferences as configured |

### Measurements
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/measurements/{userId}` | Get measurements for a user |
| POST | `/measurements` | Add a new measurement |
| DELETE | `/measurements/{id}` | Delete a measurement |

### Measurement Types
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/measurement-types` | Get all available measurement types |

### Preferences
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/preferences/{userId}` | Get user measurement preferences |
| POST | `/preferences` | Save user measurement preferences |

## Live Demo

- Frontend: [weighttracker-two.vercel.app](https://weighttracker-two.vercel.app)
- Demo account: `demo@weighttracker.com` / `demo123`

## Status

Project is under active development.