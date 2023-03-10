import { Technologies } from '../Technologies';
import { devIcons } from '../../staticData/devIcons';

export const Skills = ({ skillSetsArr }) => {
  return (
    <section id="skills" className="w-full h-full">
      <div className="lg:px-60 flex flex-col gap-10">
        <h1 className="my-0 mx-auto text-accent text-xl md:text-3xl lg:text-4xl font-OrbitronBold">
          <strong>My Skills</strong> <b className="text-primary">/</b>{' '}
          <strong>Tech stack</strong>
        </h1>
        <div className="w-full h-max  justify-start items-center">
          <Technologies
            skillSetsArr={skillSetsArr}
            skillSetsObj={devIcons}
            showIcons={false}
          />
        </div>
      </div>
    </section>
  );
};
