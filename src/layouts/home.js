import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from "react";

import { useContextMenu, useStore } from '../store/zustand';
import useLocalStorage from "../hooks/useLocalStorage";
import Loading from '../components/loading/home';
import Sidebar from '../components/home/sidebar';
import Content from '../components/home/content';
import Player from '../components/home/player';
import MainFooter from '../components/home/footer';
import MainHeader from '../components/home/header';
import Root from './root'
import RodalLoading from '../components/loading/rodal';
import { SongMenu } from '../components/other/menu';

export default function HomeLayout({ children, page, title }) {
    const getUserFromToken = useStore(state => state.getUserFromToken);
    const isVerifyToken = useStore(state => state.isVerifyToken);
    const [token, setToken] = useLocalStorage("token", "null")
    const [isLoading, setLoading] = useState(true)
    const router = useRouter()

    const setIsShow = useContextMenu((state) => state.setIsShow);
    const isHover = useContextMenu((state) => state.isHover);
    const isShow = useContextMenu((state) => state.isShow);

    useEffect(() => {
        if (token === "null") router.push('/');
        else isVerifyToken ? setLoading(false) : getUserFromToken(token, router).finally(() => setLoading(false))
    }, [])

    if (isLoading) return <Loading />
    return (
        <Root page="home" title={title} isHover={isHover} setIsShow={setIsShow}>
            <Sidebar />
            <main id={page} className={`${isShow ? 'non-active' : ''}`}>
                <MainHeader />
                <div id="main">{children}</div>
                <MainFooter />
            </main>
            <Content />
            <Player />
            <RodalLoading />
            {isShow && <SongMenu />}
        </Root>
    )
}
