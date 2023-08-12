import React from 'react';

export const Button = (props) => {
  return (
    <button className={`button ${props.styles}`} onClick={props.handleClick}>
      {props.children}
    </button>
  );
};
