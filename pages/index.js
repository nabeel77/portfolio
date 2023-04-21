import React, { useState, useEffect } from 'react';
import { Hero } from '../components/Hero';
import { Skills } from '../components/Skills';
import { Projects } from '../components/Projects';
import { Me } from '../components/Me';
import { Experience } from '../components/Experience';
import { Contact } from '../components/Contact';
import { Divider } from '../components/Divider';
import { ScrollToTop } from '../components/ScrollToTop';
import { Footer } from '../components/Footer';
import { useRouter } from 'next/router';
import { getSkills, getProjects } from '../query/staticDataFetching';
import Head from 'next/head';
import getURL from '../utils/helpers';

export default function Home({ scrollRefs, skills, projects }) {
  const imageUrl = `${getURL('/')}api/og`;
  const { query } = useRouter();
  const [index, setIndex] = useState(null);
  const elements = [
    <Hero key={0} />,
    <Me key={1} />,
    <Skills key={2} skillSetsArr={skills} />,
    <Projects key={3} projectsArr={JSON.parse(projects)} />,
    <Experience key={4} />,
    <Contact key={5} />,
  ];

  useEffect(() => {
    if ('key' in query) {
      setIndex(query.key);
    }
  }, []);

  useEffect(() => {
    if (index) {
      scrollRefs.current[index].current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [index]);

  return (
    <React.Fragment>
      <Head>
        <title>Nabeel Munir Portfolio</title>
        <meta property="og:url" content="https://www.nabeelmunir.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Nabeel Munir Portfolio" />
        <meta property="og:image" content={imageUrl} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="nabeelmunir.com" />
        <meta property="twitter:url" content="https://www.nabeelmunir.com/" />
        <meta name="twitter:title" content="Nabeel Munir Portfolio" />
        <meta name="twitter:image" content={imageUrl} />
      </Head>
      <div className="">
        <div className="py-28 px-10 flex flex-col gap-5">
          {elements.map((item, index) => (
            <div key={index}>
              <div
                ref={scrollRefs.current[index]}
                className={`${index === 0 ? 'h-screen' : 'h-max'} w-full`}
              >
                {item}
              </div>
              {index < elements.length - 1 && <Divider />}
            </div>
          ))}
          <ScrollToTop />
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
}

export async function getServerSideProps(context) {
  const skills = await getSkills();
  const projects = await getProjects();
  return {
    props: {
      skills: skills !== undefined ? skills : null,
      projects: projects && JSON.stringify(projects),
    },
  };
}
