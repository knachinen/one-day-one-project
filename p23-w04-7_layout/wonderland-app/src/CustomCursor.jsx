import React, { useState, useEffect } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const handleMouseMove = ({ clientX, clientY }) => {
      setPoints(prevPoints => [...prevPoints, { x: clientX, y: clientY }].slice(-20)); // Store last 20 points
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      setPoints(prevPoints => {
        if (prevPoints.length > 1) {
          return prevPoints.slice(1);
        }
        return prevPoints;
      });
      requestAnimationFrame(animate);
    };

    // This part of the logic is simplified, a more robust solution would use a proper animation library.
    // The trail effect is created by rendering multiple divs that lag behind the cursor.
    // For this implementation, we will render a simplified version.

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // For simplicity, we'll render 3 arrows that follow the mouse.
  // A true lagging trail is more complex and best with an animation library.
  const [pos1, setPos1] = useState({ x: 0, y: 0 });
  const [pos2, setPos2] = useState({ x: 0, y: 0 });
  const [pos3, setPos3] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e) => {
      setPos1({ x: e.clientX, y: e.clientY });
      setTimeout(() => setPos2({ x: e.clientX, y: e.clientY }), 100);
      setTimeout(() => setPos3({ x: e.clientX, y: e.clientY }), 200);
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);


  return (
    <>
      <div className="cursor-arrow" style={{ transform: `translate3d(${pos1.x}px, ${pos1.y}px, 0)` }} />
      <div className="cursor-arrow" style={{ transform: `translate3d(${pos2.x}px, ${pos2.y}px, 0)` }} />
      <div className="cursor-arrow" style={{ transform: `translate3d(${pos3.x}px, ${pos3.y}px, 0)` }} />
    </>
  );
};

export default CustomCursor;
