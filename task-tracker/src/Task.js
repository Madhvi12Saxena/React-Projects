// Task.js
import React from 'react';

const Task = ({ task, onDelete, onToggleCompletion }) => {
  const { id, text, isCompleted, dueDate, category } = task;

  return (
    <div className={`task ${isCompleted ? 'completed' : ''}`}>
      <h3>
        {text}
        <button className="delete-btn" onClick={() => onDelete(id)}>
          Delete
        </button>
      </h3>
      <p>Due Date: {dueDate}</p>
      <p>Category: {category}</p>
      <input type="checkbox" checked={isCompleted} onChange={() => onToggleCompletion(id)} />
    </div>
  );
};

export default Task;
