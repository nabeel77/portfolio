import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useLoader from '../hooks/useLoader';

const AuthCheck = (props) => {
  const router = useRouter();
  const [validUser, setValidUser] = useState(false);
  const [loader, showLoader, hideLoader] = useLoader();
  const authenticateUser = useCallback(async () => {
    const result = await fetch('/api/authenticate', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
    return result;
  }, []);

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
