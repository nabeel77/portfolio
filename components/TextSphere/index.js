import React, { useRef, useEffect } from 'react';
import TagCloud from 'TagCloud';

const TextSphere = ({ skillSetsArr, skillSetsObj }) => {
  const sphereMounted = useRef(false);
  useEffect(() => {
    if (sphereMounted.current === false) {
      const logos = skillSetsArr.map((item) => {
        return skillSetsObj[item];
      });

      // Render a tagCloud with custom configuration
      var tagCloud = TagCloud('.sphere', logos, {
        // radius in px
        radius: 350,

        // animation speed
        // slow, normal, fast
        maxSpeed: 'fast',
        initSpeed: 'fast',

        // 0 = top
        // 90 = left
        // 135 = right-bottom
        direction: 135,

        // interact with cursor move on mouse out
        keep: true,
      });
    }
    return () => (sphereMounted.current = true);
  }, []);
  // This is what will render the tagcloud:
  return <span className="sphere"></span>;
};

export default TextSphere;
