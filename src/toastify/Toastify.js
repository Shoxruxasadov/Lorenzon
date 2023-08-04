import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const warning = (text, mode, pos) =>
  toast.warn(text, {
    position: pos,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: mode,
  });

export const wrong = (text, mode, pos) =>
  toast.error(text, {
    position: pos,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: mode,
  });

export const success = (text, mode, pos) =>
  toast.success(text, {
    position: pos,
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: mode,
  });

export const info = (text, mode, pos) =>
  toast.info(text, {
    position: pos,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: mode,
  });

export const simple = (text, mode, pos) =>
  toast("🦄 " + text, {
    position: pos,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: mode,
  });
