import React from 'react';
import globalDesigns from '../../staticData/globalDesigns';
import { BiXCircle } from 'react-icons/bi';
import { motion, AnimatePresence } from 'framer-motion';

const Popup = (props) => {
  const dropIn = {
    hidden: {
      transform: 'scale(0)',
      opacity: 0,
    },
    visible: {
      transform: 'scale(1)',
      opacity: 1,
      transition: {
        duration: 0.1,
        type: 'spring',
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      transform: 'scale(0)',
      opacity: 0,
    },
  };
  const textClasses = `${globalDesigns.responsiveFontStyles}`;
  const icon = props.state && props.state.icon;
  const popup = props.isShowing && (
    <motion.div
      key="popup"
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`rounded bg-primary mx-y-0 mx-auto fixed bottom-5 md:w-max h-max`}
    >
      <button
        className="absolute top-[0.4rem] lg:top-2 right-2 h-6 w-6 text-center"
        onClick={props.hide}
      >
        <BiXCircle className={`w-5 h-5 ${props.state && props.state.text}`} />
      </button>
      <div className="grid grid-flow-col gap-2 justify-center items-center px-4 py-2 md:w-max md:px-14 md:py-6 bg-transparent rounded">
        {icon}
        <p className={`${textClasses} text-accent break-words`}>
          {props.message && props.message}
        </p>
      </div>
    </motion.div>
  );

  return (
    <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
      {popup}
    </AnimatePresence>
  );
};

export default Popup;
