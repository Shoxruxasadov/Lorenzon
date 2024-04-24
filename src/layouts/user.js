import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image'
import axios from 'axios';

import { useMusic, useStore } from '../store/zustand';
import useLocalStorage from '../hooks/useLocalStorage'
import GetAudioDuration from '../hooks/useDuration';
import HomeLayout from './home'
import Banner from './banner'

export default function UserLayout({ user }) {
    const myuser = useStore((state) => state.user);
    const render = useMusic((state) => state.render);
    const setRender = useMusic((state) => state.setRender);
    const setReadTime = useMusic((state) => state.setReadTime);
    const playPouse = useMusic((state) => state.playPouse);
    const setPlayPouse = useMusic((state) => state.setPlayPouse);
    const queue = useMusic(state => state.musics)
    const setQueue = useMusic((state) => state.setMusics);
    const currentSong = useMusic((state) => state.currentMusic);
    const setCurrentSong = useMusic((state) => state.setCurrentMusic);
    const [loadedImage, setLoadedImage] = useState(false);

    function arraysEqual(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; ++i) { if (a[i]._id !== b[i]._id) return false; }
        return true;
    }

    return (
        <HomeLayout page="home-user" title={user.name}>
            {(user.banner || user._id == myuser._id) && <Banner src={user.banner || "empty"} />}
            <div className={`profile ${(user.banner || user._id == myuser._id) ? "active" : ""}`}>
                <Image
                    src={user.image || "/other/unknown.user.webp"}
                    alt="user"
                    width={155}
                    height={155}
                    placeholder="blur"
                    blurDataURL="/other/unknown.user.blur.webp"
                    className={loadedImage ? 'user-image unblur' : 'user-image'}
                    onLoadingComplete={() => setLoadedImage(true)}
                />
                <div className="content">
                    <h1 className="name">{user.name}</h1>
                    <p className="username">
                        <span>@{user.username}</span>
                        {user.status === "premium" &&
                            <div className="verify">
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M9.53359 0.416756C9.79923 0.179395 10.2008 0.179395 10.4664 0.416756L12.8406 2.53818C12.9588 2.64382 13.1094 2.7062 13.2677 2.7151L16.4466 2.89382C16.8023 2.91382 17.0862 3.19775 17.1062 3.55342L17.2849 6.7323C17.2938 6.8906 17.3562 7.04118 17.4618 7.15941L19.5832 9.53359C19.8206 9.79923 19.8206 10.2008 19.5832 10.4664L17.4618 12.8406C17.3562 12.9588 17.2938 13.1094 17.2849 13.2677L17.1062 16.4466C17.0862 16.8023 16.8023 17.0862 16.4466 17.1062L13.2677 17.2849C13.1094 17.2938 12.9588 17.3562 12.8406 17.4618L10.4664 19.5832C10.2008 19.8206 9.79923 19.8206 9.53359 19.5832L7.15941 17.4618C7.04118 17.3562 6.8906 17.2938 6.7323 17.2849L3.55342 17.1062C3.19775 17.0862 2.91382 16.8023 2.89382 16.4466L2.7151 13.2677C2.7062 13.1094 2.64382 12.9588 2.53818 12.8406L0.416756 10.4664C0.179395 10.2008 0.179395 9.79923 0.416756 9.53359L2.53818 7.15941C2.64382 7.04118 2.7062 6.8906 2.7151 6.7323L2.89382 3.55342C2.91382 3.19775 3.19775 2.91382 3.55342 2.89382L6.7323 2.7151C6.8906 2.7062 7.04118 2.64382 7.15941 2.53818L9.53359 0.416756Z" fill="#6940ee"></path>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="7.5" height="10" viewBox="0 0 10 10" fill="none">
                                    <path d="M2.08334 5.41666L3.75001 7.08332L7.91668 2.91666" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            </div>
                        }
                    </p>
                </div>
            </div>
            {user.role == "singer" && <div className="panel">
                <button className="play" onClick={() => {
                    if (arraysEqual(queue, user.songs)) {
                        if (playPouse) {
                            setPlayPouse(false)
                        } else {
                            setPlayPouse(true)
                            setTimeout(() => setRender(!render), 10)
                        }
                    } else {
                        setQueue(user.songs);
                        setCurrentSong(user.songs[0])
                        setReadTime(0)
                        setPlayPouse(true)
                        setTimeout(() => setRender(!render), 10)
                        axios.patch(`${process.env.NEXT_PUBLIC_SERVER_API}/users/song/${user._id}`, { id: user.songs[0]._id })
                    }
                }}>
                    {arraysEqual(queue, user.songs) && playPouse ? <svg
                        className={`pouse ${playPouse ? "active" : ""}`}
                        xmlns="http://www.w3.org/2000/svg"
                        width={55}
                        height={55}
                        viewBox="0 0 100 100"
                        fill="none"
                    >
                        <circle cx="50" cy="50" r="50" fill="#6940EE" />
                        <rect
                            x="30"
                            y="30"
                            width="15"
                            height="40"
                            rx="5"
                            fill="#0D1219"
                        />
                        <rect
                            x="55"
                            y="30"
                            width="15"
                            height="40"
                            rx="5"
                            fill="#0D1219"
                        />
                    </svg> : <svg
                        className="play"
                        xmlns="http://www.w3.org/2000/svg"
                        width={55}
                        height={55}
                        viewBox="0 0 100 100"
                        fill="none"
                    >
                        <circle cx="50" cy="50" r="50" fill="#6940EE" />
                        <path
                            d="M68.5 46.1699C71.8333 48.0944 71.8333 52.9056 68.5 54.8301L42.25 69.9856C38.9167 71.9101 34.75 69.5044 34.75 65.6554L34.75 35.3446C34.75 31.4956 38.9167 29.0899 42.25 31.0144L68.5 46.1699Z"
                            fill="#0D1219"
                        />
                    </svg>}
                </button>
            </div>}
            {user.role == "singer" ? <div className="popular">
                <p className='title'>Songs</p>
                <ul className='list'>
                    {user.songs.map((item, index) => (
                        <li
                            key={item._id}
                            className={`${currentSong.song == item.song && playPouse ? "active" : ""} ${currentSong.song == item.song ? "selected" : ""}`}
                            onClick={() => {
                                if (playPouse && (currentSong.song == item.song)) {
                                    setPlayPouse(false)
                                } else {
                                    setQueue(user.songs);
                                    setCurrentSong(item)
                                    if (currentSong.song != item.song) setReadTime(0)
                                    setPlayPouse(true)
                                    setTimeout(() => setRender(!render), 10)
                                    axios.patch(`${process.env.NEXT_PUBLIC_SERVER_API}/users/song/${myuser._id}`, { id: item._id })
                                }
                            }}>
                            <div className='index'>
                                <span className='in'>{index + 1}</span>
                                <div className="icon">{
                                    playPouse && (currentSong.song == item.song) ? <svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none">
                                        <rect width="4.5" height="12" rx="1.6" fill="#D9D9D9" />
                                        <rect x="6" width="4.5" height="12" rx="1.6" fill="#D9D9D9" />
                                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14" viewBox="0 0 11 14" fill="none">
                                        <path d="M9.41769 5.32274C10.6318 6.11134 10.6318 7.88866 9.4177 8.67726L3.08941 12.7876C1.75887 13.6518 0 12.6969 0 11.1103V2.88965C0 1.30308 1.75887 0.348189 3.08941 1.2124L9.41769 5.32274Z" fill="#D9D9D9" />
                                    </svg>
                                }</div>
                                <div className="wave">
                                    <div className="wavel"></div>
                                    <div className="wavel"></div>
                                    <div className="wavel"></div>
                                    <div className="wavel"></div>
                                    <div className="wavel"></div>
                                </div>
                            </div>
                            <div className='another'>
                                <div className='music'>
                                    <div className='image'><img src={item.image} alt={item.name} /></div>
                                    <div className="music-title">
                                        <h3>{item.name}</h3>
                                        <p>{item.singerName.map((n, i) => item.singerName.length == i + 1 ? n : n + ', ')}</p>
                                    </div>
                                </div>
                                <div className='listen'><p>{item.listenCount.toString().split('').map((c, i) => i % 3 == 1 ? `${c} ` : c)}</p></div>
                                <div className='duration'><p><GetAudioDuration audioUrl={item.song} /></p></div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div> : <div className="popular">
                <p className='title'>Listened last 50 songs </p>
                <ul className='list'>
                    {user._id == myuser._id ? myuser.recently.slice(0, 5).map((item, index) => (
                        <li
                            key={item._id}
                            className={`${currentSong.song == item.song && playPouse ? "active" : ""} ${currentSong.song == item.song ? "selected" : ""}`}
                            onClick={() => {
                                if (playPouse && (currentSong.song == item.song)) {
                                    setPlayPouse(false)
                                } else {
                                    setQueue(user.recently);
                                    setCurrentSong(item)
                                    if (currentSong.song != item.song) setReadTime(0)
                                    setPlayPouse(true)
                                    setTimeout(() => setRender(!render), 10)
                                }
                            }}>
                            <div className='index'>
                                <span className='in'>{index + 1}</span>
                                <div className="icon">{
                                    playPouse && (currentSong.song == item.song) ? <svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none">
                                        <rect width="4.5" height="12" rx="1.6" fill="#D9D9D9" />
                                        <rect x="6" width="4.5" height="12" rx="1.6" fill="#D9D9D9" />
                                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14" viewBox="0 0 11 14" fill="none">
                                        <path d="M9.41769 5.32274C10.6318 6.11134 10.6318 7.88866 9.4177 8.67726L3.08941 12.7876C1.75887 13.6518 0 12.6969 0 11.1103V2.88965C0 1.30308 1.75887 0.348189 3.08941 1.2124L9.41769 5.32274Z" fill="#D9D9D9" />
                                    </svg>
                                }</div>
                                <div className="wave">
                                    <div className="wavel"></div>
                                    <div className="wavel"></div>
                                    <div className="wavel"></div>
                                    <div className="wavel"></div>
                                    <div className="wavel"></div>
                                </div>
                            </div>
                            <div className='another'>
                                <div className='music'>
                                    <div className='image'><img src={item.image} alt={item.name} /></div>
                                    <div className="music-title">
                                        <h3>{item.name}</h3>
                                        <p>{item.singerName.map(n => n + ', ')}</p>
                                    </div>
                                </div>
                                <div className='listen'><p>{item.listenCount}</p></div>
                                <div className='duration'><p><GetAudioDuration audioUrl={item.song} /></p></div>
                            </div>
                        </li>
                    )) : user.recently.slice(0, 5).map((item, index) => (
                        <li
                            key={item._id}
                            className={`${currentSong.song == item.song && playPouse ? "active" : ""} ${currentSong.song == item.song ? "selected" : ""}`}
                            onClick={() => {
                                if (playPouse && (currentSong.song == item.song)) {
                                    setPlayPouse(false)
                                } else {
                                    setQueue(user.recently);
                                    setCurrentSong(item)
                                    if (currentSong.song != item.song) setReadTime(0)
                                    setPlayPouse(true)
                                    setTimeout(() => setRender(!render), 10)
                                    axios.patch(`${process.env.NEXT_PUBLIC_SERVER_API}/users/song/${myuser._id}`, { id: item._id })
                                }
                            }}>
                            <div className='index'>
                                <span className='in'>{index + 1}</span>
                                <div className="icon">{
                                    playPouse && (currentSong.song == item.song) ? <svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none">
                                        <rect width="4.5" height="12" rx="1.6" fill="#D9D9D9" />
                                        <rect x="6" width="4.5" height="12" rx="1.6" fill="#D9D9D9" />
                                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14" viewBox="0 0 11 14" fill="none">
                                        <path d="M9.41769 5.32274C10.6318 6.11134 10.6318 7.88866 9.4177 8.67726L3.08941 12.7876C1.75887 13.6518 0 12.6969 0 11.1103V2.88965C0 1.30308 1.75887 0.348189 3.08941 1.2124L9.41769 5.32274Z" fill="#D9D9D9" />
                                    </svg>
                                }</div>
                                <div className="wave">
                                    <div className="wavel"></div>
                                    <div className="wavel"></div>
                                    <div className="wavel"></div>
                                    <div className="wavel"></div>
                                    <div className="wavel"></div>
                                </div>
                            </div>
                            <div className='another'>
                                <div className='music'>
                                    <div className='image'><img src={item.image} alt={item.name} /></div>
                                    <div className="music-title">
                                        <h3>{item.name}</h3>
                                        <p>{item.singerName.map(n => n + ', ')}</p>
                                    </div>
                                </div>
                                <div className='listen'><p>{item.listenCount}</p></div>
                                <div className='duration'><p><GetAudioDuration audioUrl={item.song} /></p></div>
                            </div>
                        </li>
                    ))}

                </ul>
            </div>}
        </HomeLayout>
    )
}
