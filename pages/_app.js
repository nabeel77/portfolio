import '../styles/globals.css';
import { useRouter } from 'next/router';
import Menu from '../components/menu';
import AuthCheck from '../components/authCheck';

export default function App({ Component, pageProps }) {
  const router = useRouter();
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
  return (
    <>
      {isDashboard ? (
        <AuthCheck>
          <div className="relative w-full h-full">
            <Menu menuItems={menuItems} />
            <Component {...pageProps} />
          </div>
        </AuthCheck>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}
