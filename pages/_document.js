import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" data-theme="luxury">
      <Head />
      <link rel="shortcut icon" href="/favicon/favicon.ico" as="favicon" />
      <link
        rel="preload"
        href="/fonts/Orbitron-Regular.ttf"
        as="Orbitron"
        crossOrigin=""
        type="font/ttf"
      />
      <link
        rel="preload"
        href="/fonts/Orbitron-Bold.ttf"
        as="OrbitronBold"
        crossOrigin=""
        type="font/ttf"
      />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
