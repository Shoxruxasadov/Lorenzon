import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from 'next-auth/react';
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from 'next-themes'
import axios from "axios";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
const queryClient = new QueryClient()

import { useHomeModels, useMusic, useStore } from "../store/zustand";
import useLocalStorage from "../hooks/useLocalStorage";
import Wait from "../components/loading/wait"

import "../styles/global.scss" // global
import "../styles/assets/mobile.scss"; // mobile
import "../styles/assets/error.scss"; // error
import "../styles/assets/menu.scss"; // menu
import "../styles/landing/landing.scss"; // landing
import "../styles/loading/wait.scss"; // wait
import "../styles/admin/admin.scss"; // admin
import "../styles/home/home.scss" // home
import "../styles/auth/signup.scss"; // signup
import "../styles/auth/account.scss"; // account
import "../styles/auth/login.scss"; // login

import 'aos/dist/aos.css'; // aos 
import 'rodal/lib/rodal.css'; // rodal
import 'react-date-range/dist/styles.css'; // calendar main style file
import 'react-date-range/dist/theme/default.css'; // calendar theme css file

export default function MyApp({ Component, pageProps, }) {
    const user = useStore(state => state.user);
    const getUserFromToken = useStore(state => state.getUserFromToken);
    const [isLoading, setLoading] = useState(true)
    const [token, setToken] = useLocalStorage("token", "null")
    const pathname = usePathname()
    const router = useRouter()

    const allSongs = useMusic((state) => state.musics);
    const setAllSongs = useMusic((state) => state.setMusics);
    const isPlaying = useMusic((state) => state.playPouse);
    const setPlaying = useMusic((state) => state.setPlayPouse);
    const isShuffle = useMusic((state) => state.shuffle);
    const isLoop = useMusic((state) => state.loop);
    const volume = useMusic((state) => state.volume);
    const currentSong = useMusic((state) => state.currentMusic);
    const setCurrentMusic = useMusic((state) => state.setCurrentMusic);
    const audioElem = useRef()

    const render = useMusic((state) => state.render);
    const setRender = useMusic((state) => state.setRender);
    const readRender = useMusic((state) => state.readRender);
    const setRead = useMusic((state) => state.setRead);
    const readTime = useMusic((state) => state.readTime);
    const setReadTime = useMusic((state) => state.setReadTime);
    const setDuration = useMusic((state) => state.setDuration);
    const setDurationSec = useMusic((state) => state.setDurationTime);
    const setPercentage = useMusic((state) => state.setPercentage);
    const randomInteger = (max, min) => Math.floor(Math.random() * (max - min + 1)) + min;

    const SET_RECOMMENDED_SONGS = useHomeModels((state) => state.SET_RECOMMENDED_SONGS);
    const SET_FAVORITE_SINGERS = useHomeModels((state) => state.SET_FAVORITE_SINGERS);
    const SET_RECOMMENDED_ALBUMS = useHomeModels((state) => state.SET_RECOMMENDED_ALBUMS);
    const SET_RECOMMENDED_PLAYLISTS = useHomeModels((state) => state.SET_RECOMMENDED_PLAYLISTS);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/random`, { headers: { 'secret': process.env.NEXT_PUBLIC_SECRET } }).then(({ data }) => {
            SET_RECOMMENDED_SONGS(data.songs)
            SET_FAVORITE_SINGERS(data.singers)
            SET_RECOMMENDED_ALBUMS(data.albums)
            SET_RECOMMENDED_PLAYLISTS(data.playlists)
        });

        // console.log(user.premium);
        // if(user.premium != 'vip' && user.premium){
        // }

        let variablePlaying = isPlaying;
        const handleSpacePress = ({ keyCode }) => {
            if (keyCode === 32 || keyCode === 179) {
                variablePlaying ? variablePlaying = false : variablePlaying = true;
                setPlaying(variablePlaying);
            }
        }

        if (pathname == '/') {
            document.querySelector('body').classList.add('scrolling')
        } else {
            document.querySelector('body').classList.remove('scrolling')
        }

        if (token === 'null') { setLoading(false); router.push((pathname == '/login' || pathname == '/signup' || pathname == '/account') ? pathname : '/'); };
        if (token.id && !user._id) getUserFromToken(token, router).finally(() => setLoading(false));
        document.addEventListener("keyup", handleSpacePress);
        window.addEventListener("contextmenu", (e) => e.preventDefault())
        return () => {
            document.removeEventListener("keyup", handleSpacePress);
            window.removeEventListener("contextmenu", (e) => e.preventDefault())
        };
    }, [])

    useEffect(() => {
        if (user.lastSong) {
            setCurrentMusic(user.lastSong);
            setAllSongs(user.recently);
        }
    }, [user])

    useEffect(() => {
        if (!audioElem.current || !currentSong.song) return
        isPlaying ? audioElem.current.play() : audioElem.current.pause();
    }, [isPlaying, render])

    useEffect(() => {
        if (!audioElem.current || !currentSong.song) return
        audioElem.current.currentTime = readTime;

        const handleSpacePress = ({ keyCode }) => {
            if (keyCode === 37) {
                if (!audioElem.current || !currentSong.song) return
                audioElem.current.currentTime = audioElem.current.currentTime - 2;
            }
            if (keyCode === 39) {
                if (!audioElem.current || !currentSong.song) return
                audioElem.current.currentTime = audioElem.current.currentTime + 2;
            }
        }

        document.addEventListener("keyup", handleSpacePress);
        return () => { document.removeEventListener("keyup", handleSpacePress); };
    }, [readTime, readRender])

    useEffect(() => {
        if (!audioElem.current || !currentSong.song) return
        audioElem.current.volume = volume / 100;
    }, [volume])

    const getRead = (e) => {
        const percent = ((e.currentTarget.currentTime / e.currentTarget.duration) * 100)
        const time = Math.floor(e.currentTarget.currentTime)
        let seconds = time % 60;
        const foo = time - seconds;
        const minutes = foo / 60;
        if (seconds < 10) seconds = "0" + seconds.toString();
        setRead(`${minutes}:${seconds}`)
        setPercentage(+percent)

        if (!isLoop && e.currentTarget.currentTime == e.currentTarget.duration) {
            if (isShuffle) {
                setReadTime(0)
                setPlaying(true)
                const song = allSongs[randomInteger(0, allSongs.length - 1)]
                setCurrentMusic(song)
                setTimeout(() => setRender(!render), 10)
                axios.patch(`${process.env.NEXT_PUBLIC_SERVER_API}/users/song/${user._id}`, { id: song._id }, { headers: { 'secret': process.env.NEXT_PUBLIC_SECRET } })
            } else {
                allSongs.map((item, index) => {
                    if (item._id == currentSong._id) {
                        if (allSongs.length == index + 1) {
                            setPlaying(false)
                        } else {
                            const song = allSongs[index + 1]
                            setCurrentMusic(song)
                            setTimeout(() => setRender(!render), 10)
                            axios.patch(`${process.env.NEXT_PUBLIC_SERVER_API}/users/song/${user._id}`, { id: song._id }, { headers: { 'secret': process.env.NEXT_PUBLIC_SECRET } })
                        }
                        setReadTime(0)
                    }
                })
            }
        }
    }

    const getDuration = (e) => {
        const time = Math.floor(e.currentTarget.duration)
        const minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        if (seconds < 10) seconds = "0" + seconds.toString();
        setDuration(`${minutes}:${seconds}`)
        setDurationSec(time)
    }

    if (isLoading) return <Wait />
    return <>
        <ThemeProvider>
            <SessionProvider session={pageProps.session}>
                <QueryClientProvider client={queryClient}>
                    <Component {...pageProps} />
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </SessionProvider>
        </ThemeProvider>

        <ToastContainer />
        <SpeedInsights />
        <Analytics />
        <audio
            src={currentSong.song}
            ref={audioElem}
            loop={isLoop}
            onTimeUpdate={getRead}
            onLoadedData={getDuration}
        />
    </>
}

