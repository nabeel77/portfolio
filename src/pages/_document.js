import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" data-theme="luxury">
      <Head />
      <link rel="shortcut icon" href="/favicon/favicon.ico" as="favicon" />
      <link
        rel="prefetch"
        href="/fonts/Orbitron-Regular.ttf"
        as="font"
        crossorigin="anonymous"
        type="font/ttf"
      />
      <link
        rel="prefetch"
        href="/fonts/Orbitron-Bold.ttf"
        as="font"
        crossorigin="anonymous"
        type="font/ttf"
      />
      <link
        rel="prefetch"
        href="/fonts/Raleway-Black.ttf"
        as="font"
        crossorigin="anonymous"
        type="font/ttf"
      />
      <link
        rel="prefetch"
        href="/fonts/Raleway-Bold.ttf"
        as="font"
        crossorigin="anonymous"
        type="font/ttf"
      />
      <link
        rel="prefetch"
        href="/fonts/Raleway-Medium.ttf"
        as="font"
        crossorigin="anonymous"
        type="font/ttf"
      />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
