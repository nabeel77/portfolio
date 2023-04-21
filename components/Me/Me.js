import globalDesigns from '../../staticData/globalDesigns';
import Image from 'next/image';
import Nabeel from '../../public/images/Nabeel.jpg';

export const Me = () => {
  return (
    <section id="me" className="w-full h-full">
      <div className="lg:px-60 flex flex-col gap-10">
        <div className="avatar my-0 mx-auto">
          <div className="w-40 lg:w-56 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <Image alt="Nabeel" src={Nabeel} />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-lg md:text-xl font-OrbitronBold text-primary">
            Introduction
          </h3>
          <p
            className={`${globalDesigns.responsiveFontStyles} font-RalewayMedium text-justify`}
          >
            Hi. My name is{' '}
            <strong className="text-primary">Nabeel Munir</strong>. I am a full
            stack web developer. Apart from web development, I can also do
            mobile application development.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-lg md:text-xl font-[Orbitron-bold] text-primary">
            Goals
          </h3>
          <p
            className={`${globalDesigns.responsiveFontStyles} font-RalewayMedium text-justify`}
          >
            My ultimate objective is to enhance my{' '}
            <strong className="text-primary">Full-Stack</strong> javascript
            development skills. I have proficient experience in{' '}
            <strong className="text-primary">React.js</strong>,{' '}
            <strong className="text-primary">Next.js</strong>,{' '}
            <strong className="text-primary">Node.js</strong>,{' '}
            <strong className="text-primary">Koa.js</strong> and have got
            working experience with frontend technologies such as{' '}
            <strong className="text-primary">Tailwind CSS</strong>,
            <strong className="text-primary">Sass</strong>,{' '}
            <strong className="text-primary">Less</strong>,{' '}
            <strong className="text-primary">HTML5</strong>. I have also worked
            with testing technologies like{' '}
            <strong className="text-primary">Jest</strong>,{' '}
            <strong className="text-primary">Mocha</strong>,{' '}
            <strong className="text-primary">Storybook</strong>. I am always
            seeking ways to improve my abilities in these technologies and enjoy
            exploring and learning new technologies. Additionally, I aspire to
            become a better person both professionally and personally.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-lg md:text-xl font-[Orbitron-bold] text-primary">
            Hobbies
          </h3>
          <p
            className={`${globalDesigns.responsiveFontStyles} font-RalewayMedium text-justify`}
          >
            During leisure hours, I find pleasure in{' '}
            <strong className="text-primary">cooking</strong>,{' '}
            <strong className="text-primary">socializing</strong> with
            <strong className="text-primary"> friends</strong>, and going for{' '}
            <strong className="text-primary">hikes</strong>. Additionally, I
            enjoy engaging in
            <strong className="text-primary"> crypto</strong> and{' '}
            <strong className="text-primary">NFT</strong> trading as a hobby.
            This allows me to dive into the
            <strong className="text-primary"> Blockchain</strong> technology and
            manage my finances. By trading NFTs, I also improve my technical
            skills as I study and perform technical analysis on trading charts
            and gain hands-on experience in the application of Blockchain
            technology.
          </p>
        </div>
      </div>
    </section>
  );
};
