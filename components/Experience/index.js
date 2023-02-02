import Accordion from '../Accordion';
import { devExperience } from '../../constants/devExperience';

const Experience = () => {
  return (
    <section id="experience">
      <div className="lg:px-10 flex flex-col justify-center items-center gap-10">
        <h1 className="my-0 mx-auto text-accent text-xl md:text-3xl lg:text-4xl font-OrbitronBold">
          <strong>Companies I have worked for</strong>{' '}
        </h1>

        {devExperience.map((item, index) => (
          <Accordion key={index} content={item} />
        ))}
      </div>
    </section>
  );
};

export default Experience;
