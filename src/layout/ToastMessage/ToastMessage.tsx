import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RootState } from '../../redux/store';

enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

function ToastMessage() {
  const { toastMessage } = useSelector((state: RootState) => state.ui);

  const ToastStyle = (message: string, status: string) => {
    switch (status) {
      case ToastType.SUCCESS:
        return toast.success(message, {
          theme: 'colored',
        });
      case ToastType.ERROR:
        return toast.error(message, { theme: 'colored' });
      case ToastType.WARNING:
        return toast.warning(message, {
          theme: 'colored',
        });
      case ToastType.INFO:
        return toast.info(message, { theme: 'colored' });
      default:
        return null;
    }
  };

  useEffect(() => {
    if (toastMessage) {
      const { message, status } = toastMessage;
      if (message !== '' && status !== '') {
        ToastStyle(message, status);
      }
    }
  }, [toastMessage]);

  return (
    <ToastContainer
      position='top-right'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='light'
    />
  );
}

export default ToastMessage;
