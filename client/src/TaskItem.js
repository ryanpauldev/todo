import React from 'react';

function TaskItem({ task, fetchTasks }) {
    const updateTask = () => {
        const updatedStatus = task.status === 'incomplete' ? 'complete' : 'incomplete';
        
        fetch(`${process.env.REACT_APP_SERVER_URL}/tasks/${task._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: updatedStatus }),
        })
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                fetchTasks();  // Fetch tasks again after updating a task
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const deleteTask = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/tasks/${task._id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                fetchTasks();  // Fetch tasks again after deleting a task
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <button onClick={updateTask}>Toggle Status</button>
            <button onClick={deleteTask}>Delete</button>
        </div>
    );
}

export default TaskItem;

