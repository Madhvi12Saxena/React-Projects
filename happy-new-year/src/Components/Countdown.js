// src/components/Countdown.js
import React, { useEffect, useState } from 'react';

const Countdown = () => {
  const calculateTimeLeft = () => {
    const currentTime = new Date();
    const targetDate = new Date('January 1, 2024 00:00:00 GMT+0000');
    const difference = targetDate - currentTime;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <div className="text-center mt-8">
      <h1 className="text-4xl font-bold mb-4">Happy New Year 2024 Countdown</h1>
      {timeLeft.days ? (
        <div>
          <p className="text-2xl">Days: {timeLeft.days}</p>
          <p className="text-2xl">Hours: {timeLeft.hours}</p>
          <p className="text-2xl">Minutes: {timeLeft.minutes}</p>
          <p className="text-2xl">Seconds: {timeLeft.seconds}</p>
        </div>
      ) : (
        <p className="text-2xl">Happy New Year 2024!</p>
      )}
    </div>
  );
};

export default Countdown;
