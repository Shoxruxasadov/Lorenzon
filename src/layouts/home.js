import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from "react";

import useLocalStorage from "../hooks/useLocalStorage";
import Loading from '../components/loading/home';
import Sidebar from '../components/home/sidebar';
import Content from '../components/home/content';
import Player from '../components/home/player';
import MainFooter from '../components/home/footer';
import MainHeader from '../components/home/header';
import { useMusic, useStore } from '../store/zustand';
import Root from './root'

export default function HomeLayout({ children, page, title }) {
    const getUserFromToken = useStore(state => state.getUserFromToken);
    const [token, setToken] = useLocalStorage("token", "null")
    const [isLoading, setLoading] = useState(true)
    const router = useRouter()

    const songs = useMusic((state) => state.musics);
    const setSongs = useMusic((state) => state.setMusics);
    const isPlaying = useMusic((state) => state.playPouse);
    const setPlaying = useMusic((state) => state.setPlayPouse);
    const currentSong = useMusic((state) => state.currentMusic);
    const audioElem = useRef()

    console.log(isPlaying);
    console.log(audioElem.current);

    useEffect(() => {
        if (token === "null") {
            router.push('/')
            return
        }
        getUserFromToken(token, router).finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        if (audioElem.current) {
            if (isPlaying) {
                audioElem.current.play()
            } else {
                audioElem.current.pause();
            }
        }
    }, [isPlaying])

    if (isLoading) return <Loading />
    return (
        <Root page="home" title={title}>
            <Sidebar />
            <main id={page}>
                <MainHeader />
                {children}
                <MainFooter />
            </main>
            <Content />
            <Player />
            <audio src={currentSong.song} ref={audioElem} />
        </Root>
    )
}
