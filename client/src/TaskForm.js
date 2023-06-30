import React, { useState } from 'react';

function TaskForm() {
    const [task, setTask] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`${process.env.REACT_APP_SERVER_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: task }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={task} onChange={e => setTask(e.target.value)} />
            <input type="submit" value="Add Task" />
        </form>
    );
}

export default TaskForm;  // Here's the default export
