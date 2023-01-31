import { useState, useReducer, useCallback } from 'react';

const popupReducer = (state, action) => {
  switch (action.type) {
    case 'ERROR':
      return {
        state: 'error',
        message: action.message,
      };
    case 'SUCCESS':
      return {
        state: 'success',
        message: action.message,
      };
    case 'INFO':
      return {
        state: 'info',
        message: action.message,
      };
    default:
      return state;
  }
};

const usePopup = (initialState) => {
  const [popupState, dispatch] = useReducer(popupReducer, initialState);
  const [isShowing, setIsShowing] = useState(false);

  const setError = useCallback((message) => {
    dispatch({ type: 'ERROR', message });
  }, []);

  const setSuccess = useCallback((message) => {
    dispatch({ type: 'SUCCESS', message });
  }, []);

  const setInfo = useCallback((message) => {
    dispatch({ type: 'INFO', message });
  }, []);

  const showPopup = () => {
    setIsShowing(true);
  };

  const hidePopup = () => {
    setIsShowing(false);
  };

  setTimeout(() => {
    setIsShowing(false);
  }, 3000);

  return [
    isShowing,
    showPopup,
    hidePopup,
    popupState,
    setError,
    setSuccess,
    setInfo,
  ];
};

export default usePopup;
