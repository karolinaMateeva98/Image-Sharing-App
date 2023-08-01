import { toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';

export const showSuccessMessage = (successMessage: string) => {
  toast.success(`${successMessage}`, {
    position: toast.POSITION.TOP_RIGHT
  });
};

export const showErrorMessage = (errorMessage: string) => {
  toast.error(`${errorMessage}`, {
    position: toast.POSITION.TOP_RIGHT
  });
};
