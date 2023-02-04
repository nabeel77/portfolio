import Skills from '../Skills';
import TextSphere from '../TextSphere';
import { devIcons } from '../../staticData/devIcons';

const Expertise = ({ skillSetsArr }) => {
  return (
    <section id="expertise" className="w-full h-full">
      <div className="lg:px-60 flex flex-col gap-10">
        <h1 className="my-0 mx-auto text-accent text-xl md:text-3xl lg:text-4xl font-OrbitronBold">
          <strong>My Skills</strong> <b className="text-primary">/</b>{' '}
          <strong>Tech stack</strong>
        </h1>
        <div className="w-full h-max  justify-start items-center">
          <Skills
            skillSetsArr={skillSetsArr}
            skillSetsObj={devIcons}
            showIcons={false}
          />
        </div>
      </div>
    </section>
  );
};

export default Expertise;
