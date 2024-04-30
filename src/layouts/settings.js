import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

import Root from './root'
import { useStore } from '../store/zustand';
import useLocalStorage from "../hooks/useLocalStorage";
import Loading from '../components/loading/setting';
import Content from '../components/home/content';
import Player from '../components/home/player';
import MainFooter from '../components/home/footer';
import MainHeader from '../components/home/header';
import RodalLoading from '../components/loading/rodal.loading';
import SidebarSettings from '../components/settings/sidebar';

export default function HomeLayout({ children, title }) {
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
        <Root page="home" title={title} >
            <SidebarSettings />
            <main id="home-setting">
                <MainHeader />
                <div id="container-setting" className={title}>
                    {children}
                </div>
                <MainFooter />
            </main>
            <Content />
            <Player />
            <RodalLoading />
        </Root>
    )
}
