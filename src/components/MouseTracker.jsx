import React, { useEffect } from 'react';

const MouseTracker = () => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      document.body.style.setProperty('--move-x', `${e.clientX}px`);
      document.body.style.setProperty('--move-y', `${e.clientY}px`);
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Очистка при размонтировании компонента
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return null; // Этот компонент не рендерит ничего в DOM
};

export default MouseTracker;