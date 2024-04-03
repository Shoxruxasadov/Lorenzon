import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from 'next-auth/react';

import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"

import useLocalStorage from "../hooks/useLocalStorage";
import { useStore } from "../store/zustand";

import "..//styles/global.scss" // global
import "..//styles/assets/error.scss"; // error
import "..//styles/loading/wait.scss"; // wait
import "..//styles/home/home.scss" // home
import "..//styles/landing/landing.scss"; // landing
import "..//styles/auth/login.scss"; // login
import "..//styles/auth/register.scss"; // register
import "..//styles/auth/account.scss"; // account
import "..//styles/admin/admin.scss"; // admin
import 'rodal/lib/rodal.css'; // rodal

export default function MyApp({ Component, pageProps, }) {
    const getUserFromToken = useStore(state => state.getUserFromToken);
    const [token, setToken] = useLocalStorage("token", "null")
    const router = useRouter()

    useEffect(() => {
        if (token === "null") {
            return
        }
        getUserFromToken(token, router)
    }, [])

    return <>
        <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
            <ToastContainer />
            <SpeedInsights />
            <Analytics />
        </SessionProvider>
    </>
}

