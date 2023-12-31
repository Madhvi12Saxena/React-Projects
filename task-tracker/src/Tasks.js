// Tasks.js
import React from 'react';
import Task from './Task';

const Tasks = ({ tasks, onDelete, onToggleCompletion }) => {
  return (
    <div>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onDelete={onDelete} onToggleCompletion={onToggleCompletion} />
      ))}
    </div>
  );
};

export default Tasks;
