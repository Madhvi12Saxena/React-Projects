// src/components/Fireworks.js
import React from 'react';
import { useSpring, animated } from 'react-spring';
import './Firework.css';

const Fireworks = () => {
  const styles = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 2000 },
  });

  return (
    <animated.div style={styles} className="fireworks-container">
      <div className="firework">
        <span className="cracker cracker1"></span>
        <span className="cracker cracker2"></span>
        <span className="cracker cracker3"></span>
      </div>
      <div className="year">2023</div>
      <div className="year new-year">2024</div>
    </animated.div>
  );
};

export default Fireworks;
