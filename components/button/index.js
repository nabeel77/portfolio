import React from 'react';

const Button = (props) => {
  const myClass = `button ${props.styles}`;
  return (
    <button className={myClass} onClick={props.handleClick}>
      {props.children}
    </button>
  );
};

export default Button;
