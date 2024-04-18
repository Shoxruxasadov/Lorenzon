import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

import { useMusic } from "../../../store/zustand";
import GetAudioDuration from '../../../hooks/useDuration';
import Loading from "../../../components/loading/home";
import Error from "../../../components/other/error";
import HomeLayout from "../../../layouts/home";
import { IoTimeOutline } from "react-icons/io5";

export default function HomeAlbum() {
    const pathname = usePathname()
    const router = useRouter()
    const [album, setAlbum] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [loadedImage, setLoadedImage] = useState(false);

    const render = useMusic((state) => state.render);
    const setRender = useMusic((state) => state.setRender);
    const setReadTime = useMusic((state) => state.setReadTime);
    const playPouse = useMusic((state) => state.playPouse);
    const setPlayPouse = useMusic((state) => state.setPlayPouse);
    const setMusics = useMusic((state) => state.setMusics);
    const currentSong = useMusic((state) => state.currentMusic);
    const setCurrentSong = useMusic((state) => state.setCurrentMusic);

    const getAlbum = async () => axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/albums/${pathname.split('/')[2]}`).then(({ data }) => setAlbum(data[0])).catch((res) => setAlbum(undefined)).finally(() => setLoading(false));

    useEffect(() => {
        if (pathname) getAlbum()
    }, [pathname])

    if (isLoading) return <Loading />
    if (!album) return <Error />
    return (
        <HomeLayout page="home-album" title="Album">
            <div className="profile">
                <Image
                    src={album.image || "/other/unknown.music.webp"}
                    alt="user"
                    width={180}
                    height={180}
                    placeholder="blur"
                    blurDataURL="/other/unknown.music.blur.webp"
                    className={loadedImage ? 'album-image unblur' : 'user-image'}
                    onLoadingComplete={() => setLoadedImage(true)}
                />
                <div className="content">
                    <p className="title">{album.songs.length > 1 ? 'Album' : 'Single'}</p>
                    <h1 className="name">{album.name}</h1>
                    <div className="singers">
                        <p>{album.singerName.map((s, i) => <span onClick={() => router.push(`/@${album.singerUsername[i]}`)} className="singer">{s + ', '}</span>)}</p>
                        <span className="dot"> • </span>
                        <p>{album.songs[0].createdDay.substring(0, 4)}</p>
                        <span className="dot"> • </span>
                        <p>{album.songs.length} track</p>
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
                    {album.songs.map((item, index) => (
                        <li
                            key={item._id}
                            className={`${currentSong.song == item.song && playPouse ? "active" : ""} ${currentSong.song == item.song ? "selected" : ""}`}
                            onClick={() => {
                                if (playPouse && (currentSong.song == item.song)) {
                                    setPlayPouse(false)
                                } else {
                                    setMusics(album.songs);
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
}
