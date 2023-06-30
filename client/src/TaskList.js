import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';

function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/tasks`)
            .then(response => response.json())
            .then(data => setTasks(data));
    }, []);

    return (
        <div>
            {tasks.map(task => (
                <TaskItem key={task._id} task={task} />
            ))}
        </div>
    );
}

export default TaskList;  // Here's the default export
