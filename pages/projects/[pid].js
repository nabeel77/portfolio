import React from 'react';
import { getProjectNames, getProject } from '../../server/staticDataFetching';
import { devIcons } from '../../constants/devIcons';
import { useRouter } from 'next/router';
import Loader from '../../components/Loader';

const Project = (props) => {
  const router = useRouter();
  if (router.isFallback) {
    return <Loader />;
  }
  const project = props.project[0].projectDetails;
  return (
    <div className="grid gap-6 lg:grid-cols-2 h-screen w-screen p-5 lg:p-10">
      <div className="flex justify-start align-center lg:col-span-full p-3">
        <h1 className="flex align-middle text-2xl md:text-3xl lg:text-5xl font-bold">
          {project.projectName}
        </h1>
      </div>
      <div className="p-3 flex flex-col align-middle gap-5">
        <h3 className="text-2xl md:text-3xl">Project description</h3>
        <p className="text-md">{project.projectDescription}</p>
      </div>
      <div className="p-3 flex flex-col align-middle gap-5">
        <h3 className="text-2xl md:text-3xl">My responsibilities</h3>
        <p className="text-md">{project.projectDescription}</p>
      </div>
      <div className="p-3 flex flex-col align-middle gap-5 lg:col-span-full">
        <h3 className="text-xl md:text-2xl">Technologies</h3>
        <ul className="flex gap-5 flex-wrap">
          {project.technologies.map((item, index) => {
            return (
              <div
                className="flex gap-2 justify-center items-center"
                key={index}
              >
                <div className="w-max h-max text-primary transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-150">
                  {devIcons[item]}
                </div>
                <li className="text-md">{item}</li>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="p-3 relative lg:col-span-full">
        {project.images.map((image, index) => {
          return (
            <img
              className="w-full max-w-full h-auto object-contain"
              src={image.Location}
              key={index}
              loading="lazy"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Project;

export const getStaticProps = async (context) => {
  const project = await getProject(context.params.pid);
  return {
    props: {
      project: JSON.parse(JSON.stringify(project)),
    },
  };
};

export async function getStaticPaths() {
  const projects = await getProjectNames();
  const pathParams = projects.map((id) => {
    return {
      params: { pid: id },
    };
  });
  return {
    paths: pathParams,
    fallback: true,
  };
}