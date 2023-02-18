import { useReducer, useCallback } from 'react';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value },
        },
      };
    case 'EMPTY':
      return {
        inputs: action.inputs,
      };
    default:
      return state;
  }
};

const useForm = (initialInput) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInput,
  });

  const inputHandler = useCallback((id, value) => {
    dispatch({ type: 'INPUT_CHANGE', value: value, inputId: id });
  }, []);

  const setFormData = useCallback((inputData) => {
    dispatch({ type: 'SET_DATA', inputs: inputData });
  }, []);

  const setFormEmpty = useCallback(() => {
    dispatch({ type: 'EMPTY', inputs: initialInput });
  }, []);

  return [formState, inputHandler, setFormEmpty, setFormData];
};

export default useForm;
