Database Planning – Cosmic Explorer


1. Identifying Required Data

For this application, not all content needs to be stored permanently. Many features pull live data from external APIs. The database should only store information that must persist between user sessions.

The application requires storage for:

User accounts (authentication and identification)

User-saved favorites

External API data (APOD, star map results, astrology information) does not need to be permanently stored unless a user saves it as a favorite.

2. Core Database Entities
Users

The Users table stores account information for authentication and ownership of saved data.

Fields:

id (Primary Key)

username

email (unique)

password (hashed)

created_at

This table allows users to register, log in, and securely access their personalized content.

Favorites

The Favorites table stores all items saved by users in one unified location.

Fields:

id (Primary Key)

user_id (Foreign Key referencing Users.id)

type (identifies category: planet, constellation, APOD, zodiac)

title (display name of saved item)

data (JSON object storing relevant API response data)

created_at

This structure allows all saved items to exist under a single Favorites page while still distinguishing between content types.

3. Relationships

The database follows a one-to-many relationship:

One user can have many favorites.

Each favorite belongs to one user.

This relationship ensures proper data ownership and organization.
