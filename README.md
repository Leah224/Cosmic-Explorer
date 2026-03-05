# Cosmic Explorer

Cosmic Explorer is an interactive web application that allows users to explore the night sky, learn about celestial bodies, track zodiac signs, and save their favorite stars and signs. Built with React, TypeScript, Tailwind CSS, and a Node.js/Express backend, it features a smooth cosmic aesthetic with interactive models.

# Features
# Oberservatory

Enter latitude, longitude, and date/time to view the visible celestial objects in the sky.

Displays planets and Polaris with images and visibility data.

Click on each celestial body to view detailed altitude, azimuth, and extra info.

Add/remove celestial bodies to/from favorites.

# Astrology

Input your birth date to reveal your zodiac sign.

Displays zodiac traits, strengths, weaknesses, love, career, lucky color, number, and day.

Clickable modals with zodiac info and the ability to favorite/unfavorite signs.

Zodiac symbols are displayed prominently above the name.

# Favorites

Stores favorite stars and zodiac signs in local storage.

Click on a favorite to open a modal with all relevant information and images.

Easily remove items from favorites with a toggleable star button.

# Authentication

Login and signup pages with JWT authentication.

Matches the cosmic aesthetic with blurred backgrounds, gradients, and rounded forms.

Login/signup toggle functionality.

Stores JWT token in local storage after successful login.


# Installation

Clone the repository:

git clone https://github.com/yourusername/cosmic-explorer.git
cd cosmic-explorer

Install backend dependencies:

cd backend
npm install

Install frontend dependencies:

cd ../frontend
npm install

Create a .env file in backend/ with the following:

PORT=5000
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cosmic_data
NASA_API_KEY=your_nasa_api_key

Start backend server:

cd ../backend
npm run dev

Start frontend:

cd ../frontend
npm start
Usage

Navigate to /home after logging in.

Use the Observatory page to explore visible planets and Polaris. Click each planet for more info.

Use the Astrology page to discover zodiac signs based on birthdate.

Favorites are stored locally and accessible from the Favorites page.

Toggle favorite stars or zodiac signs directly in modals.

# Technologies

Frontend: React, TypeScript, Tailwind CSS, React Router

Backend: Node.js, Express, PostgreSQL

Authentication: JWT

API Integration: NASA APIs (for celestial data)