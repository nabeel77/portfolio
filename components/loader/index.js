import React from 'react';
import responsiveGlobalDesigns from '../globalDesigns';

const Loader = () => {
  const textClasses = `${responsiveGlobalDesigns.responsiveFontStyles} absolute top-9`;
  return (
    <div className="w-sfull h-full flex flex-wrap justify-center items-center flex-row place-items-center bg-gray-loadingBg">
      <div className="flex place-content-center h-max w-max bg-transparent relative">
        <div className="spinner h-24 w-24"></div>
        <p className={textClasses}>Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
