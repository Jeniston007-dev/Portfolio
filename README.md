# Fiverr Portfolio

## Project structure

- `frontend/`
  - `package.json`
  - `vite.config.js`
  - `index.html`
  - `src/`
    - `main.jsx`
    - `App.jsx`
    - `styles.css`

- `backend/`
  - `package.json`
  - `server/`
    - `server.js`

- `shared/`
  - `profile.js`

## Frontend code

The frontend is a Vite + React app located inside `frontend/`.
It fetches chat messages from `/api/chat`, which is proxied to the backend during development.

### Run frontend only

```bash
cd /Users/jeniston/Development/Fiverr/Portfolio
npm run dev:frontend
```

## Backend code

The backend is an Express API inside `backend/`.
It exposes:

- `GET /api/health`
- `POST /api/chat`

The backend reads `shared/profile.js` and uses an Anthropic Claude API key when available.

### Run backend only

```bash
cd /Users/jeniston/Development/Fiverr/Portfolio
npm run dev:backend
```

## Run both together

```bash
cd /Users/jeniston/Development/Fiverr/Portfolio
npm run dev
```

## Shared data

- `shared/profile.js` contains the portfolio data used by both frontend and backend.
