import React from 'react';
import { devTechStack, primaryTechnologies } from '../../staticData/devSkills';
import { devIcons } from '../../staticData/devIcons';
import globalDesigns from '../../staticData/globalDesigns';

const Technologies = ({ skillSetsArr, skillSetsObj, showIcons }) => {
  const skills = skillSetsArr && showIcons && (
    <div className="my-0 mx-auto w-full md:max-w-1/2 px-3.5 py-2 flex flex-wrap justify-evenly bg-neutral p-4 rounded-md gap-2">
      {skillSetsArr.map((skill, index) => {
        return (
          <div className="w-max h-max flex gap-2" key={index}>
            {skillSetsObj[skill]}
          </div>
        );
      })}
    </div>
  );
  return (
    <div>
      <div className="flex flex-col gap-3">
        {skills}
        {!showIcons && (
          <div className="grid grid-cols-md lg:grid-cols-lg gap-16">
            {devTechStack.map((item, index) => (
              <div className="flex flex-col gap-2" key={index}>
                <h3 className="text-primary font-OrbitronBold">
                  {Object.keys(item)[0]}
                </h3>
                <ul className="flex flex-col gap-2">
                  {item[Object.keys(item)[0]].map((tech, index) => (
                    <li
                      key={index}
                      className={`${globalDesigns.responsiveFontStyles} flex gap-2`}
                    >
                      {devIcons[tech]} {tech}{' '}
                      {primaryTechnologies.includes(tech) && (
                        <h3
                          className={`${globalDesigns.responsiveFontStyles} font-OrbitronBold text-accent`}
                        >
                          (Primary)
                        </h3>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Technologies;
