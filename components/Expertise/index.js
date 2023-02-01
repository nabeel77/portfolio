import Skills from '../Skills';
import { devIcons } from '../../constants/devIcons';

const Expertise = ({ skillSetsArr }) => {
  return (
    <section id="expertise" className="w-full h-full">
      <h1 className="my-0 mx-auto">Expertise</h1>
      <Skills skillSetsArr={skillSetsArr} skillSetsObj={devIcons} />
    </section>
  );
};

export default Expertise;
