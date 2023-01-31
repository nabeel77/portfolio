import React, { useState, useRef, useCallback, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Expertise from '../components/Expertise';
import Work from '../components/Work';
import Divider from '../components/Divider';
import { useRouter } from 'next/router';
import useHeader from '../components/hooks/useHeader';

export default function Home({ scrollRefs }) {
  const [index, setIndex] = useState(null);
  const router = useRouter();
  const elements = [<Hero />, <Expertise />, <Work />];

  useEffect(() => {
    if (router.query.hasOwnProperty('key')) {
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
