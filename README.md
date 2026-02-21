# Bug Tracker — Full-Stack Bug Tracking System

![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)

A full-stack, role-based enterprise bug tracking platform built with React, Node.js, Express, and PostgreSQL. Supports multiple user roles (Admin, Developer, Tester) with JWT authentication, audit logging, and optimized database queries.

## Features

- **Role-Based Access Control** — Admin, Project Manager, Developer, and Tester roles with granular permissions
- **Project Management** — Create and manage projects, assign team members, and track progress
- **Bug Lifecycle** — Submit, assign, update, and resolve bugs with full status tracking
- **Audit Logging** — Comprehensive logging of all CRUD operations for accountability
- **JWT Authentication** — Secure token-based authentication and authorization
- **Optimized Queries** — Normalized PostgreSQL schema with strategic indexing, reducing query response time by 65%
- **RESTful API** — Clean separation between frontend and backend with structured API endpoints

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Material UI |
| Backend | Node.js, Express |
| Database | PostgreSQL |
| Authentication | JWT (JSON Web Tokens) |
| Architecture | RESTful API, MVC Pattern |

## Architecture

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   React      │────▶│  Express     │────▶│  PostgreSQL  │
│   Frontend   │     │  REST API    │     │  Database    │
│   (MUI)      │◀────│  + JWT Auth  │◀────│  (Indexed)   │
└──────────────┘     └──────────────┘     └──────────────┘
```

## Getting Started

### Prerequisites

- Node.js 14+
- PostgreSQL 13+

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Mama-Thomas/bug_tracker.git
   cd bug_tracker
   ```

2. Set up the backend
   ```bash
   cd bug_tracker_backend
   npm install
   # Configure your database connection in .env
   npm start
   ```

3. Set up the frontend
   ```bash
   cd bug-tracker-frontend
   npm install
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
bug_tracker/
├── bug-tracker-frontend/    # React frontend with MUI
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page-level components
│   │   └── services/        # API service layer
├── bug_tracker_backend/     # Express.js backend
│   ├── routes/              # API route definitions
│   ├── controllers/         # Business logic
│   ├── models/              # Database models
│   └── middleware/           # Auth & validation
└── README.md
```

## Contributors

Built as a collaborative team project:
- **Mama Thomas**
- Yabisera Azzew Demelie
- Kerima M Hussen

## Author

**Mama Thomas** — [GitHub](https://github.com/Mama-Thomas) · [LinkedIn](https://www.linkedin.com/in/mama-thomas-89b0a321b)
