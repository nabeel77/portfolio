import React from 'react';

const Button = (props) => {
  return (
    <button className={`button ${props.styles}`} onClick={props.handleClick}>
      {props.children}
    </button>
  );
};

export default Button;
