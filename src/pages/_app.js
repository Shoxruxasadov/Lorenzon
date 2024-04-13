import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from 'next-auth/react';
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"
import { createGlobalStyle } from 'styled-components'
import { ThemeProvider } from 'next-themes' // https://github.com/pacocoursey/next-themes

import useLocalStorage from "../hooks/useLocalStorage";
import { useMusic, useStore } from "../store/zustand";

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
    const getUserFromToken = useStore(state => state.getUserFromToken);
    const [token, setToken] = useLocalStorage("token", "null")
    const router = useRouter()

    const allSongs = useMusic((state) => state.musics);
    const isPlaying = useMusic((state) => state.playPouse);
    const setPlaying = useMusic((state) => state.setPlayPouse);
    const isLoop = useMusic((state) => state.loop);
    const volume = useMusic((state) => state.volume);
    const currentSong = useMusic((state) => state.currentMusic);
    const setCurrentMusic = useMusic((state) => state.setCurrentMusic);
    const audioElem = useRef()

    const render = useMusic((state) => state.render);
    const setRender = useMusic((state) => state.setRender);
    const setRead = useMusic((state) => state.setRead);
    const readTime = useMusic((state) => state.readTime);
    const setDuration = useMusic((state) => state.setDuration);
    const setDurationSec = useMusic((state) => state.setDurationTime);
    const setPercentage = useMusic((state) => state.setPercentage);

    useEffect(() => {
        if (token === "null") { return }
        getUserFromToken(token, router)

        let variablePlaying = !isPlaying
        const handleSpacePress = ({ keyCode }) => {
            if (keyCode === 32) {
                variablePlaying ? variablePlaying = false : variablePlaying = true
                setPlaying(variablePlaying)
            }
        }
        document.addEventListener("keyup", handleSpacePress);
        return () => { document.removeEventListener("keyup", handleSpacePress); };
    }, [])

    useEffect(() => {
        if (!audioElem.current || !currentSong.song) return
        isPlaying ? audioElem.current.play() : audioElem.current.pause()
    }, [isPlaying, render])

    useEffect(() => {
        if (!audioElem.current || !currentSong.song) return
        audioElem.current.currentTime = readTime;
    }, [readTime])

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
            allSongs.map((item, index) => {
                if (item._id == currentSong._id) {
                    if (allSongs.length == index + 1) {
                        setPlaying(false)
                    } else {
                        setCurrentMusic(allSongs[index + 1])
                        setTimeout(() => {
                            setRender(!render)
                        }, 10)
                    }
                }
            })
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

    const GlobalStyle = createGlobalStyle`
      :root {
        --fg: #000;
        --bg: #fff;
      }

      [data-theme="dark"] {
        --fg: #fff;
        --bg: #000;
      }
    `

    return <>
        <SessionProvider session={pageProps.session}>
            <GlobalStyle />
            <ThemeProvider>
                <Component {...pageProps} />
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

