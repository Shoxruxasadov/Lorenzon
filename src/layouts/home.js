import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from "react";

import useLocalStorage from "../hooks/useLocalStorage";
import Loading from '../components/loading/home';
import Sidebar from '../components/home/sidebar';
import Content from '../components/home/content';
import Player from '../components/home/player';
import MainFooter from '../components/home/footer';
import MainHeader from '../components/home/header';
import { useStore } from '../store/zustand';
import Root from './root'
import RodalLoading from '../components/loading/rodal';

export default function HomeLayout({ children, page, title }) {
    const getUserFromToken = useStore(state => state.getUserFromToken);
    const isVerifyToken = useStore(state => state.isVerifyToken);
    const [token, setToken] = useLocalStorage("token", "null")
    const [isLoading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        if (token === "null") router.push('/');
        else isVerifyToken ? setLoading(false) : getUserFromToken(token, router).finally(() => setLoading(false))
    }, [])

    if (isLoading) return <Loading />
    return (
        <Root page="home" title={title}>
            <Sidebar />
            <main id={page}>
                <MainHeader />
                <div id="main">{children}</div>
                <MainFooter />
            </main>
            <Content />
            <Player />
            <RodalLoading />
        </Root>
    )
}
