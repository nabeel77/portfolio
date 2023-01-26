import React from 'react';
import { getProjectNames, getProject } from '../../server/staticDataFetching';

const Project = (props) => {
  console.log(props.project);
  return <h1>I am project</h1>;
};

export default Project;

export const getStaticProps = async (context) => {
  const project = await getProject(context.params.pid);
  return {
    props: {
      project: JSON.stringify(project[0]),
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
    fallback: true, // can also be true or 'blocking'
  };
}
