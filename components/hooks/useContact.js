import { useEffect, useState } from 'react';
import { fetchRequest } from '../../helpers';
import usePopup from './usePopup';
import useForm from './useForm';

function useContact() {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState(
    'Email address is required'
  );
  const [formValid, setFormValid] = useState(false);
  const [isShowing, showPopup, hidePopup, popupState, setError, setSuccess] =
    usePopup({
      message: '',
    });
  const [formState, inputHandler, setFormEmpty, setFormData] = useForm({
    name: { value: '' },
    email: { value: '' },
    message: { value: '' },
  });

  const blurHandler = (event) => {
    switch (event) {
      case 'email': {
        setEmailDirty(true);
        break;
      }
      default:
        setEmailDirty(true);
        break;
    }
  };

  const createFormData = (formData) => {
    const date = new Date(Date.now());
    return {
      name: formData.inputs.name.value,
      email: formData.inputs.email.value,
      message: formData.inputs.message.value,
      date: date.toLocaleString('lv-LV', {
        hour12: false,
      }),
    };
  };

  const setSent = () => {
    if (!emailSent) {
      setEmailSent(true);
    } else {
      setTimeout(() => {
        setEmailSent(false);
      }, 100);
    }
  };

  const sendMessage = async (event, formState) => {
    event.preventDefault();
    const formData = createFormData(formState);
    try {
      const result = await fetchRequest('/api/email', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      if (result.status === 200) {
        setSuccess(result.message);
        showPopup();

        setFormEmpty();
      } else {
        setError(result.message);
        showPopup();
      }
    } catch (error) {
      setError(error.message);
      showPopup();
    }
  };

  const handleSendMessage = async (event, formState) => {
    event.preventDefault();
    await sendMessage(event, formState);
  };

  return {
    formState,
    inputHandler,
    isShowing,
    popupState,
    hidePopup,
    emailSent,
    handleSendMessage,
  };
}

export default useContact;
