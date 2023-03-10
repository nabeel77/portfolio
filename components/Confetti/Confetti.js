import Confetti from 'react-confetti';
import React, { useState, useRef, useEffect } from 'react';

export const ConfettiEffect = () => {
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const confetiRef = useRef(null);

  useEffect(() => {
    setHeight(confetiRef.current.clientHeight);
    setWidth(confetiRef.current.clientWidth);
  }, []);

  return (
    <div className="" ref={confetiRef}>
      <Confetti numberOfPieces={150} width={500} height={height} />
    </div>
  );
};
