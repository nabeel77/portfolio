import '../styles/globals.css';
import { useRouter } from 'next/router';
import Menu from '../components/Menu';
import AuthCheck from '../components/AuthCheck';
import useHeader from '../components/hooks/useHeader';
import Header from '../components/Header';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [isMobileMenuOpen, scrollRefs, generateLinkTags, handleMenuClick] =
    useHeader();
  const isDashboard = router.pathname.includes('dashboard');
  const menuItems = [
    {
      title: 'Projects',
      path: '/admin/dashboard/projects',
    },
    {
      title: 'Skills',
      path: '/admin/dashboard/skills',
    },
  ];
  const linkTags = generateLinkTags();

  return (
    <>
      {isDashboard ? (
        <AuthCheck>
          <div className="px-5 relative w-full h-full">
            <Menu menuItems={menuItems} />
            <Component {...pageProps} />
          </div>
        </AuthCheck>
      ) : (
        <div>
          <Header
            buttonClick={handleMenuClick}
            links={linkTags}
            isMobileMenuOpen={isMobileMenuOpen}
          />
          <Component {...pageProps} scrollRefs={scrollRefs} />
        </div>
      )}
    </>
  );
}
