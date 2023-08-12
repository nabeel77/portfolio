import { useRouter } from 'next/router';
import { fetchRequest } from '../../utils/helpers';

const useAdminMenu = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await fetchRequest('/api/user/logout', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => router.replace('/admin/login'));
  };

  return { handleLogout };
};

export default useAdminMenu;
