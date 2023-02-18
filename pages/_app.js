import '../styles/globals.css';
import { useRouter } from 'next/router';
import Menu from '../components/Menu';
import AuthCheck from '../components/AuthCheck';
import useHeader from '../hooks/useHeader';
import Header from '../components/Header';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [isMobileMenuOpen, scrollRefs, generateLinkTags, handleMenuClick] =
    useHeader(['Home', 'Me', 'Skills', 'Projects', 'Experience', 'Contact']);
  const isDashboard = router.pathname.includes('dashboard');
  const isLogin = router.pathname.includes('login');
  const dashboardMenuItems = [
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
            <Menu menuItems={dashboardMenuItems} />
            <Component {...pageProps} />
          </div>
        </AuthCheck>
      ) : isLogin ? (
        <Component {...pageProps} />
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
