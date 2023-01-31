import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Expertise from '../components/Expertise';
import Work from '../components/Work';
import Divider from '../components/Divider';
import { useRouter } from 'next/router';

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
      <div className="py-28 px-10">
        {elements.map((item, index) => (
          <div key={index} ref={scrollRefs.current[index]}>
            {item}
            <Divider />
          </div>
        ))}
      </div>
    </div>
  );
}
