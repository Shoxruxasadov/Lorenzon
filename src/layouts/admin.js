import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

import useLocalStorage from "../hooks/useLocalStorage";
import Sidebar from '../components/admin/sidebar';
import Loading from '../components/loading/admin';
import { useStore } from '../store/zustand';
import Root from './root'
import axios from 'axios';

export default function AdminLayout({ children, page, title }) {
    const { role } = useStore(state => state.user);
    const isAdmin = useStore(state => state.isAdmin);
    const [token, setToken] = useLocalStorage("token", "null")
    const [isLoading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        if (token === "null" || role!='admin') { router.push('/'); return }
        // isAdmin ? setLoading(false) : verifyAdmin(token, router, setLoading)
        setLoading(false)
    }, [])

    if (isLoading) return <Loading />
    return (
        <Root page="admin" title={title}>
            <Sidebar />
            <main id={page}>
                {children}
            </main>
        </Root>
    )
}
