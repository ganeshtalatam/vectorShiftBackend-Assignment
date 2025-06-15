# VectorShift Assignment 2

## Overview

This project is a full-stack integration platform that allows users to connect with Notion, Airtable, and Hubspot. It consists of a Python FastAPI backend and a React frontend. The backend handles OAuth flows and data fetching, while the frontend provides a user interface for managing integrations and loading data.

---

## Backend (FastAPI)

### Features

- OAuth2 integration with Notion, Airtable, and Hubspot
- Secure credential storage using Redis
- Endpoints for authorizing, and loading data from integrations

### Setup

1. **Install dependencies:**
   ```bash
   pip install -r backend/requirements.txt
   ```
2. **Environment Variables:**
   - Copy the provided `.env.example` file in the `backend/` directory to `.env` and fill in your API credentials for Notion, Airtable, and Hubspot:
     ```bash
     cp backend/.env.example backend/.env
     ```
   - For Hubspot, you need to create a public app to obtain your Client ID and Client Secret:
     1. Go to the [Hubspot Developer Portal](https://developers.hubspot.com/).
     2. Log in and navigate to 'Apps' > 'Create app'.
     3. Fill in the required details (name, description, etc.).
     4. Under 'Auth', set the Redirect URL to `http://localhost:8000/integrations/hubspot/oauth2callback`.
     5. Select the required scopes (e.g., `crm.objects.contacts.read`, `oauth`).
     6. After creating the app, you will see your **Client ID** and **Client Secret** on the app details page.
     7. Add these values to your `.env` file as `HUBSPOT_CLIENT_ID` and `HUBSPOT_CLIENT_SECRET`.
3. **Run Redis server:**
   - Make sure you have Redis installed and running locally. For most systems, you can start Redis with:
     ```bash
     redis-server
     ```
   - On Windows, you can use [Memurai](https://www.memurai.com/) or [Redis for Windows](https://github.com/microsoftarchive/redis/releases) as an alternative, or run Redis in Docker:
     ```bash
     docker run -p 6379:6379 redis
     ```
   - The backend expects Redis to be available at `localhost:6379` by default.
4. **Run the server:**
   ```bash
   python -m uvicorn main:app --reload
   ```
   The backend will be available at `http://localhost:8000`.

---

## Frontend (React)

### Features

- User-friendly forms to connect integrations
- OAuth2 flow handling in-browser
- Data loading and display from connected integrations

### Setup

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```
2. **Run the app:**
   ```bash
   npm start
   ```
   The frontend will be available at `http://localhost:3000`.

---

## Usage

1. Start both backend and frontend servers.
2. Open the frontend in your browser.
3. Enter your user and organization info, select an integration, and follow the prompts to connect.
4. Load and view your data from Notion, Airtable, or Hubspot.

---

## Project Structure

```
backend/
  main.py                # FastAPI app and endpoints
  redis_client.py        # Redis utility functions
  integrations/          # Integration logic for Notion, Airtable, Hubspot
frontend/
  src/
    App.js               # Main React app
    integration-form.js  # Integration selection and user/org input
    data-form.js         # Data loading and display
    integrations/
      integartion.js     # Integration connect logic
```

---

## Notes

- Ensure your API credentials are correct in the backend `.env` file.
- The frontend expects the backend to run on `localhost:8000`.
- The backend expects Redis to be running on `localhost:6379`.
