import Image from 'next/image';
import Magebit from '../public/images/Magebit.png';

export const devExperience = [
  {
    company: 'Libautech',
    position: 'Full-stack javascript developer',
    workPeriod: 'Feb 2021 - May 2022',
    location: 'Liepaja, Latvia',
    responsibilities:
      "Developed eCommerce applications for shopify app store. Provided technical support to users of company's applications.",
    technologies: [
      'Javascript',
      'Typescript',
      'React.js',
      'Next.js',
      'Node.js',
      'Koa.js',
    ],
    companyLogo: (
      <svg
        className="libautech"
        width="200"
        height="160"
        viewBox="0 100 1900 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d)">
          <rect
            x="12"
            y="14"
            width="324.316"
            height="324.316"
            rx="30.3809"
            fill="white"
          />
        </g>
        <path
          d="M154.085 177.473L154.258 123.455C154.258 119.583 154.258 115.675 153.393 111.877C151.956 105.77 148.274 100.444 144.443 95.5003C139.343 88.9018 133.669 82.7704 127.489 77.1779C123.502 73.5772 119.11 70.1385 113.917 68.8012C105.838 66.7288 97.5575 71.4758 95.7109 79.6962C95.1619 82.5563 94.9296 85.4685 95.0184 88.3797C95.0184 129.054 95.0184 169.727 95.0184 210.401C95.0184 222.691 95.0877 235.363 100.368 246.559C101.064 248.091 102.178 249.394 103.582 250.316C107.413 252.777 110.553 250.45 113.247 248.279L148.828 219.577C150.409 218.303 152.042 216.966 152.954 215.148C153.941 213.174 153.97 210.876 153.976 208.67L154.085 177.473Z"
          fill="url(#paint0_linear)"
        />
        <path
          d="M166.049 226.512C167.848 226.222 169.67 226.103 171.491 226.157H199.558C204.774 226.157 210.123 226.157 215.014 227.994C220.81 230.168 225.446 234.678 229.828 239.037L245.284 254.427C249.81 258.932 254.69 264.407 253.919 270.753C253.305 275.792 249.063 279.785 244.334 281.593C239.605 283.4 234.412 283.441 229.352 283.459L169.271 283.639C153.884 283.685 137.53 283.459 124.583 275.124C121.384 273.067 118.208 269.928 118.486 266.127C118.747 262.785 121.569 260.315 124.177 258.228C135.609 249.092 147.028 239.932 158.434 230.749L158.781 230.47C160.393 229.174 162.038 227.854 163.963 227.093C164.638 226.834 165.337 226.64 166.049 226.512Z"
          fill="url(#paint1_linear)"
        />
        <defs>
          <filter
            id="filter0_d"
            x="0"
            y="0"
            width="388.316"
            height="388.316"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <fColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="20" dy="18" />
            <feGaussianBlur stdDeviation="16" />
            <fColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow"
              result="shape"
            />
          </filter>
          <linearGradient
            id="paint0_linear"
            x1="74.4524"
            y1="233.464"
            x2="156.168"
            y2="92.387"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#5D24C6" />
            <stop offset="1" stopColor="#2F148E" />
          </linearGradient>
          <linearGradient
            id="paint1_linear"
            x1="167.973"
            y1="300.314"
            x2="211.318"
            y2="225.457"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#5D24C6" />
            <stop offset="1" stopColor="#2F148E" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    company: 'Magebit',
    position: 'Full-stack Magebto 2 developer',
    workPeriod: 'Jun 2022 - Jan 2023',
    location: 'Riga, Latvia',
    responsibilities:
      'Worked in teams and contributed to different projects. Main responsibilites included front-end tasks, bug fixes and some back-end tasks',
    technologies: [
      'Javascript',
      'Php',
      'Alpine.js',
      'Node.js',
      'React.js',
      'PWA studio',
      'Magento 2',
      'Jenkins',
      'Jira',
    ],
    companyLogo: (
      <Image
        alt="Mountains"
        width={80}
        height={50}
        src={Magebit}
        style={{ objectFit: 'contain', marginTop: '30px' }}
      />
    ),
  },
];
