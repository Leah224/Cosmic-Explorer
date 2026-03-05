Connecting the Frontend, Backend, Database, and External APIs
1. How the Frontend Connects to the Backend

The frontend (React + TypeScript) communicates with the backend using HTTP requests. These requests are sent to custom API routes built with Express.

The frontend does not talk directly to the database or third-party APIs. Instead:

Frontend → Express Backend API → Database / External APIs → Response → Frontend

This structure improves:

Security (API keys are hidden on the backend)

Organization (clear separation of concerns)

Scalability (easier to add features later)

2. Backend API Structure

The backend serves as the central hub of the application. It handles:

User authentication (signup/login)

Saving and retrieving user favorites

Fetching astronomy data from external APIs

Connecting to the PostgreSQL database

Example Internal API Routes

Authentication:

POST /api/auth/register

POST /api/auth/login

Favorites:

GET /api/favorites

POST /api/favorites

DELETE /api/favorites/:id

Astronomy Data:

GET /api/starmap

GET /api/constellations

GET /api/apod

GET /api/astrology

These routes allow the frontend to request only the data it needs.

3. Database Connection

The backend connects to a PostgreSQL database using environment variables for security.

The database stores:

Users

Favorites

Possibly cached astronomy data (optional)

The backend handles:

Creating users

Verifying login credentials

Linking favorites to users

Querying stored data efficiently

4. External APIs Used in the Project

Your application integrates multiple astronomy-related APIs to provide dynamic space data.

1. NASA APOD API

Purpose:

Retrieves the Astronomy Picture of the Day

Route:

GET /api/apod

Data Returned:

Image URL

Title

Explanation

Date

Why it’s used:

Provides dynamic daily space content for users

Enhances visual engagement

Security:

API key is stored in backend .env file

Frontend never sees the API key

2. AstronomyAPI

Purpose:

Generates star maps

Provides visible constellations and planetary data based on:

Latitude

Longitude

Date

Route:

GET /api/starmap?lat=..&lon=..&date=YYYY-MM-DD

Data Returned:

Visible constellations

Star chart image

Planet positions

Why it’s used:

Allows real-time sky visualization

Makes the app location-based and interactive

Security:

Application ID and secret are stored on backend

Requests are authenticated server-side

3. Astrology API (Zodiac Data)

Purpose:

Generates zodiac sign information

Returns personality traits and sun sign data

Route:

GET /api/astrology

Data Returned:

Sun sign

Element

Traits

Personality summary

Why it’s used:

Adds an interactive horoscope feature

Allows users to explore zodiac-based personality insights

5. How Everything Works Together

Example Flow: Viewing a Star Map

User enters location and date on frontend.

Frontend sends request to /api/starmap.

Backend calls AstronomyAPI with stored credentials.

AstronomyAPI returns sky data.

Backend sends processed response to frontend.

Frontend renders star map and constellations.

Example Flow: Saving a Favorite

User clicks “Save”.

Frontend sends POST request to /api/favorites.

Backend verifies user token.

Favorite is stored in PostgreSQL linked to user ID.

Backend returns confirmation.

Frontend updates UI.