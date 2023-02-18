import useScrollToTop from '../../hooks/useScrollToTop';
import { HiArrowNarrowUp } from 'react-icons/hi';
import Button from '../Button';

const ScrollToTop = () => {
  const { visible, scrollToTop } = useScrollToTop();
  return (
    <div>
      {visible && (
        <Button
          styles="z-99999999 rounded fixed right-10 bottom-10 cursor-pointer flex justify-center items-center w-10 h-16 lg:w-12 lg:h-24 rounded-full border border-solid border-accent"
          handleClick={scrollToTop}
        >
          <HiArrowNarrowUp className="text-accent h-5 w-5 lg:h-12 lg:w-8 bg-transparent" />
        </Button>
      )}
    </div>
  );
};

export default ScrollToTop;
