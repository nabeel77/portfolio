import React, { useEffect, useCallback } from 'react';
import useLoader from '../../../components/hooks/useLoader';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const router = useRouter();
  // const [loader, showLoader, hideLoader] = useLoader();

  // useEffect(() => {
  //   const user = async () => {
  //     showLoader();
  //     const result = await authenticateUser();
  //     if (result.message === 'Invalid user') {
  //       router.push('/admin/login');
  //     }
  //     hideLoader();
  //   };
  //   user();
  // }, []);

  return <></>;
};

export default Dashboard;
