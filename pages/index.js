import React, { useState, useEffect, useCallback } from 'react';
import Hero from '../components/Hero';
import Expertise from '../components/Expertise';
import Work from '../components/Work';
import Me from '../components/Me';
import Divider from '../components/Divider';
import { useRouter } from 'next/router';
import { getSkills } from '../server/staticDataFetching';

export default function Home({ scrollRefs, skills }) {
  const [index, setIndex] = useState(null);

  const router = useRouter();
  const elements = [
    <Hero />,
    <Me />,
    <Expertise skillSetsArr={skills} />,
    <Work />,
  ];

  useEffect(() => {
    if ('key' in router.query) {
      setIndex(router.query.key);
    }
  }, []);

  useEffect(() => {
    if (index) {
      scrollRefs.current[index].current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [index]);

  return (
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
            <Divider />
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const skills = await getSkills();
  return {
    props: {
      skills: skills,
    },
  };
}
