// App.js
import React, { useState } from 'react';
import Header from './Header';
import Tasks from './Tasks';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  return (
    <div className="App">
      <Header onAdd={addTask} />
      <Tasks tasks={tasks} onDelete={deleteTask} onToggleCompletion={toggleCompletion} />
    </div>
  );
}

export default App;
