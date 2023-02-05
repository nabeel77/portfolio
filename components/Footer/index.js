import { FaGithub } from 'react-icons/fa';
import { BsLinkedin } from 'react-icons/bs';

const Footer = () => {
  return (
    <div className="w-full h-16 bg-base-200 flex justify-center items-center">
      <div className="flex justify-center items-center max-h-max gap-4">
        <a href="https://www.linkedin.com/in/nabeel-munir-8a7a99134/">
          <BsLinkedin className="h-6 w-6" />
        </a>
        <a href="https://github.com/Nabeel77">
          <FaGithub className="h-6 w-6" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
