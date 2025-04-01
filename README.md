# Todo List Application

A full-stack Todo List application built with React, Node.js, Express, and MongoDB.

<img width="488" alt="Screenshot 2025-04-01 at 12 15 07 AM" src="https://github.com/user-attachments/assets/36f18d2e-6558-4c53-83f4-e0302115e9dc" />


## Features

- Create, read, update, and delete tasks
- Mark tasks as completed
- Data persistence with MongoDB Atlas
- RESTful API design

## Tech Stack

### Frontend
- React
- Tailwind CSS for styling
- Axios for API requests

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS support for cross-domain requests

## API Endpoints

| Method | Endpoint     | Description            |
|--------|--------------|------------------------|
| GET    | /tasks       | Retrieve all tasks     |
| POST   | /tasks       | Create a new task      |
| PUT    | /tasks/:id   | Update a task by ID    |
| DELETE | /tasks/:id   | Delete a task by ID    |

## Getting Started

### Prerequisites
- Node.js (v18 or above)
- MongoDB Atlas account or local MongoDB installation
- npm

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/todo-app.git
   cd todo-app
   ```

2. Install backend dependencies
   ```
   npm install
   ```

3. Install frontend dependencies
   ```
   cd todo-frontend
   npm install
   ```

4. Create a `.env` file in the project root (for the backend) and one inside `todo-frontend/` (for the frontend)

   - One in the **project root** (for the backend):
   ```
   MONGO_URI=your_mongodb_connection_string
   ```
   
   - One inside the **frontend folder**:
   ```
   PORT=8000
   ```

5. Start the backend server
   ```
   cd ..
   node index.js
   ```

6. Start the frontend development server
   ```
   cd todo-frontend
   npm start
   ```

7. Open your browser and navigate to:
   - Frontend: http://localhost:8000
   - Backend API: http://localhost:3000/tasks

## Testing API with Postman or curl

You can test backend endpoints directly:

Create a new task:

```
curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"title": "Test task"}'
```


## Future Improvements

- User authentication
- Task categories/tags
- Due dates and reminders
- Search and filter functionality
- Mobile app version

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- This project was created as part of practice for a fullstack developer position.
- Thanks to the open-source community for the amazing tools and libraries that made this project possible.
