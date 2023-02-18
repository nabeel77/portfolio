import { useState, useCallback, useReducer } from 'react';

const imageUploadReducer = (state, action) => {
  switch (action.type) {
    case 'Add_IMAGE':
      return [...state, action.imageUrl];
    default:
      return state;
  }
};

const useImageUpload = (initialState) => {
  const [imageUrlsState, dispatch] = useReducer(
    imageUploadReducer,
    initialState
  );
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

  const onImageChange = useCallback((event) => {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size > 3000000) {
        setError(true);
      } else {
        let img = event.target.files[0];
        addImage(img);
      }
    }
  }, []);

  const addImage = useCallback((imageUrl) => {
    dispatch({ type: 'Add_IMAGE', imageUrl });
  }, []);

  changeErrorState();

  return [onImageChange, error, changeErrorState, imageUrlsState, addImage];
};

export default useImageUpload;
