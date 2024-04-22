import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from 'next-auth/react';
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from 'next-themes'
import axios from "axios";

import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
const queryClient = new QueryClient()

import useLocalStorage from "../hooks/useLocalStorage";
import { useHomeModels, useMusic, useStore } from "../store/zustand";
import Wait from "../components/loading/wait"

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
import 'aos/dist/aos.css'; // aos animation

export default function MyApp({ Component, pageProps, }) {
    const user = useStore(state => state.user);
    const getUserFromToken = useStore(state => state.getUserFromToken);
    const [isLoading, setLoading] = useState(true)
    const [token, setToken] = useLocalStorage("token", "null")
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
    const SET_YOUR_FAVORITE_SINGERS = useHomeModels((state) => state.SET_YOUR_FAVORITE_SINGERS);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/songs/random`).then(({ data }) => SET_RECOMMENDED_SONGS(data));
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/users/singers/get/random`).then(({ data }) => SET_YOUR_FAVORITE_SINGERS(data));

        let variablePlaying = isPlaying;
        const handleSpacePress = ({ keyCode }) => {
            if (keyCode === 32 || keyCode === 179) {
                variablePlaying ? variablePlaying = false : variablePlaying = true;
                setPlaying(variablePlaying);
            }
        }

        if (token === 'null') { setLoading(false); router.push('/'); };
        if (token.id && !user._id) getUserFromToken(token, router).finally(() => setLoading(false));
        document.addEventListener("keyup", handleSpacePress);
        return () => { document.removeEventListener("keyup", handleSpacePress); };
    }, [])

    useEffect(() => {
        if (user.lastSong && user.lastSong.length > 0) {
            setCurrentMusic(user.lastSong[0]);
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
                axios.patch(`${process.env.NEXT_PUBLIC_SERVER_API}/users/song/${user._id}`, { id: song._id })
            } else {
                allSongs.map((item, index) => {
                    if (item._id == currentSong._id) {
                        if (allSongs.length == index + 1) {
                            setPlaying(false)
                        } else {
                            const song = allSongs[index + 1]
                            setCurrentMusic(song)
                            setTimeout(() => setRender(!render), 10)
                            axios.patch(`${process.env.NEXT_PUBLIC_SERVER_API}/users/song/${user._id}`, { id: song._id })
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
        <SessionProvider session={pageProps.session}>
            <ThemeProvider>
                <QueryClientProvider client={queryClient}>
                    <Component {...pageProps} />
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
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
        </SessionProvider>
    </>
}

