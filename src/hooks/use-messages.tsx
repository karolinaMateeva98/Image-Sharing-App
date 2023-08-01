import { useEffect, useState } from 'react';
import { showErrorMessage, showSuccessMessage } from '../utils/Toast';

const useMessages = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (errorMessage) {
      showErrorMessage(errorMessage);
      setErrorMessage('');
    }
    if (successMessage) {
      showSuccessMessage(successMessage);
      setSuccessMessage('');
    }
  }, [errorMessage, successMessage]);

  return { errorMessage, setErrorMessage, successMessage, setSuccessMessage };
};

export default useMessages;
