import React, { useEffect, useState } from 'react';
import useUser from '../../../components/hooks/useUser';
import useLoader from '../../../components/hooks/useLoader';
import { useRouter } from 'next/router';
import usePopup from '../../../components/hooks/usePopup';
import globalDesigns from '../../../components/globalDesigns';
import Popup from '../../../components/popup';

const Dashboard = () => {
  const router = useRouter();
  const [loader, showLoader, hideLoader] = useLoader();
  const [
    isShowing,
    showPopup,
    hidePopup,
    popupState,
    setError,
    setSuccess,
    setInfo,
  ] = usePopup({ message: '' });
  useEffect(() => {
    const user = async () => {
      showLoader();
      const result = await useUser();
      if (result.message === 'Authenticated') {
        // setInfo('There was an info');
        // showPopup();
      } else if (result.message === 'Invalid user') {
        router.push('/admin/login');
      }
      hideLoader();
    };
    user();
  }, []);

  return (
    <>
      <Popup
        isShowing={isShowing}
        state={globalDesigns[popupState.state]}
        message={popupState.message}
        hide={hidePopup}
      />
      {loader}
    </>
  );
};

export default Dashboard;
