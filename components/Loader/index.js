import React from 'react';
import globalDesigns from '../../staticData/globalDesigns';

const Loader = () => {
  const textClasses = `${globalDesigns.responsiveFontStyles} absolute top-9`;
  return (
    <div className="w-full h-full flex flex-wrap justify-center items-center flex-row place-items-center">
      <div className="flex place-content-center h-max w-max bg-transparent relative">
        <div className="spinner h-24 w-24"></div>
        <p className={textClasses}>Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
