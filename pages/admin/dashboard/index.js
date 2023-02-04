import React from 'react';
import Projects from './projects';
import Skills from './skills';

const Dashboard = () => {
  return (
    <div className="py-10 px-5">
      <Projects />
      <Skills />
    </div>
  );
};

export default Dashboard;
