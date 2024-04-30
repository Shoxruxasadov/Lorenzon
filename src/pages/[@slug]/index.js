import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from 'next/image'
import axios from "axios";

import { success } from "../../utils/toastify";
import { useMusic, useStore } from "../../store/zustand";
import GetAudioDuration from '../../hooks/useDuration';
import Loading from "../../components/loading/home";
import Error from "../../components/other/error";
import HomeLayout from '../../layouts/home'
import Banner from '../../layouts/banner'

export default function User() {
    const myuser = useStore((state) => state.user);
    const setAbout = useStore((state) => state.setAbout);
    const setOpenAbout = useStore((state) => state.setOpenAbout);
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
    const [columnCount, setColumnCount] = useState(6);
    const pathname = usePathname()
    const router = useRouter()

    const { data: user, isLoading, isError, isSuccess, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/users/username/${pathname.substring(2)}`).then(({ data }) => data),
    })

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 2330) setColumnCount(10);
            if (window.innerWidth >= 2130 && window.innerWidth < 2330) setColumnCount(9);
            if (window.innerWidth >= 1930 && window.innerWidth < 2130) setColumnCount(8);
            if (window.innerWidth >= 1730 && window.innerWidth < 1930) setColumnCount(7);
            if (window.innerWidth >= 1560 && window.innerWidth < 1730) setColumnCount(6);
            if (window.innerWidth >= 1400 && window.innerWidth < 1560) setColumnCount(5);
            if (window.innerWidth >= 1230 && window.innerWidth < 1400) setColumnCount(4);
            if (window.innerWidth >= 1024 && window.innerWidth < 1230) setColumnCount(3);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (pathname) refetch()
    }, [pathname])

    function arraysEqual(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; ++i) { if (a[i]._id !== b[i]._id) return false; }
        return true;
    }

    function arrayCheckField(id, array) {
        for (let i = 0; i < array.length; ++i) {
            if (array[i] == id) return true;
        }
        return false;
    }

    if (isLoading) return <Loading />
    if (isError) return <Error />
    if (pathname.substring(1).startsWith("@") && isSuccess && user) return (
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
                    onLoad={() => setLoadedImage(true)}
                />
                <div className="content">
                    <h1 className="name">{user.name}</h1>
                    <p className="username">
                        <span>@{user.username}</span>
                        {user.role === 'singer' && user.status === 'premium' ?
                            <div className="verify">
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M9.53359 0.416756C9.79923 0.179395 10.2008 0.179395 10.4664 0.416756L12.8406 2.53818C12.9588 2.64382 13.1094 2.7062 13.2677 2.7151L16.4466 2.89382C16.8023 2.91382 17.0862 3.19775 17.1062 3.55342L17.2849 6.7323C17.2938 6.8906 17.3562 7.04118 17.4618 7.15941L19.5832 9.53359C19.8206 9.79923 19.8206 10.2008 19.5832 10.4664L17.4618 12.8406C17.3562 12.9588 17.2938 13.1094 17.2849 13.2677L17.1062 16.4466C17.0862 16.8023 16.8023 17.0862 16.4466 17.1062L13.2677 17.2849C13.1094 17.2938 12.9588 17.3562 12.8406 17.4618L10.4664 19.5832C10.2008 19.8206 9.79923 19.8206 9.53359 19.5832L7.15941 17.4618C7.04118 17.3562 6.8906 17.2938 6.7323 17.2849L3.55342 17.1062C3.19775 17.0862 2.91382 16.8023 2.89382 16.4466L2.7151 13.2677C2.7062 13.1094 2.64382 12.9588 2.53818 12.8406L0.416756 10.4664C0.179395 10.2008 0.179395 9.79923 0.416756 9.53359L2.53818 7.15941C2.64382 7.04118 2.7062 6.8906 2.7151 6.7323L2.89382 3.55342C2.91382 3.19775 3.19775 2.91382 3.55342 2.89382L6.7323 2.7151C6.8906 2.7062 7.04118 2.64382 7.15941 2.53818L9.53359 0.416756Z" fill="#6940ee"></path>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="7.5" height="10" viewBox="0 0 10 10" fill="none">
                                    <path d="M2.08334 5.41666L3.75001 7.08332L7.91668 2.91666" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            </div> : user.status === 'premium' && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 1 15 15" width="16" height="16">
                                <path d="M11.3334 14.6667H4.66669C4.39335 14.6667 4.16669 14.44 4.16669 14.1667C4.16669 13.8933 4.39335 13.6667 4.66669 13.6667H11.3334C11.6067 13.6667 11.8334 13.8933 11.8334 14.1667C11.8334 14.44 11.6067 14.6667 11.3334 14.6667Z" fill='#6940ee' />
                                <path d="M13.5667 3.67999L10.9 5.58665C10.5467 5.83999 10.04 5.68665 9.88669 5.27999L8.62669 1.91999C8.41336 1.33999 7.59336 1.33999 7.38002 1.91999L6.11336 5.27332C5.96002 5.68665 5.46002 5.83999 5.10669 5.57999L2.44002 3.67332C1.90669 3.29999 1.20002 3.82665 1.42002 4.44665L4.19336 12.2133C4.28669 12.48 4.54002 12.6533 4.82002 12.6533H11.1734C11.4534 12.6533 11.7067 12.4733 11.8 12.2133L14.5734 4.44665C14.8 3.82665 14.0934 3.29999 13.5667 3.67999ZM9.66669 9.83332H6.33336C6.06002 9.83332 5.83336 9.60665 5.83336 9.33332C5.83336 9.05999 6.06002 8.83332 6.33336 8.83332H9.66669C9.94002 8.83332 10.1667 9.05999 10.1667 9.33332C10.1667 9.60665 9.94002 9.83332 9.66669 9.83332Z" fill='#6940ee' />
                            </svg>
                        }
                    </p>
                    <div className="follow">
                        <p className="followers" onClick={() => router.push(`${pathname}/followers`)}>{user.followers ? user.followers.length : 0} Followers</p>
                        <span className="dot"> • </span>
                        <p className="following" onClick={() => router.push(`${pathname}/following`)}>{user.following ? user.following.length : 0} Following</p>
                    </div>
                </div>
                <div className="block">
                    {user._id == myuser._id ? <button onClick={() => router.push('/settings')} className="customize">Customize Profile</button>
                        : <>
                            {<button
                                className={`${arrayCheckField(myuser._id, user.followers || []) ? 'following' : 'follow'}`}
                                onClick={() => {
                                    if (arrayCheckField(myuser._id, user.followers || [])) {
                                        axios.delete(`${process.env.NEXT_PUBLIC_SERVER_API}/users/unfollow/${user._id}`, { headers: { 'my-user-id': myuser._id } }).then(({ data }) => { refetch(); success(data) })
                                    } else {
                                        axios.patch(`${process.env.NEXT_PUBLIC_SERVER_API}/users/follow/${user._id}`, { id: myuser._id }).then(({ data }) => { refetch(); success(data) })
                                    }
                                }}
                            >{arrayCheckField(myuser._id, user.followers || []) ? 'Following' : 'Follow'}</button>}
                        </>}
                    <button onClick={() => {
                        setAbout(user)
                        setOpenAbout(true)
                    }} className="about">About</button>
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
            </div>
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
                                    <div className='image'><img src={item.image || "/other/unknown.music.webp"} alt={item.name} /></div>
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
                <p className='title'>Listened last 5 songs </p>
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
                                    <div className='image'><img src={item.image || "/other/unknown.music.webp"} alt={item.name} /></div>
                                    <div className="music-title">
                                        <h3>{item.name}</h3>
                                        <p>{item.singerName.map((n, i) => item.singerName.length == i + 1 ? n : n + ', ')}</p>
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
                                    <div className='image'><img src={item.image || "/other/unknown.music.webp"} alt={item.name} /></div>
                                    <div className="music-title">
                                        <h3>{item.name}</h3>
                                        <p>{item.singerName && item.singerName.map((n, i) => item.singerName.length == i + 1 ? n : n + ', ')}</p>
                                    </div>
                                </div>
                                <div className='listen'><p>{item.listenCount}</p></div>
                                <div className='duration'><p><GetAudioDuration audioUrl={item.song} /></p></div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>}
            {user.albums && user.albums.length > 0 && <div className="albums">
                <p className='title'>Albums</p>
                <div className="content" style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`, }}>
                    {user.albums.slice(0, columnCount).map((item, index) => (
                        <div key={index} className='card' onClick={() => router.push(`/album/${item._id}`)} >
                            <div className="images">
                                <Image
                                    src={item.image || "/other/unknown.music.webp"}
                                    alt="image"
                                    width={200}
                                    height={200}
                                    placeholder="blur"
                                    blurDataURL="/other/unknown.music.blur.webp"
                                    className={`image ${loadedImage ? 'unblur' : ''}`}
                                    onLoad={() => setLoadedImage(true)}
                                />
                            </div>
                            <div className="title">
                                <h2>{item.name}</h2>
                                <p>Album</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>}
            {user.yourPlaylists && user.yourPlaylists.length > 0 && <div className="playlists">
                <p className='title'>Opened playlists</p>
                <div className="content" style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`, }} >
                    {user.yourPlaylists.slice(0, columnCount).map((item, index) => (
                        <div key={index} className='card' onClick={() => router.push(`/playlist/${item._id}`)}>
                            <div className="images">
                                <Image
                                    src={item.image || "/other/unknown.music.webp"}
                                    alt="image"
                                    width={200}
                                    height={200}
                                    placeholder="blur"
                                    blurDataURL="/other/unknown.music.blur.webp"
                                    className={`image ${loadedImage ? 'unblur' : ''}`}
                                    onLoad={() => setLoadedImage(true)}
                                />
                            </div>
                            <div className="title">
                                <h2>{item.name}</h2>
                                <p>{item.creatorName}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>}
        </HomeLayout>
    )
    return <Error />
}

