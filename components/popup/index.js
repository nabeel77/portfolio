import React from 'react';
import globalDesigns from '../../constants/globalDesigns';
import { BiXCircle } from 'react-icons/bi';

const Popup = (props) => {
  const textClasses = `${globalDesigns.responsiveFontStyles}`;
  const borderClasses = `border border-solid ${
    props.state && props.state.border
  }`;
  const icon = props.state && props.state.icon;
  const conditionalStyles = props.isShowing ? 'block' : 'hidden';
  const popup = (
    <div className={`${conditionalStyles} top-20 md:w-max h-max relative`}>
      <button
        className="absolute top-2 right-2 h-6 w-6 text-center"
        onClick={props.hide}
      >
        <BiXCircle className={`w-5 h-5 ${props.state && props.state.text}`} />
      </button>
      <div
        className={`${borderClasses} grid grid-flow-col gap-2 justify-center items-center px-4 py-2 md:w-max md:px-14 md:py-6 bg-transparent rounded`}
      >
        {icon}
        <p className={`${textClasses} break-words`}>
          {props.message && props.message}
        </p>
      </div>
    </div>
  );

  return popup;
};

export default Popup;
