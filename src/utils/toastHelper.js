import { toast } from 'react-toastify';

export const notify = (type, message) => {
  const options =
  {
    position: toast.POSITION.BOTTOM_RIGHT,
    theme: "dark",
    hideProgressBar: true,
    newestOnTop: false,
    pauseOnHover: false
  }

  switch (type) {
    case type === 'success':
      toast.success(message, options);
      break;
    case type === 'error':
      toast.error(message, options);
      break;
    case type === 'warning':
      toast.warn(message, options);
      break;
    case type === 'info':
      toast.info(message, options);
      break;
    default:
      toast(message, options);
      break;
  }
}