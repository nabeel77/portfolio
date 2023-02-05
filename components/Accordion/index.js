import React, { useState } from 'react';
import { BiPlus, BiMinus } from 'react-icons/bi';
import globalDesigns from '../../staticData/globalDesigns';
import { ImLocation2 } from 'react-icons/im';
import { motion } from 'framer-motion';

const Accordion = ({ content }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <React.Fragment>
      <div
        className="accordion-item cursor-pointer rounded px-4 py-5 w-full md:w-[60%] bg-primary -mb-5"
        onClick={() => setIsActive(!isActive)}
      >
        <div className="accordion-title grid grid-cols-accordionSm md:grid-cols-accordionMd lg:grid-cols-accordionLg flex-row gap-2">
          <h1 className="flex-1 text-accent text-sm lg:text-base break-normal font-OrbitronBold">
            {content.company}
          </h1>
          <h1 className="flex-1 text-accent text-sm hidden md:block lg:text-base">
            {content.workPeriod}
          </h1>
          <span className="text-sm text-accent lg:text-md">
            {isActive ? (
              <BiMinus className="w-5 h-5" />
            ) : (
              <BiPlus className="w-5 h-5" />
            )}
          </span>
        </div>
      </div>

      {
        <motion.div
          initial="hidden"
          animate={{
            y: isActive ? 0 : -50,
            opacity: 1,
          }}
          className={`${
            isActive ? 'block' : 'hidden'
          } accordion-content grid grid-rows-accordionSm lg:grid-cols-accordionPop gap-2 items-center px-4 py-5 -mt-5 w-full md:w-[60%] bg-primary rounded -mt-2`}
        >
          <div className="flex flex-col gap-5 row-span-2">
            <h3
              className={`${globalDesigns.responsiveFontStyles} text-accent flex gap-2`}
            >
              <ImLocation2 className="w-5 h-5" /> {content.location}
            </h3>
            <p className={`${globalDesigns.responsiveFontStyles} text-accent`}>
              {content.responsibilities}
            </p>
            <div className="flex flex-wrap gap-2">
              {content.technologies.map((item, index) => (
                <p
                  className={`${globalDesigns.responsiveFontStyles} text-primary px-5 py-2 rounded-full bg-accent`}
                  key={index}
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div
            className={`${
              content.company === 'Magebit' && 'h-90 -mt-11 lg:h-max lg:mt-5'
            } row-start-1 lg:col-start-2`}
          >
            {content.companyLogo}
          </div>
        </motion.div>
      }
    </React.Fragment>
  );
};

export default Accordion;
