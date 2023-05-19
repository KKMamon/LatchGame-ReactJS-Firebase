import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Checkpoint0 from './Checkpoint1.png';
import { useLocation } from 'react-router-dom';
import './Checkpoint1.css';

function getRandomDestination() {
  const destinations = ['/T1', '/T2', '/T3', '/T4'];
  const randomIndex = Math.floor(Math.random() * destinations.length);
  return destinations[randomIndex];
}

function Checkpoint1() {
  const navigate = useNavigate();
  const location = useLocation();
  const [score, setScore] = useState(location.state?.score || 0);

  useEffect(() => {
    // Do something with the score
    console.log(score);
  }, [score]);

  const handleImageClick = () => {
    const randomDestination = getRandomDestination();
    navigate(randomDestination, { state: { score } });
  };

  return (
    <>
      <img
        src={Checkpoint0}
        alt="checkpoint"
        onClick={handleImageClick}
        className="responsive-img"
      />
    </>
  );
}

export default Checkpoint1;
