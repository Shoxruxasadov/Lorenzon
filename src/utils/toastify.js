import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useLocalStorage from "../hooks/useLocalStorage";

export const warning = (text, pos) => {
    const [theme, setTheme] = useLocalStorage('theme', 'dark')
    const currentTheme = theme == "system" ? 'dark' : theme
    toast.warn(text, {
        position: pos == undefined ? "top-right" : pos,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: currentTheme,
    });
}

export const wrong = (text, pos) => {
    const [theme, setTheme] = useLocalStorage('theme', 'dark')
    const currentTheme = theme == "system" ? 'dark' : theme
    toast.error(text, {
        position: pos == undefined ? "top-right" : pos,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: currentTheme,
    });
}

export const success = (text, pos) => {
    const [theme, setTheme] = useLocalStorage('theme', 'dark')
    const currentTheme = theme == "system" ? 'dark' : theme
    toast.success(text, {
        position: pos == undefined ? "top-right" : pos,
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: currentTheme,
    });
}

export const info = (text, pos) => {
    const [theme, setTheme] = useLocalStorage('theme', 'dark')
    const currentTheme = theme == "system" ? 'dark' : theme
    toast.info(text, {
        position: pos == undefined ? "top-right" : pos,
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: currentTheme,
    });
}

export const simple = (text, pos) => {
    const [theme, setTheme] = useLocalStorage('theme', 'dark')
    const currentTheme = theme == "system" ? 'dark' : theme
    toast("🦄 " + text, {
        position: pos == undefined ? "top-right" : pos,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: currentTheme,
    });
}

