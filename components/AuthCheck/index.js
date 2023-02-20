import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useLoader from '../../hooks/useLoader';
import { authenticateUser } from '../../helpers';

const AuthCheck = (props) => {
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
    <>
      {loader}
      {validUser && props.children}
    </>
  );
};

export default AuthCheck;
