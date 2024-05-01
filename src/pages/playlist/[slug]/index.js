import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import axios from "axios";

import { success } from "../../../utils/toastify";
import { useMusic, useStore } from "../../../store/zustand";
import useLocalStorage from "../../../hooks/useLocalStorage";
import GetAudioDuration from '../../../hooks/useDuration';
import Loading from "../../../components/loading/home";
import Error from "../../../components/other/error";
import HomeLayout from "../../../layouts/home";
import { IoTimeOutline } from "react-icons/io5";

export default function HomePlaylist() {
    const user = useStore(state => state.user)
    const getUserFromToken = useStore(state => state.getUserFromToken)
    const [loadedImage, setLoadedImage] = useState(false);
    const [token, setToken] = useLocalStorage("token", "null")
    const pathname = usePathname()
    const router = useRouter()

    const render = useMusic((state) => state.render);
    const setRender = useMusic((state) => state.setRender);
    const setReadTime = useMusic((state) => state.setReadTime);
    const playPouse = useMusic((state) => state.playPouse);
    const setPlayPouse = useMusic((state) => state.setPlayPouse);
    const queue = useMusic(state => state.musics)
    const setQueue = useMusic((state) => state.setMusics);
    const currentSong = useMusic((state) => state.currentMusic);
    const setCurrentSong = useMusic((state) => state.setCurrentMusic);

    const { data: playlist, isLoading, isError, isSuccess, refetch } = useQuery({
        queryKey: ['playlist'],
        queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/playlists/${pathname.split('/')[2]}`, { headers: { 'secret': process.env.NEXT_PUBLIC_SECRET } }).then(({ data }) => data),
    })

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
    if (isSuccess && playlist) return (
        <HomeLayout page="home-album" title="Playlist">
            <div className="profile">
                <Image
                    src={playlist.image || "/other/unknown.music.webp"}
                    alt="user"
                    width={180}
                    height={180}
                    placeholder="blur"
                    blurDataURL="/other/unknown.music.blur.webp"
                    className={loadedImage ? 'album-image unblur' : 'user-image'}
                    onLoad={() => setLoadedImage(true)}
                />
                <div className="content">
                    <p className="title">Playlist</p>
                    <h1 className="name">{playlist.name}</h1>
                    <div className="singers">
                        <div className="creator" onClick={() => router.push(`/@${playlist.creator.username}`)}>
                            <img src={playlist.creator.image} alt={playlist.creator.name} width={20} height={20} />
                            <p>{playlist.creator.name}</p>
                        </div>
                        <span className="dot"> • </span>
                        <p>{playlist.subscribers.length} Followers</p>
                        <span className="dot"> • </span>
                        <p>{playlist.songs.length} Songs</p>
                    </div>
                </div>
            </div>
            <div className="panel">
                <button className="play" onClick={() => {
                    if (arraysEqual(queue, playlist.songs)) {
                        if (playPouse) {
                            setPlayPouse(false)
                        } else {
                            setPlayPouse(true)
                            setTimeout(() => setRender(!render), 10)
                        }
                    } else {
                        setQueue(playlist.songs);
                        setCurrentSong(playlist.songs[0])
                        setReadTime(0)
                        setPlayPouse(true)
                        setTimeout(() => setRender(!render), 10)
                        axios.patch(`${process.env.NEXT_PUBLIC_SERVER_API}/users/song/${user._id}`, { id: playlist.songs[0]._id }, { headers: { 'secret': process.env.NEXT_PUBLIC_SECRET } })
                    }
                }}>
                    {arraysEqual(queue, playlist.songs) && playPouse ? <svg
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
                {playlist.creator.username != user.username ? <button
                    className={`subscription${arrayCheckField(user._id, playlist.subscribers) ? ' active' : ''}`}
                    onClick={() => {
                        if (arrayCheckField(user._id, playlist.subscribers)) {
                            axios.delete(`${process.env.NEXT_PUBLIC_SERVER_API}/playlists/subscriber/${pathname.split('/')[2]}`, { headers: { 'user-id': user._id, 'secret': process.env.NEXT_PUBLIC_SECRET } }).then(({ data }) => {
                                refetch()
                                success(data)
                                getUserFromToken(token, router)
                            })
                        } else {
                            axios.patch(`${process.env.NEXT_PUBLIC_SERVER_API}/playlists/subscriber/${pathname.split('/')[2]}`, { id: user._id }, { headers: { 'secret': process.env.NEXT_PUBLIC_SECRET } }).then(({ data }) => {
                                refetch()
                                success(data)
                                getUserFromToken(token, router)
                            })
                        }
                    }}
                >{arrayCheckField(user._id, playlist.subscribers) ? 'Following' : 'Follow'}</button> : <button className="delete-playlist" onClick={() => axios.delete(`${process.env.NEXT_PUBLIC_SERVER_API}/playlists/${pathname.split('/')[2]}`, { headers: { 'secret': process.env.NEXT_PUBLIC_SECRET } }).then(({ data }) => {
                    success(data)
                    getUserFromToken(token, router)
                    router.push('/home')
                })}>Delete</button>}
            </div>
            <div className="songs">
                <div className="head">
                    <div className="numero">&#8470;</div>
                    <div className="another">
                        <div className="name">Title</div>
                        <div className="listen">Listened</div>
                        <div className="duration"><IoTimeOutline /></div>
                        {playlist.creator.username == user.username && <div className="action">Action</div>}
                    </div>
                </div>
                <ul className='list'>
                    {playlist.songs.map((item, index) => (
                        <li
                            key={item._id}
                            className={`${currentSong.song == item.song && playPouse ? "active" : ""} ${currentSong.song == item.song ? "selected" : ""}`}
                            onClick={() => {
                                if (playPouse && (currentSong.song == item.song)) {
                                    setPlayPouse(false)
                                } else {
                                    setQueue(playlist.songs);
                                    setCurrentSong(item)
                                    if (currentSong.song != item.song) setReadTime(0)
                                    setPlayPouse(true)
                                    setTimeout(() => setRender(!render), 10)
                                    axios.patch(`${process.env.NEXT_PUBLIC_SERVER_API}/users/song/${user._id}`, { id: item._id }, { headers: { 'secret': process.env.NEXT_PUBLIC_SECRET } })
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
                                    <img src={item.image || "/other/unknown.music.webp"} alt={item.name} />
                                    <div className="music-title">
                                        <h3>{item.name}</h3>
                                        <p>{item.singerName.map((n, i) => item.singerName.length == i + 1 ? n : n + ', ')}</p>
                                    </div>
                                </div>
                                <div className='listen'><p>{item.listenCount.toString().split('').map((c, i) => i % 3 == 1 ? `${c} ` : c)}</p></div>
                                <div className='duration'><p><GetAudioDuration audioUrl={item.song} /></p></div>
                                {playlist.creator.username == user.username && <div className="action"><button onClick={() => axios.delete(`${process.env.NEXT_PUBLIC_SERVER_API}/playlists/song/${pathname.split('/')[2]}`, { headers: { 'song-id': item._id, 'secret': process.env.NEXT_PUBLIC_SECRET } }).then(({ data }) => {
                                    refetch()
                                    success(data)
                                })}>Delete</button></div>}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </HomeLayout>
    )
    return <Error />
}
