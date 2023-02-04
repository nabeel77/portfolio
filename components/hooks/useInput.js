import { useReducer, useEffect } from 'react';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return { ...state, value: action.val };
    case 'EMPTY':
      return { value: action.val };
    default:
      return state;
  }
};

const useInput = (id, onInput) => {
  const [inputState, dispatch] = useReducer(inputReducer, { value: '' });
  const { value } = inputState;

  useEffect(() => {
    onInput(id, value);
  }, [id, onInput, value]);

  const changeHandler = (event) => {
    dispatch({ type: 'CHANGE', val: event.target.value });
  };

  return {
    inputState,
    changeHandler,
    emptyValue,
  };
};

export default useInput;
