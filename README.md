# Agency Backend

Backend for a Full-Stack Agency Website, built with Node.js, Express, and MongoDB. This API powers user authentication, contact forms, reviews, and user profile management for a digital agency platform.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Data Models](#data-models)
- [License](#license)

---

## Features

- User registration, login, and JWT-based authentication
- User profile management
- Contact form submission and admin review
- Review system for agency services
- Role-based access control (admin/client)
- CORS and secure cookie handling

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** (via Mongoose)
- **JWT** for authentication
- **bcryptjs** for password hashing
- **dotenv** for environment configuration

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB instance (local or cloud)

### Installation

```bash
# Clone the repository
$ git clone <repo-url>
$ cd agency-backend

# Install dependencies
$ npm install
```

### Running the Server

```bash
# For development (with nodemon)
$ npm run dev

# For production
$ npm start
```

The server will start on the port specified in your `.env` file (default: 5050).

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=5050
MONGODB_URI=mongodb://localhost:27017/agency-website
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

## Available Scripts

- `npm start` – Start the server
- `npm run dev` – Start the server with nodemon for development

## API Endpoints

### Auth

- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Login and receive JWT token (in cookie)
- `POST /api/auth/logout` – Logout (clears cookie)
- `GET /api/auth/me` – Get current user info (requires authentication)

### Users

- `PUT /api/users/profile` – Update user profile (requires authentication)

### Contact

- `POST /api/contact` – Submit a contact form
- `GET /api/contact` – Get all contact submissions (admin only)

### Reviews

- `GET /api/reviews` – Get all approved reviews
- `POST /api/reviews` – Submit a review (authenticated users)
- `GET /api/reviews/my-reviews` – Get current user's reviews
- `PUT /api/reviews/:id/approve` – Approve a review (admin only)

## Data Models

### User

- `name`: String, required
- `email`: String, required, unique
- `password`: String, required (hashed)
- `phone`: String
- `bio`: String
- `role`: String ("client" or "admin")
- `isActive`: Boolean

### Contact

- `name`: String, required
- `email`: String, required
- `phone`: String
- `subject`: String, required
- `message`: String, required
- `serviceType`: String (e.g., Web Development, SEO, etc.)
- `status`: String ("new", "in-progress", "resolved")
- `isRead`: Boolean

### Review

- `user`: ObjectId (User), required
- `rating`: Number (1-5), required
- `comment`: String, required
- `service`: String
- `isApproved`: Boolean

### Service (Model only, no routes)

- `title`: String, required
- `description`: String, required
- `features`: [String]
- `price`: String, required
- `category`: String (e.g., Web Development, SEO, etc.)
- `icon`: String
- `isActive`: Boolean
- `popularity`: Number

## License

This project is licensed under the MIT License.
