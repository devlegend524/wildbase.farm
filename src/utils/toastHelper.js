import { toast } from 'react-toastify';

export const notify = (type, message) => {
  const options =
  {
    position: toast.POSITION.TOP_RIGHT,
    theme: "dark",
    hideProgressBar: false,
    newestOnTop: false,
    pauseOnHover: false
  }

  switch (type) {
    case type === 'success':
      toast.success(message, options);
    case type === 'error':
      toast.error(message, options);
    case type === 'warning':
      toast.warn(message, options);
    case type === 'info':
      toast.info(message, options);
    default:
      toast(message, options);
  }
}