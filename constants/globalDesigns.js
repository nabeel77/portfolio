import { BiCheck, BiError, BiInfoSquare } from 'react-icons/bi';

const globalDesigns = {
  responsiveFontStyles: 'text-sm md:text-base',
  buttonStyles: 'btn w-1/2 rounded py-2.5 uppercase',
  linkStyles: 'px-3 py-2 rounded hover:btn-ghost',
  error: {
    border: 'border-red-400',
    text: 'text-red-400',
    background: 'bg-red-400',
    icon: <BiError className="w-5 h-5 text-red-400" />,
  },
  success: {
    border: 'border-green-400',
    text: 'text-green-400',
    background: 'bg-green-400',
    icon: <BiCheck className="w-5 h-5 text-green-400" />,
  },
  info: {
    border: 'border-blue-400',
    text: 'text-blue-400',
    background: 'blue-red-400',
    icon: <BiInfoSquare className="w-5 h-5 text-blue-400" />,
  },
};

export default globalDesigns;
