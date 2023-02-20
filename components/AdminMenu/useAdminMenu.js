import { useRouter } from 'next/router';
import { fetchRequest } from '../../helpers';

const useAdminMenu = () => {
  const router = useRouter();

  const handleLogout = async () => {
    router.replace('/admin/login');
    await fetchRequest('/api/user/logout', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  return { handleLogout };
};

export default useAdminMenu;
