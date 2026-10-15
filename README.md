# Nritya Nova

Premium dance studio web application with public pages, admissions, contact messaging, and an admin dashboard.

## Tech stack
- React (Create React App)
- Express.js
- MongoDB + Mongoose
- Socket.IO
- JWT auth
- Bootstrap-friendly custom CSS

## Project structure
- client/ — Create React App frontend
- server/ — Express API and MongoDB models

## Prerequisites
- Node.js 18+
- MongoDB running locally or a MongoDB Atlas connection string

## Create the app
```bash
mkdir nritya-nova
cd nritya-nova
npx create-react-app client
```

## Install dependencies
```bash
npm install --save-dev concurrently
cd client && npm install react-router-dom axios react-icons framer-motion bootstrap
dcd server && npm install
```

## Environment variables
Copy `.env.example` to `.env` and fill in values.

For a deployed frontend and API on separate origins, set `CLIENT_URLS` on the
server to a comma-separated list of the exact frontend origins (including
`https://`), and set `REACT_APP_API_URL` in the client build environment to the
API base URL ending in `/api`. Rebuild the client after changing that variable.
Localhost and loopback frontend origins on any port are allowed outside
production; production requests must match `CLIENT_URL` or `CLIENT_URLS`.

## Run locally
```bash
npm run dev
```
This starts the backend and frontend together.

## Backend
```bash
cd server
npm run dev
```

## Frontend
```bash
cd client
npm start
```

## Deploy the frontend to Netlify

The root `netlify.toml` configures Netlify to build the React app from `client`,
publish `client/build`, and route page requests through the app so React Router
URLs work when opened directly or refreshed. The Express API must be hosted
separately; set Netlify's `REACT_APP_API_URL` environment variable to that API's
base URL ending in `/api`, then redeploy. Configure the API's `CLIENT_URLS` to
include the Netlify site URL.

## Admin setup
```bash
cd server
node scripts/create-admin.js
```

## Notes
This project is designed for local development and can be deployed to a Node host with MongoDB.
