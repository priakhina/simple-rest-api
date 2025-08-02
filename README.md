# Simple REST API

This is a Node.js RESTful API built with Express and Firebase Realtime Database. It allows users to manage users, income, and expenses. The API supports CRUD operations and serves a static HTML page with API documentation at the root (/).

## Table of contents

- [Project Overview](#project-overview)
  - [Live URL](#live-url)
- [Installation Instructions](#installation-instructions)
- [API Usage](#api-usage)
- [Environment Variables](#environment-variables)
- [Dependencies](#dependencies)

## Project Overview

This project provides three main resource endpoints:
- `/users` – Manage user profiles.
- `/income` – Track various income sources.
- `/expenses` – Record and categorize spending.

All resources are validated using [Joi](https://joi.dev/) schemas to ensure data consistency.

### Live URL
The API is deployed on Render: [https://simple-rest-api-a7ge.onrender.com](https://simple-rest-api-a7ge.onrender.com).

## Installation Instructions

### 1. Clone the Repository
```
git clone https://github.com/priakhina/simple-rest-api.git
cd simple-rest-api
```
### 2. Install dependencies

Make sure you have [Node.js](https://nodejs.org/en) (v16 or higher) installed.

```
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project with the following variables:

```bash
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxx@your-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nYOUR_KEY_LINE1\\nYOUR_KEY_LINE2\\n...\\n-----END PRIVATE KEY-----\\n"
FIREBASE_DB_URL=https://your-project-id.firebaseio.com
PORT=3000
```
### 4. Start the Server

```
npm run dev
```

or in production:

```
npm start
```

Server will start on `http://localhost:3001` (or your defined `PORT`).

## API Usage

Once running, you can:
- Access the API documentation by visiting:
  `http://localhost:3001/` if running locally or [https://simple-rest-api-a7ge.onrender.com](https://simple-rest-api-a7ge.onrender.com)
- Use tools like [Postman](https://www.postman.com/) to interact with endpoints.

The follwing API endpoints are available:

### General

- **`GET /`** - A detailed description of the REST API and available endpoints

### Users

- **`GET /users`** - Retrieve all users.
- **`POST /users`** - Create a new user.
- **`PUT /users/:id`** - Update an existing user by ID.
- **`DELETE /users/:id`** - Delete a user by ID.

### Income

- **`GET /income`** - Retrieve all income entries.
- **`POST /income`** - Add a new income entry.
- **`PUT /income/:id`** - Update an existing income entry by ID.
- **`DELETE /income/:id`** - Delete an income entry by ID.

### Expenses

- **`GET /expenses`** - Retrieve all expenses.
- **`POST /expenses`** - Add a new expense.
- **`PUT /expenses/:id`** - Update an existing expense by ID.
- **`DELETE /expenses/:id`** - Delete an expense by ID.

Refer to the documentation page for information about endpoints, sample requests, and responses.

## Environment Variables

| Variable  | Description |
| ------------- | ------------- |
| FIREBASE_PROJECT_ID  | Your Firebase project ID  |
| FIREBASE_CLIENT_EMAIL  | Client email from the service account JSON  |
| FIREBASE_PRIVATE_KEY | Private key |
| FIREBASE_DB_URL | Firebase Realtime Database URL |
| PORT | (Optional) Port number for the server |

> [!NOTE]  
> You can find these values by generating a [Firebase Admin SDK private key](https://console.firebase.google.com/ > Project Settings > Service Accounts).

## Dependencies

All dependencies are listed in `package.json`. Major ones include:
- [express](https://www.npmjs.com/package/express) - Web application framework for building RESTful APIs with Node.js
- [firebase-admin](https://www.npmjs.com/package/firebase-admin) - Firebase Admin SDK
- [body-parser](https://www.npmjs.com/package/body-parser) - Node.js body parsing middleware
- [joi](https://www.npmjs.com/package/joi) - Data validation for JavaScript
- [dotenv](https://www.npmjs.com/package/dotenv) - Loads environment variables from a `.env` file into `process.env`


