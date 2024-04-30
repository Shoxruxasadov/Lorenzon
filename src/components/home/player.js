import styled from 'styled-components';
import { useRouter } from "next/navigation";
import { useHomeDetails, useMusic, useStore } from "../../store/zustand";

import { PiQueue, PiQueueFill, PiMicrophoneStage, PiMicrophoneStageFill } from "react-icons/pi";
import { BsFullscreen, BsFullscreenExit, BsChatSquareText, BsChatSquareTextFill } from "react-icons/bs";
import axios from 'axios';

const RedingTime = styled.div`
    &::before{
        transition: width 0.2s linear;
        width: ${props => props.percentage}%!important;
    } 
    &::after{
        transition: left 0.2s linear;
        left: ${props => props.percentage}%!important;
    }`;
const VolumeControl = styled.div`
    &::before{
        transition: 0.1s;
        width: ${props => props.volume}%!important;
    } 
    &::after{
        transition: 0.1s;
        left: ${props => props.volume}%!important;
    }`;

const VolumeCount = styled.div`
    transition: 0.1s;
    left: ${props => props.volume}%!important;
    `;

export default function Player() {
    const user = useStore((state) => state.user);
    const router = useRouter()
    const render = useMusic((state) => state.render);
    const setRender = useMusic((state) => state.setRender);
    const readRender = useMusic((state) => state.readRender);
    const setReadRender = useMusic((state) => state.setReadRender);
    const songs = useMusic((state) => state.musics);
    const music = useMusic((state) => state.currentMusic);
    const setCurrentMusic = useMusic((state) => state.setCurrentMusic);

    const isPlaying = useMusic((state) => state.playPouse);
    const setPlaying = useMusic((state) => state.setPlayPouse);
    const playPouse = () => music.song && setPlaying(!isPlaying)
    const randomInteger = (max, min) => Math.floor(Math.random() * (max - min + 1)) + min;

    const isShuffle = useMusic((state) => state.shuffle);
    const setShuffle = useMusic((state) => state.setShuffle);
    const shuffle = () => {
        if (music.song) {
            setShuffle(!isShuffle)
            setLoop(false)
        }
    }

    const isLoop = useMusic((state) => state.loop);
    const setLoop = useMusic((state) => state.setLoop);
    const loop = () => {
        if (music.song) {
            setLoop(!isLoop)
            setShuffle(false)
        }
    }

    const read = useMusic((state) => state.read);
    const volume = useMusic((state) => state.volume);
    const setVolume = useMusic((state) => state.setVolume);
    const duration = useMusic((state) => state.duration);
    const percentage = useMusic((state) => state.percentage);
    const setReadTime = useMusic((state) => state.setReadTime);
    const durationTime = useMusic((state) => state.durationTime);
    const setPercentage = useMusic((state) => state.setPercentage);

    const lyrics = useHomeDetails((state) => state.lyrics);
    const setLyrics = useHomeDetails((state) => state.setLyrics);
    const comment = useHomeDetails((state) => state.comment);
    const setComment = useHomeDetails((state) => state.setComment);
    const queue = useHomeDetails((state) => state.queue);
    const setQueue = useHomeDetails((state) => state.setQueue);
    const fullScreen = useHomeDetails((state) => state.fullScreen);
    const setFullScreen = useHomeDetails((state) => state.setFullScreen);

    function setDetails(prop) {
        if (prop == "lyrics") {
            if (!music.song) return
            setLyrics(!lyrics)
            setComment(false)
            setQueue(false)
        }
        if (prop == "comment") {
            if (!music.song) return
            setComment(!comment)
            setLyrics(false)
            setQueue(false)
        }
        if (prop == "queue") {
            if (songs.length == 0) return
            setQueue(!queue)
            setLyrics(false)
            setComment(false)
        }
        if (prop == "screen") {
            setFullScreen(!fullScreen)
        }
    }

    return (
        <footer id="player" className={`${fullScreen ? 'active' : ''}`}>
            <div id="bar">
                <RedingTime id="line" percentage={percentage} />
                <input type="range" id="control" value={percentage} max={100} min={0} onChange={(e) => {
                    setPercentage(e.target.value)
                    setReadTime(e.target.value * durationTime / 100)
                }} aria-label="Range" aria-labelledby="bar" />
            </div>
            <div className="content">
                <div className="song">
                    <img src={music.image || "/logo.png"} alt="music" onClick={() => music.album && router.push(`/album/${music.album}`)} />
                    <div className="title">
                        {music.album ? <h3 onClick={() => router.push(`/album/${music.album}`)}>{music.name}</h3> : <h3>Lorenzon</h3>}
                        <p>{music.singerName && music.singerName.map((n, i) => <span key={i} onClick={() => router.push(`/@${music.singerUsername[i]}`)}>{music.singerName.length == i + 1 ? n : n + ', '}</span>)}</p>
                    </div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 26 25"
                        fill="none"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.82371 9.123C3.22571 13.485 8.76471 17.012 10.2367 17.885C11.7137 17.003 17.2927 13.437 18.6497 9.127C19.5407 6.341 18.7137 2.812 15.4277 1.753C13.8357 1.242 11.9787 1.553 10.6967 2.545C10.4287 2.751 10.0567 2.755 9.78671 2.551C8.42871 1.53 6.65471 1.231 5.03771 1.753C1.75671 2.811 0.932712 6.34 1.82371 9.123ZM10.2377 19.501C10.1137 19.501 9.99071 19.471 9.87871 19.41C9.56571 19.239 2.19271 15.175 0.395713 9.581C0.394712 9.581 0.394712 9.58 0.394712 9.58C-0.733288 6.058 0.522713 1.632 4.57771 0.324996C6.48171 -0.291004 8.55671 -0.020004 10.2347 1.039C11.8607 0.010996 14.0207 -0.273004 15.8867 0.324996C19.9457 1.634 21.2057 6.059 20.0787 9.58C18.3397 15.11 10.9127 19.235 10.5977 19.408C10.4857 19.47 10.3617 19.501 10.2377 19.501Z"
                            fill='var(--text-color)'
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M16.1537 7.6249C15.7667 7.6249 15.4387 7.3279 15.4067 6.9359C15.3407 6.1139 14.7907 5.4199 14.0077 5.1669C13.6127 5.0389 13.3967 4.6159 13.5237 4.2229C13.6527 3.8289 14.0717 3.6149 14.4677 3.7389C15.8307 4.1799 16.7857 5.3869 16.9027 6.8139C16.9357 7.2269 16.6287 7.5889 16.2157 7.6219C16.1947 7.6239 16.1747 7.6249 16.1537 7.6249Z"
                            fill='var(--text-color)'
                        />
                    </svg>
                </div>
                <div className="controller">
                    <div className={`shuffle ${isShuffle ? "active" : ""} `} onClick={shuffle} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path opacity="0.4" d="M21.75 17.98C21.75 17.96 21.74 17.94 21.74 17.92C21.73 17.84 21.72 17.76 21.69 17.69C21.65 17.6 21.6 17.53 21.54 17.46C21.54 17.46 21.54 17.45 21.53 17.45C21.46 17.38 21.38 17.3299 21.29 17.2899C21.2 17.2499 21.1 17.23 21 17.23L16.33 17.25C16.33 17.25 16.33 17.25 16.32 17.25C15.72 17.25 15.14 16.97 14.78 16.49L13.56 14.92C13.31 14.59 12.84 14.5299 12.51 14.7899C12.18 15.0499 12.12 15.51 12.38 15.84L13.6 17.4099C14.25 18.2499 15.27 18.75 16.33 18.75H16.34L19.19 18.74L18.48 19.45C18.19 19.74 18.19 20.22 18.48 20.51C18.63 20.66 18.82 20.73 19.01 20.73C19.2 20.73 19.39 20.66 19.54 20.51L21.54 18.51C21.61 18.44 21.66 18.36 21.7 18.27C21.73 18.17 21.75 18.07 21.75 17.98Z" fill='var(--text-color)' />
                            <path opacity="0.4" d="M8.42001 6.69C7.77001 5.79 6.73 5.26001 5.62 5.26001C5.61 5.26001 5.61001 5.26001 5.60001 5.26001L2.98999 5.27002C2.57999 5.27002 2.23999 5.61002 2.23999 6.02002C2.23999 6.43002 2.57999 6.77002 2.98999 6.77002L5.60001 6.76001H5.60999C6.23999 6.76001 6.83 7.06001 7.19 7.57001L8.26999 9.07001C8.41999 9.27001 8.65 9.38 8.88 9.38C9.03 9.38 9.19001 9.32999 9.32001 9.23999C9.66001 8.99999 9.72999 8.53 9.48999 8.19L8.42001 6.69Z" fill='var(--text-color)' />
                            <path d="M21.74 6.07999C21.74 6.05999 21.75 6.04 21.75 6.03C21.75 5.93 21.73 5.82996 21.69 5.73996C21.65 5.64996 21.6 5.56997 21.53 5.49997L19.53 3.49997C19.24 3.20997 18.76 3.20997 18.47 3.49997C18.18 3.78997 18.18 4.26997 18.47 4.55997L19.18 5.26999L16.45 5.25998C16.44 5.25998 16.44 5.25998 16.43 5.25998C15.28 5.25998 14.2 5.82996 13.56 6.79996L7.17001 16.38C6.81001 16.92 6.19999 17.25 5.54999 17.25H5.54001L2.98999 17.24C2.57999 17.24 2.23999 17.57 2.23999 17.99C2.23999 18.4 2.56999 18.74 2.98999 18.74L5.54001 18.75C5.55001 18.75 5.55 18.75 5.56 18.75C6.72 18.75 7.78999 18.18 8.42999 17.21L14.82 7.62998C15.18 7.08998 15.79 6.75998 16.44 6.75998H16.45L21 6.78C21.1 6.78 21.19 6.75994 21.29 6.71994C21.38 6.67994 21.46 6.62997 21.53 6.55997C21.53 6.55997 21.53 6.54996 21.54 6.54996C21.6 6.47996 21.66 6.40998 21.69 6.31998C21.72 6.23998 21.73 6.15999 21.74 6.07999Z" fill='var(--text-color)' />
                        </svg>
                    </div>
                    <div className="prev" onClick={() => {
                        if (isShuffle) {
                            setReadTime(0)
                            setPlaying(true)
                            const randomSong = songs[randomInteger(0, songs.length - 1)]
                            setCurrentMusic(randomSong)
                            setTimeout(() => {
                                setReadRender(!readRender)
                                setRender(!render)
                            }, 10)
                            axios.patch(`${process.env.NEXT_PUBLIC_SERVER_API} /users/song / ${user._id} `, { id: randomSong._id })
                        } else {
                            songs.map((item, index) => {
                                if (item._id == music._id) {
                                    setReadTime(0)
                                    setPlaying(true)
                                    if (!((index == 0) || (+read.substring(0, 1) != 0) || (+read.substring(2) > 5.99))) {
                                        const prevSong = songs[index - 1]
                                        setCurrentMusic(prevSong)
                                        axios.patch(`${process.env.NEXT_PUBLIC_SERVER_API} /users/song / ${user._id} `, { id: prevSong._id })
                                    }
                                    setTimeout(() => {
                                        setReadRender(!readRender)
                                        setRender(!render)
                                    }, 10)
                                }
                            })
                        }
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path opacity="0.4" d="M22 8.33998V15.66C22 17.16 20.37 18.1 19.07 17.35L15.9 15.52L12.73 13.69L12.24 13.41V10.59L12.73 10.31L15.9 8.48L19.07 6.64998C20.37 5.89998 22 6.83998 22 8.33998Z" fill='var(--text-color)' />
                            <path d="M12.24 8.33998V15.66C12.24 17.16 10.61 18.1 9.32001 17.35L6.14002 15.52L2.97 13.69C1.68 12.94 1.68 11.06 2.97 10.31L6.14002 8.48L9.32001 6.64998C10.61 5.89998 12.24 6.83998 12.24 8.33998Z" fill='var(--text-color)' />
                        </svg>
                    </div>
                    <div className="play" onClick={playPouse} >
                        {music.song && isPlaying ? <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                            <circle cx="24" cy="24" r="24" fill="url(#paint0_linear_336_264)" />
                            <rect x="15" y="15" width="7.65" height="18" rx="2" fill="#080B0F" />
                            <rect x="25.35" y="15" width="7.65" height="18" rx="2" fill="#080B0F" />
                            <defs>
                                <linearGradient id="paint0_linear_336_264" x1="42" y1="7" x2="-47" y2="95" gradientUnits="userSpaceOnUse">
                                    <stop stopColor='var(--pause-color)' />
                                    <stop offset="1" stopColor='var(--pause-color)' stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                            <circle cx="24" cy="24" r="24" fill="url(#paint0_linear_343_249)" />
                            <path d="M33 22.2679C34.3333 23.0377 34.3333 24.9623 33 25.7321L21 32.6603C19.6667 33.4301 18 32.4678 18 30.9282L18 17.0718C18 15.5322 19.6667 14.5699 21 15.3397L33 22.2679Z" fill="#080B0F" />
                            <defs>
                                <linearGradient id="paint0_linear_343_249" x1="42" y1="7" x2="-47" y2="95" gradientUnits="userSpaceOnUse">
                                    <stop stopColor='var(--pause-color)' />
                                    <stop offset="1" stopColor='var(--pause-color)' stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>}
                    </div>
                    <div className="next" onClick={() => {
                        if (isShuffle) {
                            setReadTime(0)
                            setPlaying(true)
                            const randomSong = songs[randomInteger(0, songs.length - 1)]
                            setCurrentMusic(randomSong)
                            setTimeout(() => {
                                setReadRender(!readRender)
                                setRender(!render)
                            }, 10)
                            axios.patch(`${process.env.NEXT_PUBLIC_SERVER_API} /users/song / ${user._id} `, { id: randomSong._id })
                        } else {
                            songs.map((item, index) => {
                                if (item._id == music._id) {
                                    if (songs.length != index + 1) {
                                        setReadTime(0)
                                        setPlaying(true)
                                        const nextSong = songs[index + 1]
                                        setCurrentMusic(nextSong)
                                        setTimeout(() => {
                                            setReadRender(!readRender)
                                            setRender(!render)
                                        }, 10)
                                        axios.patch(`${process.env.NEXT_PUBLIC_SERVER_API} /users/song / ${user._id} `, { id: nextSong._id })
                                    }
                                }
                            })
                        }
                    }
                    }>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path opacity="0.4" d="M2 8.33998V15.66C2 17.16 3.62999 18.1 4.92999 17.35L8.10001 15.52L11.27 13.69L11.76 13.41V10.59L11.27 10.31L8.10001 8.48L4.92999 6.64998C3.62999 5.89998 2 6.83998 2 8.33998Z" fill='var(--text-color)' />
                            <path d="M11.76 8.33998V15.66C11.76 17.16 13.39 18.1 14.68 17.35L17.86 15.52L21.03 13.69C22.32 12.94 22.32 11.06 21.03 10.31L17.86 8.48L14.68 6.64998C13.39 5.89998 11.76 6.83998 11.76 8.33998Z" fill='var(--text-color)' />
                        </svg>
                    </div>
                    <div className={`loop ${isLoop ? "active" : ""} `} onClick={loop} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M3.91 17.18C3.72 17.18 3.53 17.11 3.38 16.96C2.01 15.58 1.25 13.76 1.25 11.83C1.25 7.81999 4.5 4.55999 8.5 4.55999L14.57 4.57999L13.48 3.53999C13.18 3.24999 13.17 2.77999 13.46 2.47999C13.75 2.17999 14.22 2.16999 14.52 2.45999L16.96 4.79999C17.18 5.00999 17.25 5.33999 17.14 5.61999C17.03 5.89999 16.75 6.08999 16.44 6.08999L8.5 6.06999C5.33 6.06999 2.75 8.65999 2.75 11.84C2.75 13.37 3.35 14.82 4.44 15.91C4.73 16.2 4.73 16.68 4.44 16.97C4.29 17.11 4.1 17.18 3.91 17.18Z" fill='var(--text-color)' />
                            <path d="M10 21.75C9.81 21.75 9.63 21.68 9.48 21.54L7.04 19.2C6.82 18.99 6.75 18.66 6.86 18.38C6.98 18.1 7.26 17.95 7.56 17.91L15.51 17.93C18.68 17.93 21.26 15.34 21.26 12.16C21.26 10.63 20.66 9.18 19.57 8.09C19.28 7.8 19.28 7.32 19.57 7.03C19.86 6.74 20.34 6.74 20.63 7.03C22 8.41 22.76 10.23 22.76 12.16C22.76 16.17 19.51 19.43 15.51 19.43L9.44 19.41L10.53 20.45C10.83 20.74 10.84 21.21 10.55 21.51C10.39 21.67 10.2 21.75 10 21.75Z" fill='var(--text-color)' />
                        </svg>
                    </div>
                </div>
                <div className="volume">
                    <div className="time">
                        <p>{read} / {duration}</p>
                    </div>
                    <div className="sound">
                        <div className="icon" onClick={() => volume != 0 ? setVolume(0) : setVolume(99)}>
                            {volume == 0 ? <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 26 24" fill="none">
                                <path d="M19.4886 3C20.6284 4.1819 21.5325 5.58501 22.1493 7.12924C22.7661 8.67346 23.0836 10.3285 23.0836 12C23.0836 13.6715 22.7661 15.3265 22.1493 16.8708C21.5325 18.415 20.6284 19.8181 19.4886 21" stroke='var(--svg-sc)' strokeWidth="1.8" strokeLinecap="round" />
                                <path d="M17.4343 6.6C18.0856 7.30914 18.6022 8.15101 18.9547 9.07754C19.3072 10.0041 19.4886 10.9971 19.4886 12C19.4886 13.0029 19.3072 13.9959 18.9547 14.9225C18.6022 15.849 18.0856 16.6909 17.4343 17.4" stroke='var(--svg-sc)' strokeWidth="1.8" strokeLinecap="round" />
                                <path d="M7.67645 6L11.9132 2.46448C13.0853 1.48632 14.8665 2.31981 14.8665 3.84649V20.1535C14.8665 21.6802 13.0853 22.5137 11.9132 21.5355L7.67645 18V6Z" fill='var(--svg-sc)' />
                                <path d="M1.98412 8.4C1.98412 7.07452 3.05863 6 4.38412 6H8.87292V18H4.38411C3.05863 18 1.98412 16.9255 1.98412 15.6V8.4Z" fill='var(--svg-sc)' />
                                <rect x="-0.845462" y="0.0739684" width="2.98801" height="31.0243" rx="1.49401" transform="matrix(0.642935 -0.76592 0.766168 0.64264 0.641443 2.14888)" fill='var(--svg-mc)' stroke='var(--svg-mbc)' strokeWidth="1.2" strokeLinecap="round" />
                            </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M18.787 3C19.9452 4.1819 20.8639 5.58501 21.4907 7.12924C22.1175 8.67346 22.4401 10.3285 22.4401 12C22.4401 13.6715 22.1175 15.3265 21.4907 16.8708C20.8639 18.415 19.9452 19.8181 18.787 21" stroke={volume == 100 ? 'var(--text-color)' : volume > 70 ? 'var(--svg-mc)' : 'var(--slow-color)'} strokeWidth="1.8" strokeLinecap="round" />
                                <path d="M16.6996 6.6C17.3614 7.30914 17.8864 8.15101 18.2445 9.07754C18.6027 10.0041 18.787 10.9971 18.787 12C18.787 13.0029 18.6027 13.9959 18.2445 14.9225C17.8864 15.849 17.3614 16.6909 16.6996 17.4" stroke={volume == 100 ? 'var(--text-color)' : volume > 30 ? 'var(--svg-mc)' : 'var(--slow-color)'} strokeWidth="1.8" strokeLinecap="round" />
                                <path d="M6.7842 6L11.1479 2.41638C12.3226 1.45167 14.0903 2.28735 14.0903 3.80742V20.1926C14.0903 21.7126 12.3226 22.5483 11.1479 21.5836L6.7842 18V6Z" fill={volume == 100 ? 'var(--text-color)' : 'var(--svg-mc)'} />
                                <path d="M1 8.4C1 7.07452 2.07452 6 3.4 6H8V18H3.4C2.07452 18 1 16.9255 1 15.6V8.4Z" fill={volume == 100 ? 'var(--text-color)' : 'var(--svg-mc)'} />
                            </svg>}
                        </div>
                        <div id="barVolume">
                            <VolumeCount id="valueCount" volume={volume}>{volume}</VolumeCount>
                            <VolumeControl id="lineVolume" volume={volume} />
                            <input type="range" id="controlVolume" value={volume} max={100} min={0} onChange={(e) => setVolume(e.target.value)} aria-label="Sound volume" aria-labelledby="barVolume" />
                        </div>
                    </div>
                    <div className="details">
                        <div className="lyrics" onClick={() => setDetails('lyrics')}>
                            {lyrics ? <PiMicrophoneStageFill /> : <PiMicrophoneStage />}
                        </div>
                        <div className='comment' onClick={() => setDetails('comment')}>
                            {comment ? <BsChatSquareTextFill /> : <BsChatSquareText />}
                        </div>
                        <div className='queue' onClick={() => setDetails('queue')}>
                            {queue ? <PiQueueFill /> : <PiQueue />}
                        </div>
                        <div className='screen' onClick={() => setDetails('screen')}>
                            {fullScreen ? <BsFullscreenExit /> : <BsFullscreen />}
                        </div>
                    </div>
                </div>
            </div>
        </footer >
    )
}
