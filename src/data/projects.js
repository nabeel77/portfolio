// RadOS is the parent app. Solarium and the auctions app run inside it as sub apps.
export const radiantsSystem = {
  name: 'RadOS',
  meta: 'Radiants',
  status: 'LIVE',
  link: 'https://www.radiant.nexus/',
  blurb:
    'A desktop style operating system on the web that is the front door to the Radiants org.',
  contributions:
    'Helped build RadOS, a windowed desktop style web app that launches the org’s apps inside sandboxed iframes. Built the wallet bridge that passes Solana wallet and session state to the embedded apps over postMessage, the windowing shell and the app catalog, and contributed to the on chain governance programs for organizations and multisig voting.',
  tech: ['Next.js', 'React', 'TypeScript', 'Solana web3.js', 'Zustand'],
  children: [
    {
      name: 'Solarium',
      blurb:
        'A vesting style staking app where you lock tokens to earn XP and spend it on real world products.',
      contributions:
        'Solarium is a staking app with a vesting style lockup. People lock their tokens for a chosen period to earn XP over time, then spend that XP on real world products and ecosystem drops. Built the on chain staking and timelock program in Rust with Anchor, a NestJS backend built as an Apollo GraphQL federation on PostgreSQL that stays in sync with on chain state, and the Next.js app.',
      tech: ['Rust', 'Anchor', 'NestJS', 'Solana web3.js', 'Next.js', 'PostgreSQL'],
    },
    {
      name: 'On Chain NFT Auctions',
      blurb:
        'Admins create auctions and people bid with their NFTs to win the NFT on the block.',
      contributions:
        'Contributed to an auction platform where people bid with their own NFTs to win a featured NFT. Worked on the Anchor programs behind creating auctions, bidding and settlement, the Next.js front end, and a NestJS crank service that finalizes auctions, shipped on AWS with GitHub Actions.',
      tech: ['Rust', 'Anchor', 'Metaplex', 'Solana web3.js', 'Next.js', 'AWS'],
    },
  ],
};

// image is optional (add screenshots to /public/images).
export const projects = [
  {
    name: 'Hackathon Platform',
    blurb:
      'On chain hackathon hosting used by Solana Mobile to run its hackathons.',
    description:
      'An on chain hackathon platform where hackathons, tracks, prizes and judging live transparently on chain. Used by Solana Mobile to host Solana Mobile hackathons.',
    role: 'Smart Contracts · Full Stack',
    contributions:
      'Built an on chain hackathon platform used by Solana Mobile to run Solana Mobile hackathons. Worked on the Anchor programs that manage hackathons, tracks, prizes and judging so funds and results stay transparent on chain.',
    tech: ['Rust', 'Anchor', 'Solana web3.js', 'TypeScript'],
    link: 'https://align.nexus/',
    repo: null,
    image: null,
    status: 'LIVE',
    meta: 'Radiants · Solana Mobile',
  },
  {
    name: 'Capital',
    blurb: 'Ecommerce store for electronics and digital technology.',
    description:
      'Capital is an ecommerce platform that sells electronic equipment and digital technology. It is built on Magento 2 with the Hyva theme for a fast and clean shopping experience.',
    role: 'Frontend Engineer',
    contributions:
      'Worked mainly as a frontend engineer to build the store interface. Collaborated closely with the team, designed and built transactional email templates, connected the frontend with backend services, and integrated third party API services.',
    tech: ['PHP', 'Magento 2', 'Hyva', 'Tailwind CSS', 'Alpine.js'],
    link: 'https://capital.lv/',
    repo: null,
    image: null,
    status: 'LIVE',
  },
  {
    name: 'BasharaCare',
    blurb: 'Beauty and cosmetics store for the Gulf, built as a PWA.',
    description:
      'BasharaCare is a Magento 2 based online store built for clients in the Gulf. It sells cosmetics and beauty products and runs as a Progressive Web App for a fast, app like experience on mobile.',
    role: 'Full Stack Engineer',
    contributions:
      'Contributed across the frontend and backend. Built the storefront as a Progressive Web App using React and Magento PWA Studio, and developed custom PHP modules that expose product data through REST endpoints. Handled the catalog and product API integration between the PWA storefront and the Magento backend.',
    tech: ['PHP', 'Magento 2', 'React.js', 'JavaScript', 'PWA Studio', 'Tailwind CSS'],
    link: 'https://www.basharacare.com/ae_en',
    repo: null,
    image: null,
    status: 'LIVE',
  },
  {
    name: 'WebScraper Shopify Plugin',
    blurb: 'Import scraped data from webscraper.io straight into Shopify.',
    description:
      'A Shopify plugin built around the webscraper.io browser extension. Using the webscraper.io API, it lists the sitemaps a user created and pulls the scraped data so it can be imported into Shopify with little effort. It can also import products automatically once a scraping job finishes.',
    role: 'Full Stack Engineer',
    contributions:
      'Handled the project end to end. Designed the system architecture, built the frontend and backend, and connected the app to the webscraper.io API and Shopify. Set up authentication with OAuth 2.0 and automated product imports once a scraping job completed.',
    tech: [
      'JavaScript',
      'React.js',
      'Next.js',
      'REST API',
      'MySQL',
      'OAuth 2.0',
      'Jest',
      'Docker',
    ],
    link: null,
    repo: null,
    image: null,
    status: 'SHIPPED',
    meta: 'Libautech · Apr 2021 - Jun 2021',
  },
  {
    name: 'Sticky Add To Cart',
    blurb: 'A customizable sticky add to cart bar for Shopify stores.',
    description:
      'A responsive sticky add to cart bar built for the Shopify App Store that merchants can add to their stores. It shows product data dynamically, including image, title, price and variants, and lets merchants set the action after add to cart and change the button text to match. Buyers can pick a variant, choose the quantity and add the product to the cart.',
    role: 'Full Stack Engineer',
    contributions:
      'Owned the full development of the app on my own. Designed the architecture, built the frontend and backend, and wrote the tests.',
    tech: ['JavaScript', 'Next.js', 'Express.js', 'MongoDB', 'REST API'],
    link: 'https://apps.shopify.com/add-sticky-checkout',
    repo: null,
    image: null,
    status: 'LIVE',
    meta: 'Libautech · Feb 2021 - Mar 2021',
  },
];
