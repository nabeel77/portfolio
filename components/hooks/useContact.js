import { useEffect, useState, useCallback } from 'react';
import { fetchRequest } from '../../helpers';
import usePopup from './usePopup';
import useForm from './useForm';
import { validateEmail } from '../../helpers';

function useContact() {
  const { emailValidation } = validateEmail();
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [isShowing, showPopup, hidePopup, popupState, setError, setSuccess] =
    usePopup({
      message: '',
    });
  const [formState, inputHandler, setFormEmpty, setFormData] = useForm({
    name: { value: '' },
    email: { value: '' },
    message: { value: '' },
  });

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

  const handleSendMessage = useCallback(async () => {
    setSendingMessage(true);
    if (!emailValidation(formState.inputs.email.value) && !submitDisabled) {
      setSubmitDisabled(true);
      setError('Please provide a valid email address');
      showPopup();
    } else {
      await sendMessage(formState);
    }
  });

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
