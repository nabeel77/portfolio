import React from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi';
import Link from 'next/link';
import globalDesigns from '../../staticData/globalDesigns';

export const AllProjects = ({ projectsArr }) => {
  const projects = projectsArr && projectsArr.length && (
    <div className="my-0 mx-auto w-full flex py-5 px-5 flex-row flex-wrap items-center justify-center card gap-2 bg-base-200">
      {projectsArr.map((project, index) => {
        return (
          <div
            className="card card-compact w-80 h-72 lg:w-96 lg:h-80 bg-base-100 shadow-xl"
            key={index}
          >
            <figure className="w-full h-[70%]">
              <img
                className="w-full h-full object-cover"
                src={`${project.projectDetails.images[0].Location}`}
                alt="project-img"
                loading="lazy"
              />
            </figure>
            <div className="card-body">
              <h2
                className={`${globalDesigns.responsiveFontStyles} card-title font-OrbitronBold`}
              >
                {project.projectDetails.projectName}
              </h2>
              <div className="card-actions cursor-pointer">
                <Link
                  className="flex flex-row justify-between items-center"
                  href={`/projects/${project.projectDetails.projectId}`}
                >
                  <span className="text-sm lg:text-md">Show project</span>
                  <span className="arrow-animation ml-2">
                    <HiArrowNarrowRight />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
  return <>{projects}</>;
};
