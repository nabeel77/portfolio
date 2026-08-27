import { Html, Head, Main, NextScript } from 'next/document';

// Set the saved theme before paint so there is no flash of the wrong theme.
const themeScript = `
(function() {
  try {
    var t = localStorage.getItem('theme') || 'dark';
    document.documentElement.dataset.theme = t;
  } catch (e) {
    document.documentElement.dataset.theme = 'dark';
  }
})();
`;

export default function Document() {
  return (
    <Html lang="en" data-theme="dark">
      <Head>
        <link rel="icon" href="/logo/favicon.svg" type="image/svg+xml" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/logo/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/logo/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/logo/favicon-192x192.png"
        />
        <link rel="apple-touch-icon" href="/logo/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
