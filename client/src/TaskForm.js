import React, { useState } from 'react';

function TaskForm({ fetchTasks }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('incomplete');

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, status }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            setTitle('');  // Clear the form fields
            setDescription('');
            setStatus('incomplete');
            fetchTasks(); // Call fetchTasks to update the list of tasks
        })
        .catch((error) => {
            console.error('Error:', error);
        });
  };

  return (
    <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={title} 
          onChange={e => setTitle(e.target.value)}
          placeholder="Title" 
        />
        <input 
          type="text" 
          value={description} 
          onChange={e => setDescription(e.target.value)}
          placeholder="Description" 
        />
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option value="incomplete">Incomplete</option>
          <option value="complete">Complete</option>
        </select>
        <input type="submit" value="Add Task" />
    </form>
  );
}

export default TaskForm;
