import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";

import { useMusic } from "../../../store/zustand";
import GetAudioDuration from '../../../hooks/useDuration';
import Loading from "../../../components/loading/home";
import Error from "../../../components/other/error";
import HomeLayout from "../../../layouts/home";
import { IoTimeOutline } from "react-icons/io5";

export default function HomePlaylist() {
    const [loadedImage, setLoadedImage] = useState(false);
    const pathname = usePathname()
    const router = useRouter()

    const render = useMusic((state) => state.render);
    const setRender = useMusic((state) => state.setRender);
    const setReadTime = useMusic((state) => state.setReadTime);
    const playPouse = useMusic((state) => state.playPouse);
    const setPlayPouse = useMusic((state) => state.setPlayPouse);
    const setMusics = useMusic((state) => state.setMusics);
    const currentSong = useMusic((state) => state.currentMusic);
    const setCurrentSong = useMusic((state) => state.setCurrentMusic);

    const { data: playlist, isLoading, isError, isSuccess, refetch } = useQuery({
        queryKey: "playlist",
        queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/playlists/${pathname.split('/')[2]}`).then(({ data }) => data),
    })

    useEffect(() => {
        if (pathname) refetch()
    }, [pathname])

    if (isLoading) return <Loading />
    if (isError) return <Error />
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
                    onLoadingComplete={() => setLoadedImage(true)}
                />
                <div className="content">
                    <p className="title">Playlist</p>
                    <h1 className="name">{playlist.name}</h1>
                    <div className="singers">
                        {/* <p>{playlist.singerName.map((s, i) => <span key={i} onClick={() => router.push(`/@${playlist.singerUsername[i]}`)} className="singer">{s + ', '}</span>)}</p>
                        <span className="dot"> • </span> */}
                        {playlist.songs.length > 0 && <><p>{playlist.songs[0].createdDay.substring(0, 4)}</p>
                            <span className="dot"> • </span></>}
                        <p>{playlist.songs.length} track</p>
                    </div>
                </div>
            </div>
            <div className="panel"></div>
            <div className="songs">
                <div className="head">
                    <div className="numero">&#8470;</div>
                    <div className="another">
                        <div className="name">Title</div>
                        <div className="listen">Listened</div>
                        <div className="duration"><IoTimeOutline /></div>
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
                                    setMusics(playlist.songs);
                                    setCurrentSong(item)
                                    if (currentSong.song != item.song) setReadTime(0)
                                    setPlayPouse(true)
                                    setTimeout(() => setRender(!render), 10)
                                    axios.patch(`${process.env.NEXT_PUBLIC_SERVER_API}/users/song/${user._id}`, { id: item._id })
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
            </div>
        </HomeLayout>
    )
    return <Error />
}
