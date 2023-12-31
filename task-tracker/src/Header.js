// Header.js
import React, { useState } from 'react';

const Header = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert('Please add a task');
      return;
    }

    onAdd({
      id: Math.floor(Math.random() * 10000),
      text,
      isCompleted: false,
      dueDate,
      category,
    });

    setText('');
    setDueDate('');
    setCategory('');
  };

  return (
    <header>
      <h1>Task Tracker</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Task:</label>
          <input type="text" placeholder="Add Task" value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <div>
          <label>Due Date:</label>
          <input type="text" placeholder="Add Due Date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </div>
        <div>
          <label>Category:</label>
          <input type="text" placeholder="Add Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <button type="submit">Add</button>
      </form>
    </header>
  );
};

export default Header;
