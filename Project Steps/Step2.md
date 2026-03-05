# 🌌 Project Proposal: Solar System Explorer

## Stack
**Front-End:** React (with Vite), HTML, CSS, JavaScript  
**Back-End:** Node.js and Express  
**Database:** MongoDB (for storing user accounts, favorites, and cached planet data)  
**API/Data Sources:** NASA Open APIs (e.g., Solar System OpenData, Astronomy Picture of the Day)

---

## Focus
This project is an **evenly balanced full-stack application**.  
- **Front-End:** Clean UI, interactive planet cards, and responsive layout.  
- **Back-End:** API integration, user authentication, and database handling.

---

## Type
A **responsive web application** accessible on both desktop and mobile browsers.

---

## Goal
Create an **interactive educational app** that lets users explore the solar system.  
Users will be able to:
- Browse planets and moons  
- View NASA imagery and planetary facts  
- Save favorite planets  
- Learn about celestial bodies in an engaging way

---

## Users
**Target demographic:**
- Students and educators in science/astronomy  
- Space enthusiasts  
- Casual users interested in learning about planets  

---

## Data
The app will use **NASA Open APIs** for:
- Planetary facts (mass, radius, orbit, atmosphere, etc.)  
- High-quality images  
- Optional fun facts or historical info  

A **local JSON dataset** or custom API may be used for caching data and offline access.

---

## Database Schema

```js
// users collection
{
  _id: ObjectId,
  username: String,
  email: String,
  passwordHash: String,
  createdAt: Date
}

// planets collection
{
  _id: ObjectId,
  name: String,
  description: String,
  distanceFromSun: Number,
  radius: Number,
  gravity: Number,
  imageUrl: String
}

// favorites collection
{
  _id: ObjectId,
  userId: ObjectId,   // references users._id
  planetId: ObjectId, // references planets._id
  savedAt: Date
}

``` 

|**Task Name**                 | **Description**                                        | **Example**                           |
| ----------------------------- | ------------------------------------------------------ | ------------------------------------- |
| **Design Database Schema**    | Define `users`, `planets`, and `favorites` models.     | See schema above.                     |
| **Source Your Data**          | Fetch from NASA API or use local JSON dataset.         | Example: Mars facts and images.       |
| **User Flows**                | Map navigation from Home → Planet Details → Favorites. | Wireframes or flowcharts.             |
| **Set up Backend & Database** | Build Express routes and connect MongoDB.              | `/api/planets`, `/api/users`          |
| **Set up Frontend**           | Create React components for UI.                        | `PlanetCard.jsx`, `PlanetDetails.jsx` |
| **User Authentication**       | Implement login/signup with JWT or sessions.           | Store tokens in localStorage          |


| **Label Type**    | **Description**               | **Example**                                    |
| ----------------- | ----------------------------- | ---------------------------------------------- |
| **Difficulty**    | Estimate task complexity.     | Frontend design = Easy, API integration = Hard |
| **Type**          | Categorize task type.         | Frontend, Backend, Fullstack                   |
| **Stretch Goals** | Optional features beyond MVP. | 3D planets, comparison tool, dark mode         |

### Functionality
-Home page with solar system overview
-Planet detail pages with facts and images
-User login/sign-up
-Ability to save favorite planets
-Mobile-friendly design


### Stretch Features
-3D rotating solar system (Three.js or CSS animation)
-Planet comparison feature
-“Daily Space Fact” widget from NASA’s APOD API
-Light/dark mode toggle

### UPDATED FLOW CHART AND NEW FEATURES!

🌠 New Feature: Birthday Input + Horoscope System

Users can optionally enter their birthday, and the app will determine their zodiac sign and return:

Their daily horoscope

Personality traits

Element (Fire, Earth, Air, Water)

Symbol & mythology

Compatibility info

All horoscope data will be fetched from my database through a custom Express route.

## Updated Flow Chart 
Home Page
   │
   ▼
 Split: Astronomy Section
         Astrology Section       

   │                                 │
   ▼                                 ▼
Astronomy: Browse Planets         Astrology: Enter Birthday
   │                                 │
   ▼                                 ▼
Planet Details Page               Birthday Input (Date Picker)
   │                                 │
   ▼                                 ▼
Save to Favorites                 API Request: /api/horoscope
   │                                 │
   ▼                                 ▼
Favorites Page                     Backend Determines Zodiac Sign
                                      │
                                      ▼
                               Lookup in api
                                      │
                                      ▼
                              Return Horoscope Data
                                      │
                                      ▼
                             Horoscope Display Page
                           - Sign & Date Range
                           - Daily Message
                           - Traits & Compatibility


## Updated database schema

## Database Schema

```js
// users collection
{
  _id: ObjectId,
  username: String,
  email: String,
  passwordHash: String,
  birthday: String,     // NEW: "YYYY-MM-DD"
  zodiacSign: String,   // NEW: cache for speed ("Aries")
  createdAt: Date
}

// planets collection
{
  _id: ObjectId,
  name: String,
  description: String,
  distanceFromSun: Number,
  radius: Number,
  gravity: Number,
  imageUrl: String
}


// favorites collection
{
  _id: ObjectId,
  userId: ObjectId,
  planetId: ObjectId,
  savedAt: Date
}

//horoscope collection
{
  _id: ObjectId,
  sign: String,
  startDate: String,
  endDate: String,
  element: String,
  symbol: String,
  personality: String,
  dailyHoroscope: String,
  compatibility: [String]
}


``` 