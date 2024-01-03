// src/App.js
import React from 'react';
import Countdown from './Components/Countdown.js';
import Firework from './Components/Firework.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <Countdown />
      <Firework />
    </div>
  );
}

export default App;
