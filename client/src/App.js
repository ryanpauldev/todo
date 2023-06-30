import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

function App() {
  const [tasks, setTasks] = useState([]); // Initialize with empty array

  // Function to fetch tasks from your API
  const fetchTasks = async () => {
    const res = await fetch('/api/tasks'); // Replace with your API endpoint
    const data = await res.json();

    setTasks(data);
  }

  useEffect(() => {
    fetchTasks();
  }, []); // Empty array means run once on mount

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskForm fetchTasks={fetchTasks} />
      <TaskList tasks={tasks} fetchTasks={fetchTasks} />
    </div>
  );
}

export default App;

