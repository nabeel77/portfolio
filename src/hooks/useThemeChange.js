import { useState, useCallback, useEffect } from 'react';

const useSelect = (initialValue, isLocalStorage) => {
  const [value, setValue] = useState(initialValue);
  const onChange = useCallback((event) => {
    if (isLocalStorage) {
      localStorage.setItem('theme', event.target.value.toLowerCase());
    }
    setValue(event.target.value);
    setDataTheme(event.target.value);
  }, []);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    const themeSet = theme !== null;
    if (themeSet) {
      setValue(theme);
      setDataTheme(theme);
    }
  }, []);

  const setDataTheme = useCallback(
    (theme) => {
      document.querySelector('html').setAttribute('data-theme', theme);
    },
    [value]
  );

  return [value, onChange];
};

export default useSelect;
