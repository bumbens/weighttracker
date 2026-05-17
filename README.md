# WeightTracker

A full-stack body measurement tracking application built with Spring Boot and React. Users can log weekly measurements and monitor progress over time.



## Features

- BMI calculation with a visual scale indicator
- Weekly measurement logging — weight, waist and chest circumference
- User profile dashboard with start weight, target weight and start date

## Tech Stack

### Backend
- Java 17
- Spring Boot 4
- Spring Data JPA
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
├── src/                        # Spring Boot backend
│   └── main/java/com/example/weighttracker/
│       ├── User/               # User entity, repository, service, controller
│       └── WeightEntry/        # WeightEntry entity, repository, service, controller
└── weighttracker-frontend/     # React frontend
    └── src/
        ├── components/
        │   ├── bmi/            # BMI calculator and scale
        │   ├── layout/         # Header, Layout
        │   └── user/           # UserProfile, UserData, AddMeasurement
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

2. Configure `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/weighttracker
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
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

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| POST | `/api/users` | Create a user |
| PUT | `/api/users/{id}` | Update user |
| PATCH | `/api/users/{id}/weight` | Update current weight |
| GET | `/api/weightentry` | Get all entries |
| POST | `/api/weightentry/create` | Add measurement |
| PUT | `/api/weightentry/update/{id}` | Update entry |
| DELETE | `/api/weightentry/delete/{id}` | Delete entry |

## Status

Project is under active development.