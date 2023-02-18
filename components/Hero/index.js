import useHero from './useHero';
import { HiArrowNarrowDown } from 'react-icons/hi';
import MovingParticles from '../Particles';

const Hero = () => {
  useHero(['#name', '#profesion'], '.arrow');
  return (
    <section id="hero" className="w-full h-full">
      <MovingParticles />
      <div className="h-[75%] relative flex flex-col gap-4 justify-center items-center">
        <h1
          id="name"
          className="text-primary text-3xl md:text-5xl lg:text-7xl font-OrbitronBold"
        >
          NABEEL MUNIR
        </h1>
        <span
          id="profesion"
          className="text-md md:text-2xl lg:text-4xl font-bold"
        >
          Full Stack Web Developer
        </span>
        <div
          id="arrow-container"
          className="arrow w-full h-auto absolute bottom-20 lg:bottom-0 flex justify-center items-center"
        >
          <a
            className="arrow cursor-pointer flex justify-center items-center w-10 h-16 lg:w-12 lg:h-24 rounded-full border border-solid border-primary"
            href="#me"
          >
            <HiArrowNarrowDown className="arrow-down text-primary h-5 w-5 lg:h-12 lg:w-8 bg-transparent" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
