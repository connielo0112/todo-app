import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:3000';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');

  // download tasks from the server
  useEffect(() => {
    axios.get(`${API_BASE}/tasks`).then(res => setTasks(res.data));
  }, []);

  // add a new task
  const addTask = async (e) => {

    // prevent the form from submitting
    e.preventDefault();
    const res = await axios.post(`${API_BASE}/tasks`, { title: newTitle });

    // add the new task to the list of tasks
    setTasks([...tasks, res.data]);

    // clear the input field
    setNewTitle('');
  };

  // toggle task status
  const toggleTask = async (id, completed) => {
    const res = await axios.put(`${API_BASE}/tasks/${id}`, { completed: !completed });
    setTasks(tasks.map(task => task._id === id ? res.data : task));
  };

  // delete a task
  const deleteTask = async (id) => {
    await axios.delete(`${API_BASE}/tasks/${id}`);
    setTasks(tasks.filter(task => task._id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Todo List</h1>

        <form onSubmit={addTask} className="flex gap-2 mb-6">
          <input
            className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            placeholder="Add a new task..."
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Add
          </button>
        </form>

        <ul className="space-y-3">
          {tasks.map(task => (
            <li
              key={task._id}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task._id, task.completed)}
                  className="w-5 h-5"
                />
                <span className={task.completed ? "line-through text-gray-400" : "text-gray-800"}>
                  {task.title}
                </span>
              </div>
              <button
                onClick={() => deleteTask(task._id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
