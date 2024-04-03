import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

import useLocalStorage from "../hooks/useLocalStorage";
import Sidebar from '../components/admin/sidebar';
import Loading from '../components/loading/admin';
import { useStore } from '../store/zustand';
import Root from './root'

export default function AdminLayout({ children, page, title }) {
    const getUserFromToken = useStore(state => state.getUserFromToken);
    const [token, setToken] = useLocalStorage("token", "null")
    const [isLoading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        if (token === "null") {
            router.push('/')
            return
        }
        getUserFromToken(token, router).finally(() => setLoading(false))
    }, [])

    // if (isLoading) return <Loading />
    return (
        <Root page="admin" title={title}>
            <Sidebar/>
            <main id={page}>
                {children}
            </main>
        </Root>
    )
}
