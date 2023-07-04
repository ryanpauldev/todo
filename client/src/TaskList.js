import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, fetchTasks }) {
  const [tasksOrder, setTasksOrder] = useState([]);

    // Update tasksOrder when tasks change
    useEffect(() => {
        if (tasks) {
        setTasksOrder(tasks.map(task => task._id));
        }
    }, [tasks]);
  

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow drop
    e.currentTarget.classList.add('over');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('over');
  };

  const handleDrop = (e) => {
    const droppedItemId = e.dataTransfer.getData("text");
    const taskItems = [...tasksOrder];
    const droppedItemIndex = taskItems.findIndex(taskId => taskId === droppedItemId);
    taskItems.splice(droppedItemIndex, 1);
    const targetIndex = e.target.getAttribute('data-index');
    taskItems.splice(targetIndex, 0, droppedItemId);
    e.currentTarget.classList.remove('over');
    setTasksOrder(taskItems);
  };

  return (
    <div 
    onDragOver={handleDragOver} 
    onDrop={handleDrop}
    onDragLeave={handleDragLeave}
    className='App' // make sure this class matches the one in your CSS
    >
      {tasks && tasksOrder.map((taskId, index) => {
        const task = tasks.find(t => t._id === taskId);
        return (
          task &&  // Check if task is defined
          <TaskItem 
            key={task._id} 
            task={task} 
            index={index} 
            fetchTasks={fetchTasks} 
          />
        );
      })}
    </div>
  );
}

export default TaskList;



