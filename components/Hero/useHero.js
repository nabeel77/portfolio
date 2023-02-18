import { useEffect } from 'react';
import { gsap } from 'gsap';
import SplitType from 'split-type';

/**
 *
 * @param {*} textComponentNames to animate the components
 * @param {*} arrow to animate the down arrow
 *
 * Description:
 * This hook is specific for Hero component and it animates the provided components
 */

const useHero = (textComponentNames, arrow) => {
  const componentIds = textComponentNames;
  useEffect(() => {
    componentIds.forEach((componentId) => {
      const name = new SplitType(componentId);
      componentId === '#name' &&
        name.chars.forEach((item) => {
          return item.addEventListener('mouseenter', () => {
            item.classList.add('bouncing');
            item.addEventListener('animationend', () => {
              item.classList.remove('bouncing');
            });
          });
        });
      gsap.to('.char', {
        y: 0,
        stagger: 0.05,
        delay: 0.2,
        duration: 0.1,
      });
      gsap.to(arrow, {
        y: 0,
        delay: 1,
        duration: 1,
      });
    });
  }, []);
};

export default useHero;
