console.log('Starting server...');

// import required modules
console.log('Loading modules...');
const express = require('express');
const mongoose = require('mongoose');
const Task = require('./models/Task');
const cors = require('cors');

// create an Express app
console.log('Configuring Express app...');
const app = express();
const PORT = 3000;

// use cors middleware
app.use(cors({
  origin: 'http://localhost:8000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// use express to parse JSON data
app.use(express.json());

// start the server
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

require('dotenv').config();

// connect to MongoDB Atlas
console.log('Attempting to connect to MongoDB...');
mongoose.connect(process.env.MONGO_URI, {
  connectTimeoutMS: 5000,
  serverSelectionTimeoutMS: 5000
})
.then(() => console.log('Connected to MongoDB.'))
.catch(err => console.error('MongoDB connected error.', err));

// create a new task
app.post('/tasks', async (req, res) => {
  const { title } = req.body;
  try {
    const newTask = new Task({ title }); 
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// check all tasks
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// update task status
app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(id, { completed }, { new: true });
    res.json(task);
  } catch (err) {
    res.status(404).json({ error: 'Task not found.' });
  }
});

// delete a task
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.json({ message: 'Deleted.' });
});

// Add a route for the root path
app.get('/', (req, res) => {
  res.send('Todo API is running. Use /tasks to access the tasks endpoints.');
});


