// TodoList.js
import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ tasks, completeTask, removeTask }) => {
  return (
    <div>
      {tasks.map((task) => (
        <TodoItem key={task.id} task={task} completeTask={completeTask} removeTask={removeTask} />
      ))}
    </div>
  );
};

export default TodoList;
