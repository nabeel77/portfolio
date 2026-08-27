import Head from 'next/head';
import { Hero } from '../components/Hero';
import { Projects } from '../components/Projects';
import { Skills } from '../components/Skills';
import { Experience } from '../components/Experience';
import { Terminal } from '../components/Terminal';
import { Contact } from '../components/Contact';

export default function Home() {
  const imageUrl = 'https://www.nabeelmunir.com/logo/favicon-512x512.png';
  return (
    <>
      <Head>
        <title>Nabeel Munir · Full Stack Engineer</title>
        <meta
          name="description"
          content="Nabeel Munir is a full stack engineer who builds web applications end to end with React, Next.js, Node and PHP."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Nabeel Munir" />
        <meta property="og:url" content="https://www.nabeelmunir.com/" />
        <meta property="og:title" content="Nabeel Munir · Full Stack Engineer" />
        <meta
          property="og:description"
          content="Full stack engineer who builds things for the web, end to end."
        />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:image:alt" content="Nabeel Munir, Full Stack Engineer" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Nabeel Munir · Full Stack Engineer" />
        <meta
          name="twitter:description"
          content="Full stack engineer who builds things for the web, end to end."
        />
        <meta name="twitter:image" content={imageUrl} />
      </Head>

      <Hero />
      <Projects />
      <Skills />
      <Experience />
      <Terminal />
      <Contact />
    </>
  );
}
