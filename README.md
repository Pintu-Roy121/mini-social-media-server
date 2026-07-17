# AppifyLab Task Server

A REST API for a social feed-style application, built with **Node.js**, **Express.js**, **TypeScript**, **MongoDB**, and **Mongoose**. Supports posts with images, public/private visibility, nested comments and replies, and a like system covering posts, comments, and replies.

## Author

Pintu Roy

## Live Demo - Server / Back-End

🔗 **[https://appify-lab-task-server.vercel.app](https://appify-lab-task-server.vercel.app)**

## Tech Stack

- **Node.js** + **Express.js 5**
- **TypeScript**
- **MongoDB** + **Mongoose**
- **Zod** — request validation
- **JWT** (`jsonwebtoken`) — authentication
- **bcryptjs** — password hashing
- **Cloudinary** + **Multer** (`multer-storage-cloudinary`) — image upload and storage
- **http-status-codes** — consistent HTTP status handling
- **CORS**

## Prerequisites

Make sure you have installed:

- Node.js (v18 or later)
- MongoDB (local instance or MongoDB Atlas)
- npm
- A Cloudinary account (for image uploads)

## Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd appifylab-task-server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

Create a `.env` file in the project root and add the following variables:

```env
PORT=5000

DATABASE_URL=your_mongodb_connection_string

JWT_ACCESS_SECRET=your_jwt_secret
JWT_ACCESS_EXPIRES_IN=7d

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Run the project

Start the development server (auto-restarts on file changes via `ts-node-dev`):

```bash
npm run dev
```

The server will run at:

```
http://localhost:5000
```

Build for production:

```bash
npm run build
```

## Project Structure

```
src/
│── app/
│   ├── modules/       # feature modules (auth, post, comment, reply, likes, etc.)
│   ├── middleware/     # auth guard, file upload (Multer + Cloudinary), error handling
│   ├── routes/         # route definitions per module
│   ├── utils/           # shared helpers (e.g. AppError, catchAsync)
│   └── config/          # env config, Cloudinary config, DB connection
│
├── app.ts               # Express app setup (middleware, routes)
└── server.ts             # server entry point, DB connection + listen
```

## Features

- **Authentication** — registration and login with JWT access tokens; passwords hashed with bcrypt
- **Posts** — create posts with text and/or an image (uploaded to Cloudinary via Multer), shown newest-first
- **Post visibility** — `public` (visible to everyone) or `private` (visible only to the author)
- **Likes** — like/unlike posts, comments, and replies, with duplicate-like prevention and live counts
- **Comments & replies** — comment on posts and reply to comments, each with their own like state
- **"Who liked this"** — list the users who liked a given post, comment, or reply
- **Request validation** — all incoming payloads validated with Zod schemas before hitting the database
- **Centralized error handling** — a single `AppError` class + global error handler normalize Zod, Mongoose, and duplicate-key errors into consistent JSON responses
- **Modular folder structure** — each feature (auth, posts, comments, replies, likes) organized as its own module

## API Base URL

```
http://localhost:5000/api/v1
```

## Available Scripts

| Script          | Description                                   |
| --------------- | --------------------------------------------- |
| `npm run dev`   | Start the development server with auto-reload |
| `npm run build` | Compile TypeScript to JavaScript (`tsc`)      |
| `npm test`      | Not yet configured                            |

## License

This project is licensed under the ISC License.
