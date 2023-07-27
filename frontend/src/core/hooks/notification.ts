import { toast, ToastOptions } from 'react-toastify';
import { useCallback } from 'react';

const commonOptions: ToastOptions = {
  position: 'bottom-right',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'light'
};

type Type = typeof commonOptions.type;

export const useNotification = () => {
  const notification = useCallback(
    (message: string, type: Type) =>
      toast(message, {
        ...commonOptions,
        type
      }),
    []
  );

  const success = useCallback(
    (message: string) =>
      toast(message, {
        ...commonOptions,
        type: 'success'
      }),
    []
  );

  const common = useCallback(
    (message: string) =>
      toast(message, {
        ...commonOptions,
        type: 'default'
      }),
    []
  );

  const error = useCallback(
    (message: string) =>
      toast(message, {
        ...commonOptions,
        type: 'error'
      }),
    []
  );

  const info = useCallback(
    (message: string) =>
      toast(message, {
        ...commonOptions,
        type: 'info'
      }),
    []
  );

  const warning = useCallback(
    (message: string) =>
      toast(message, {
        ...commonOptions,
        type: 'warning'
      }),
    []
  );

  return {
    success,
    common,
    error,
    info,
    warning,
    notification
  };
};
