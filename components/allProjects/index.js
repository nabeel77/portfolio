import React from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi';
import Link from 'next/link';

const AllProjects = ({ projectsArr }) => {
  console.log(projectsArr, ' asdjshbdsdjisayusbaduysagxbsauydvauidsg');
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
                src={`data:image/png;base64,${project.projectDetails.images[0]}`}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {project.projectDetails.projectName}
              </h2>
              <div className="card-actions flex flex-row justify-start items-center cursor-pointer">
                <span>Show project</span>
                <Link className="arrow-animation" href="/projects/[pid].js">
                  <HiArrowNarrowRight />
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
