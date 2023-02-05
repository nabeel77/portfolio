import React from 'react';
import Projects from './projects';
import Skills from './skills';
import globalDesigns from '../../../staticData/globalDesigns';

const Dashboard = () => {
  return (
    <div className="py-28 px-5 flex flex-col gap-10">
      <div className="flex flex-col gap-2 justify-center items-center">
        <h1
          className={`${globalDesigns.responsiveFontStyles} font-RalewayMedium`}
        >
          Skills
        </h1>
        <Skills />
      </div>
      <div className="flex flex-col gap-2 justify-center items-center">
        <h1
          className={`${globalDesigns.responsiveFontStyles} font-RalewayMedium`}
        >
          Projects
        </h1>
        <Projects />
      </div>
    </div>
  );
};

export default Dashboard;
