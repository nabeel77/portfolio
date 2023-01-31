import React from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi';
import Link from 'next/link';

const AllProjects = ({ projectsArr }) => {
  const projects = projectsArr && projectsArr.length && (
    <div className="my-0 mx-auto w-full flex py-5 px-5 flex-row flex-wrap items-center justify-center card gap-2 bg-base-200">
      {projectsArr.map((project, index) => {
        return (
          <div
            className="card card-compact w-96 bg-base-100 shadow-xl"
            key={index}
          >
            <figure className="w-full">
              <img
                src={`${project.projectDetails.images[0].Location}`}
                loading="lazy"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {project.projectDetails.projectName}
              </h2>
              <div className="card-actions cursor-pointer">
                <Link
                  className="flex flex-row justify-between items-center"
                  href={`/projects/${project.projectDetails.projectId}`}
                >
                  <span>Show project</span>
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

export default AllProjects;
