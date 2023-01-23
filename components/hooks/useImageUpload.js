import React, { useState, useCallback, useEffect } from 'react';

const useImageUpload = () => {
  const [imageUrl, setImageUrl] = useState(false);
  const [error, setError] = useState(false);
  const changeErrorState = useCallback(
    () =>
      setInterval(() => {
        if (error) {
          setError(false);
        }
      }, 3000),
    []
  );

  changeErrorState();

  const onImageChange = useCallback((event) => {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size > 3000000) {
        setImageUrl('');
        setError(true);
      } else {
        let img = event.target.files[0];
        setImageUrl(URL.createObjectURL(img));
      }
    }
  }, []);

  return [imageUrl, onImageChange, error, changeErrorState];
};

export default useImageUpload;
