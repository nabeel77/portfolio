import { useReducer, useEffect } from 'react';

/**
 * Description:
 * This is hook directly affiliated with Input component that handles input change and input state change events
 *
 * @param {*} id // input id to keep track of which input is being changed
 * @param {*} onInput // a function to handle input change this function is used to change the state of form
 * in useForm hook.
 * @returns
 * it returns an object of following values
 * {
 * inputState, // the current state of input field
 * changeHandler // a function that is called when input change occurs
 * }
 */

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

  /* 
  every time an input change occurs for any input id, the onInput function will trigger that will change the form
  state in useForm hook
  */
  useEffect(() => {
    onInput(id, value);
  }, [id, onInput, value]);

  const changeHandler = (event) => {
    dispatch({ type: 'CHANGE', val: event.target.value });
  };

  return {
    inputState,
    changeHandler,
  };
};

export default useInput;
