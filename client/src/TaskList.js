import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks }) {
    return (
        <div>
            {tasks.map(task => (
                <TaskItem key={task._id} task={task} />
            ))}
        </div>
    );
}

export default TaskList;
