import { useState, useEffect } from 'react';

const useScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 900) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    });
    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    visible,
    scrollToTop,
  };
};

export default useScrollToTop;
