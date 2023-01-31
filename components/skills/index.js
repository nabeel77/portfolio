import React from 'react';

const SkillSets = ({ skillSetsArr, skillSetsObj }) => {
  const skills = skillSetsArr && (
    <div className="my-0 mx-auto w-full md:max-w-1/2 px-3.5 py-2 flex flex-wrap justify-evenly bg-neutral p-4 rounded-md gap-2">
      {skillSetsArr.map((skill, index) => {
        return (
          <div className="w-max h-max" key={index}>
            {skillSetsObj[skill]}
          </div>
        );
      })}
    </div>
  );
  return <>{skills}</>;
};

export default SkillSets;
