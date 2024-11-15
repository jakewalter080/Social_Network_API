# Social_Network_API

## Description
A RESTful API for a social network web application where users can share their thoughts, react to friends' thoughts, and create a friend list. Built using Express.js for routing, MongoDB database, and Mongoose ODM.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Technologies Used](#technologies-used)
- [Screenshots](#screenshots)

## Installation
1. Make sure MongoDB is installed on your computer
2. Clone the repository
```
git clone: git@github.com:jakewalter080/Social_Network_API.git
```

3. Install dependencies
```bash
npm install
```

## Usage
4. Start MongoDB
```
mongosh
```
5. Run the application
```
# Development mode
npm run dev

# OR Production mode
npm run build
npm start
```

## API Routes

### Users
```bash
GET /api/users - Get all users
GET /api/users/:id - Get user by ID
POST /api/users - Create new user
PUT /api/users/:id - Update user by ID
DELETE /api/users/:id - Delete user by ID
```

### Friends
```bash
POST /api/users/:userId/friends/:friendId - Add a friend
DELETE /api/users/:userId/friends/:friendId - Remove a friend
```

### Thoughts
```bash
GET /api/thoughts - Get all thoughts
GET /api/thoughts/:id - Get thought by ID
POST /api/thoughts - Create new thought
PUT /api/thoughts/:id - Update thought by ID
DELETE /api/thoughts/:id - Delete thought by ID
```

### Reactions
```bash
POST /api/thoughts/:thoughtId/reactions - Add reaction to thought
DELETE /api/thoughts/:thoughtId/reactions/:reactionId - Remove reaction from thought
```

## Technologies Used
- TypeScript
- Express.js
- MongoDB
- Mongoose
- Node.js

## Testing
Use [Insomnia](https://insomnia.rest/) to test the API routes.

1. Start the application using the steps above
2. Open Insomnia
3. Create new HTTP requests with the routes above
4. Test API endpoints

## Contributing
Instructions on how to contribute to the project.

## Questions

For additional questions, please reach out to me via email or GitHub

#### Email: [jakewalter080@gmail.com](jakewalter080@gmail.com)
#### GitHub: [jakewalter080](https://github.com/jakewalter080)