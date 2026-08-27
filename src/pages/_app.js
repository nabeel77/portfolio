import '../../styles/globals.css';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '../components/theme/ThemeContext';
import { GridBg } from '../components/GridBg';
import { GridGlow } from '../components/GridGlow';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <GridBg />
      <GridGlow />
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <Nav />
        <Component {...pageProps} />
        <Footer />
      </div>
      <Analytics />
    </ThemeProvider>
  );
}
