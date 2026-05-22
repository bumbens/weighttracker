# WeightTracker

A full-stack body measurement tracking application built with Spring Boot and React. Users can register, log in, and track weekly measurements with progress monitoring.

## Features

- JWT-based authentication — registration and login
- BMI calculation with a visual scale indicator
- Weekly measurement logging — weight, waist and chest circumference
- User profile dashboard with start weight, target weight and start date

## Tech Stack

### Backend
- Java 17
- Spring Boot 4
- Spring Data JPA
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
│       ├── auth/               # Registration and login endpoints
│       ├── user/               # User entity, repository, service, controller
│       ├── weightentry/        # WeightEntry entity, repository, service, controller
│       └── shared/
│           ├── config/         # Security, JWT, CORS configuration
│           └── converter/      # Encryption converters
└── weighttracker-frontend/
    └── src/
        ├── components/
        │   ├── auth/           # Sign in page
        │   ├── bmi/            # BMI calculator and scale
        │   ├── layout/         # Header, Layout
        │   └── user/           # UserProfile, UserData, AddMeasurement, RecentMeasurements, AllMeasurements
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
spring.jpa.hibernate.ddl-auto=update
jwt.secret=your_jwt_secret_min_32_chars
```

3. Run:
```bash
./gradlew bootRun
```

Backend runs on `http://localhost:8080`

### Frontend

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
| PATCH | `/api/users/update/{id}/weight` | Update current weight |
| DELETE | `/api/users/delete/{id}` | Delete user |

### Measurements
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/weightentry` | Get all entries |
| GET | `/api/weightentry/user/{userId}` | Get entries for a specific user |
| POST | `/api/weightentry/create` | Add measurement |
| PUT | `/api/weightentry/update/{id}` | Update entry |
| DELETE | `/api/weightentry/delete/{id}` | Delete entry |

## Status

Project is under active development.
