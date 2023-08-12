import { useEffect, useState, useCallback } from 'react';
import { fetchRequest, validateEmail } from '../../utils/helpers';
import usePopup from '../../hooks/usePopup';
import useForm from '../../hooks/useForm';

/**
 * Description
 * The useContact hook is directly affiliated with Contact component
 * 
 * @returns 
 * it returns and object of following values
 * {
 *  formState, // checks the form state to validate input every time the state changes
 *  inputHandler, // a function that handles input changes
 *  isShowing, // to show popup for success or error messages
 *  popupState, // check whether popup is shown or not
 *  hidePopup, // a function to handle popup close button click
 *  submitDisabled, // boolean value to check whether the send button should be disabled or not
 *  handleSendMessage, // function to handle send button click
 *  sendingMessage, // boolean value to check whether the message has been sent or not
   }
 */

function useContact() {
  const { emailValidation } = validateEmail();
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [isShowing, showPopup, hidePopup, popupState, setError, setSuccess] =
    usePopup({
      message: '',
    });
  const [formState, inputHandler, setFormEmpty] = useForm({
    name: { value: '' },
    email: { value: '' },
    message: { value: '' },
  });

  // create flitered form data to be sent to server for processing
  const createFormData = useCallback(() => {
    const date = new Date(Date.now());
    return {
      name: formState.inputs.name.value,
      email: formState.inputs.email.value,
      message: formState.inputs.message.value,
      date: date.toLocaleString('lv-LV', {
        hour12: false,
      }),
    };
  }, [formState]);

  const sendMessage = async (formState) => {
    const formData = createFormData(formState);
    try {
      const result = await fetchRequest('/api/email', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      if (result.status === 201) {
        setSuccess(result.message);
        showPopup();
        setFormEmpty();
        setSubmitDisabled(true);
        setSendingMessage(false);
      } else if (result.status === 400) {
        setError(result.message);
        showPopup();
        setSendingMessage(false);
      }
    } catch (error) {
      setError(error.message);
      showPopup();
      setSendingMessage(false);
    }
  };

  // handle send button click
  const handleSendMessage = async () => {
    setSendingMessage(true);
    if (!emailValidation(formState.inputs.email.value) && !submitDisabled) {
      setSubmitDisabled(true);
      setError('Please provide a valid email address');
      showPopup();
    } else {
      await sendMessage(formState);
    }
  };

  // check for contact form inputs validation every time the form state changes
  useEffect(() => {
    if (
      emailValidation(formState.inputs.email.value) &&
      formState.inputs.message.value
    ) {
      setSubmitDisabled(false);
    } else if (
      !emailValidation(formState.inputs.email.value) ||
      !formState.inputs.message.value
    ) {
      setSubmitDisabled(true);
    }
  }, [formState]);

  return {
    formState,
    inputHandler,
    isShowing,
    popupState,
    hidePopup,
    submitDisabled,
    handleSendMessage,
    sendingMessage,
  };
}

export default useContact;
