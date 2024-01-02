// TodoItem.js
import React from 'react';

const TodoItem = ({ task, completeTask, removeTask }) => {
  return (
    <div>
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.text}</span>
      <button onClick={() => completeTask(task.id)}>Complete</button>
      <button onClick={() => removeTask(task.id)}>Remove</button>
    </div>
  );
};

export default TodoItem;
