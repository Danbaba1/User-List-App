# User-List Project

## Overview

This project is a full-stack user management application built with React, TypeScript, and Node.js. It fetches user data from an external API, stores it in a MongoDB database, and provides a web interface for viewing and interacting with user information.

## Project Structure

```
project/
├── node_modules/        # Project dependencies
├── server/              # Backend server code
├── src/                 # Frontend source code
├── .env                 # Environment variables (not tracked in git)
├── .gitignore           # Git ignore configuration
├── eslint.config.js     # ESLint configuration
├── index.html           # Main HTML entry point
├── package.json         # Project metadata and dependencies
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.*.json      # TypeScript configuration files
└── vite.config.ts       # Vite build tool configuration
```

## Features

- Fetch user data from an external API
- Store user information in MongoDB
- View all users in a list format
- View detailed information for individual users
- Error handling for API and database operations
- Responsive UI built with React and TailwindCSS

## Technologies Used

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- React Router DOM
- Lucide React (for icons)

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- MongoDB Memory Server (for testing)
- Axios (for API requests)
- dotenv (for environment variables)
- CORS

### Testing
- Vitest (frontend)
- Node.js Test Runner (backend)
- Testing Library (React)
- MSW (Mock Service Worker)
- Supertest
- Sinon

## Setup Instructions

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm or yarn
- MongoDB (local or Atlas connection)

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd User-List/project
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=<your-mongodb-connection-string>
   API_URL=<external-api-url>
   PORT=3000
   ```

4. Start the development server (both frontend and backend)
   ```
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start both frontend and backend development servers concurrently
- `npm run dev:frontend` - Start only the frontend Vite development server
- `npm run dev:backend` - Start only the backend Node server with hot reloading
- `npm run build` - Build the frontend for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the built frontend
- `npm run test` - Run frontend tests with Vitest
- `npm run test:backend` - Run backend tests with Node.js Test Runner
- `npm run coverage` - Generate test coverage report

## Testing

The project includes comprehensive tests for both frontend and backend:

### Frontend Tests
Uses Vitest, Testing Library, and MSW for mocking API calls:
```
npm run test
```

### Backend Tests
Uses Node.js built-in test runner:
```
npm run test:backend
```

## Error Handling

The application includes comprehensive error handling for:
- Database connection issues
- External API failures
- Invalid user requests
- Network errors

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests to ensure everything works
4. Submit a pull request
