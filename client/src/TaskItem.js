import React from 'react';

function TaskItem({ task }) {

    const updateTask = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/tasks/${task._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: 'New Task Title' }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const deleteTask = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/tasks/${task._id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
}

export default TaskItem;
