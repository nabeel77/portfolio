import React from 'react';
import { getProjectNames, getProject } from '../../query/staticDataFetching';
import { devIcons } from '../../staticData/devIcons';
import { useRouter } from 'next/router';
import { Loader } from '../../components/Loader';
import Head from 'next/head';

const Project = (props) => {
  const router = useRouter();
  if (router.isFallback) {
    return <Loader />;
  }
  const project = props.project[0].projectDetails;
  return (
    <React.Fragment>
      <Head>
        <title>{project.projectName}</title>
      </Head>
      <div className="grid px-5 py-28 gap-6 lg:grid-cols-2 h-screen w-screen lg:px-10">
        <div className="flex justify-start align-center lg:col-span-full p-3">
          <h1 className="flex align-middle text-2xl md:text-3xl lg:text-5xl font-bold">
            {project.projectName}
          </h1>
        </div>
        <div className="p-3 flex flex-col align-middle gap-5">
          <h3 className="text-2xl md:text-3xl">Project description</h3>
          <p className="text-md font-RalewayMedium">
            {project.projectDescription}
          </p>
        </div>
        <div className="p-3 flex flex-col align-middle gap-5">
          <h3 className="text-2xl md:text-3xl">My responsibilities</h3>
          <p className="text-md font-RalewayMedium">
            {project.responsibilities}
          </p>
        </div>
        <div className="p-3 flex flex-col align-middle gap-5 lg:col-span-full">
          <h3 className="text-xl md:text-2xl">Technologies</h3>
          <ul className="flex gap-5 flex-wrap">
            {project?.technologies.map((item, index) => {
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
        <div className="p-3 relative flex flex-col gap-5 lg:col-span-full">
          {project?.images.map((image, index) => {
            return (
              <div className="rounded" key={index}>
                <img
                  className="w-full rounded max-w-full h-auto object-contain"
                  src={image.Location}
                  alt="project-image"
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
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
  const pathParams =
    projects &&
    projects.map((id) => {
      return {
        params: { pid: id },
      };
    });
  return {
    paths: pathParams,
    fallback: true,
  };
}
