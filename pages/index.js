import React, { useState, useEffect, useCallback } from 'react';
import Hero from '../components/Hero';
import Expertise from '../components/Expertise';
import Work from '../components/Work';
import Divider from '../components/Divider';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

export default function Home({ scrollRefs }) {
  const [index, setIndex] = useState(null);

  const router = useRouter();
  const elements = [<Hero key={0} />, <Expertise key={1} />, <Work key={2} />];

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
            <div ref={scrollRefs.current[index]} className="w-full h-screen">
              {item}
            </div>
            <Divider />
          </div>
        ))}
      </div>
    </div>
  );
}
