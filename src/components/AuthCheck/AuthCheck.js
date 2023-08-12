import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { authenticateUser } from '../../utils/helpers';
import useLoader from '../../hooks/useLoader';

export const AuthCheck = ({ children }) => {
  const router = useRouter();
  const [validUser, setValidUser] = useState(false);
  const [loader, showLoader, hideLoader] = useLoader();

  useEffect(() => {
    const user = async () => {
      showLoader();
      const result = await authenticateUser();
      if (result.message === 'Invalid user') {
        router.push('/admin/login');
      } else {
        setValidUser(true);
      }
      hideLoader();
    };
    user();
  }, []);

  return (
    <React.Fragment>
      {loader}
      {validUser && children}
    </React.Fragment>
  );
};
