import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import { useMusic, useStore } from "../../../store/zustand";
import HomeLayout from "../../../layouts/home";
import GetAudioDuration from "../../../hooks/useDuration"
import Loading from "../../../components/loading/home";

export default function HomeSearching() {
    const user = useStore((state) => state.user);
    const [isLoading, setLoading] = useState(true)
    const [searchData, setSearchData] = useState({
        topSong: {},
        popularSongs: [],
        otherSongs: [],
        singers: [],
        albums: [],
        playlists: [],
        profiles: [],
    })
    const [columnCount, setColumnCount] = useState(6);
    const [loadedImage, setLoadedImage] = useState(false)
    const pathname = usePathname()
    const router = useRouter()

    const render = useMusic((state) => state.render);
    const setRender = useMusic((state) => state.setRender);
    const playPouse = useMusic((state) => state.playPouse);
    const setPlayPouse = useMusic((state) => state.setPlayPouse);
    const currentSong = useMusic((state) => state.currentMusic);
    const setCurrentSong = useMusic((state) => state.setCurrentMusic);
    const setReadTime = useMusic((state) => state.setReadTime);

    useEffect(() => {
        setLoading(true)
        pathname && axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/search/${pathname.split('/')[2].replaceAll('%20', ' ')}`).then(({ data }) => setSearchData(data)).finally(() => setLoading(false))

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
    }, [pathname]);

    if (isLoading) return <Loading />
    return (
        <HomeLayout page="home-search" title={`serach - ${pathname.split('/')[2]}`}>
            {searchData ? <>
                {searchData.topSong != null && <div className="top">
                    <article className="top-result">
                        <header>
                            <h1>Top Result</h1>
                        </header>
                        <div className="content" >
                            <div
                                className={`card-top ${currentSong.song == searchData.topSong.song && playPouse ? "active" : ""}`}
                                onClick={() => {
                                    if (playPouse && (currentSong.song == searchData.topSong.song)) {
                                        setPlayPouse(false)
                                    } else {
                                        setPlayPouse(true)
                                        setCurrentSong(searchData.topSong)
                                        setTimeout(() => setRender(!render), 10)
                                        if (currentSong.song != searchData.topSong.song) setReadTime(0)
                                        axios.patch(`${process.env.NEXT_PUBLIC_SERVER_API}/users/song/${user._id}`, { id: searchData.topSong._id })
                                    }
                                }}
                            >
                                <div className="images" >
                                    <svg
                                        className={`pouse ${playPouse ? "active" : ""}`}
                                        xmlns="http://www.w3.org/2000/svg"
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
                                    </svg>
                                    <svg
                                        className="play"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 100 100"
                                        fill="none"
                                    >
                                        <circle cx="50" cy="50" r="50" fill="#6940EE" />
                                        <path
                                            d="M68.5 46.1699C71.8333 48.0944 71.8333 52.9056 68.5 54.8301L42.25 69.9856C38.9167 71.9101 34.75 69.5044 34.75 65.6554L34.75 35.3446C34.75 31.4956 38.9167 29.0899 42.25 31.0144L68.5 46.1699Z"
                                            fill="#0D1219"
                                        />
                                    </svg>
                                    <Image
                                        src={searchData.topSong.image || "/other/unknown.music.webp"}
                                        alt="image"
                                        width={200}
                                        height={200}
                                        placeholder="blur"
                                        blurDataURL="/other/unknown.music.blur.webp"
                                        className={`image ${loadedImage ? 'unblur' : ''}`}
                                        onLoadingComplete={() => setLoadedImage(true)}
                                    />
                                </div>
                                <div className="title">
                                    <h3 onClick={() => router.push(`/album/${searchData.topSong.album}`)}>{searchData.topSong.name}</h3>
                                    <p>{searchData.topSong.singerName.map((n, i) => <span key={i} onClick={() => router.push(`/@${searchData.topSong.singerUsername[i]}`)}>{n + ", "}</span>)}</p>
                                </div>
                            </div>
                        </div>
                    </article>
                    {searchData.popularSongs.length > 0 && <article className="popular-songs">
                        <header>
                            <h1>Popular Songs</h1>
                        </header>
                        <ul className="content">
                            {searchData.popularSongs.map((item, index) => (
                                <li
                                    key={item._id}
                                    className={`${currentSong.song == item.song && playPouse ? "active" : ""} ${currentSong.song == item.song ? "selected" : ""}`}
                                    onClick={() => {
                                        if (playPouse && (currentSong.song == item.song)) {
                                            setPlayPouse(false)
                                        } else {
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
                    </article>}
                </div>}
                {searchData.otherSongs.length > 0 && <article className="column">
                    <header>
                        <h1>Songs</h1>
                        <Link href={`${pathname}/songs`}>Show all</Link>
                    </header>
                    <div className="content" style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`, }}>
                        {searchData.otherSongs.slice(0, columnCount).map((item, index) => (
                            <div
                                className={`card ${currentSong.song == item.song && playPouse ? "active" : ""}`}
                                key={index}
                            >
                                <div
                                    className="images"
                                    onClick={() => {
                                        if (playPouse && (currentSong.song == item.song)) {
                                            setPlayPouse(false)
                                        } else {
                                            setPlayPouse(true)
                                            setCurrentSong(item)
                                            setTimeout(() => setRender(!render), 10)
                                            if (currentSong.song != item.song) setReadTime(0)
                                        }
                                    }}>
                                    <svg
                                        className={`pouse ${playPouse ? "active" : ""}`}
                                        xmlns="http://www.w3.org/2000/svg"
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
                                    </svg>
                                    <svg
                                        className="play"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 100 100"
                                        fill="none"
                                    >
                                        <circle cx="50" cy="50" r="50" fill="#6940EE" />
                                        <path
                                            d="M68.5 46.1699C71.8333 48.0944 71.8333 52.9056 68.5 54.8301L42.25 69.9856C38.9167 71.9101 34.75 69.5044 34.75 65.6554L34.75 35.3446C34.75 31.4956 38.9167 29.0899 42.25 31.0144L68.5 46.1699Z"
                                            fill="#0D1219"
                                        />
                                    </svg>
                                    <Image
                                        src={item.image || "/other/unknown.music.webp"}
                                        alt="image"
                                        width={200}
                                        height={200}
                                        placeholder="blur"
                                        blurDataURL="/other/unknown.music.blur.webp"
                                        className={`image ${loadedImage ? 'unblur' : ''}`}
                                        onLoadingComplete={() => setLoadedImage(true)}
                                    />
                                </div>
                                <div className="title">
                                    <h3>{item.name}</h3>
                                    <p>{item.singerName.map((n, i) => <span key={i} onClick={() => router.push(`/@${item.singerUsername[i]}`)}>{n + ", "}</span>)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </article>}
                {searchData.singers.length > 0 && <article className="column">
                    <header>
                        <h1>Singers</h1>
                        <Link href={`${pathname}/singers`}>Show all</Link>
                    </header>
                    <div className="content" style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`, }}>
                        {searchData.singers.slice(0, columnCount).map((item, index) => (
                            <div
                                className="card"
                                key={index}
                                onClick={() => router.push(`/@${item.username}`)}
                            >
                                <div className="images">
                                    <Image
                                        src={item.image || "/other/unknown.user.webp"}
                                        alt="image"
                                        width={200}
                                        height={200}
                                        placeholder="blur"
                                        blurDataURL="/other/unknown.user.blur.webp"
                                        className={`image ${loadedImage ? 'unblur' : ''}`}
                                        onLoadingComplete={() => setLoadedImage(true)}
                                        style={{ borderRadius: "50%" }}
                                    />
                                </div>
                                <div className="title">
                                    <h2>{item.name}</h2>
                                    <p>Singer</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </article>}
                {searchData.albums.length > 0 && <article className="column">
                    <header>
                        <h1>Albums</h1>
                        <Link href={`${pathname}/albums`}>Show all</Link>
                    </header>
                    <div className="content" style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`, }}>
                        {searchData.albums.slice(0, columnCount).map((item, index) => (
                            <div
                                className='card'
                                key={index}
                                onClick={() => router.push(`/album/${item._id}`)}
                            >
                                <div className="images">
                                    <Image
                                        src={item.image || "/other/unknown.music.webp"}
                                        alt="image"
                                        width={200}
                                        height={200}
                                        placeholder="blur"
                                        blurDataURL="/other/unknown.music.blur.webp"
                                        className={`image ${loadedImage ? 'unblur' : ''}`}
                                        onLoadingComplete={() => setLoadedImage(true)}
                                    />
                                </div>
                                <div className="title">
                                    <h3>{item.name}</h3>
                                    <p>Album</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </article>}
                {searchData.playlists.length > 0 && <article className="column">
                    <header>
                        <h1>Playlists</h1>
                        <Link href={`${pathname}/playlists`}>Show all</Link>
                    </header>
                    <div className="content" style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`, }}>
                        {searchData.playlists.slice(0, columnCount).map((item, index) => (
                            <div
                                className={`card ${currentSong.song == item.song && playPouse ? "active" : ""}`}
                                key={index}
                                onClick={() => router.push(`/album/${item._id}`)}
                            >
                                <div className="images">
                                    <svg
                                        className={`pouse ${playPouse ? "active" : ""}`}
                                        xmlns="http://www.w3.org/2000/svg"
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
                                    </svg>
                                    <svg
                                        className="play"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 100 100"
                                        fill="none"
                                    >
                                        <circle cx="50" cy="50" r="50" fill="#6940EE" />
                                        <path
                                            d="M68.5 46.1699C71.8333 48.0944 71.8333 52.9056 68.5 54.8301L42.25 69.9856C38.9167 71.9101 34.75 69.5044 34.75 65.6554L34.75 35.3446C34.75 31.4956 38.9167 29.0899 42.25 31.0144L68.5 46.1699Z"
                                            fill="#0D1219"
                                        />
                                    </svg>
                                    <Image
                                        src={item.image || "/other/unknown.music.webp"}
                                        alt="image"
                                        width={200}
                                        height={200}
                                        placeholder="blur"
                                        blurDataURL="/other/unknown.music.blur.webp"
                                        className={`image ${loadedImage ? 'unblur' : ''}`}
                                        onLoadingComplete={() => setLoadedImage(true)}
                                    />
                                </div>
                                <div className="title">
                                    <h3>{item.name}</h3>
                                    <p>Playlist</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </article>}
                {searchData.profiles.length > 0 && <article className="column">
                    <header>
                        <h1>Profiles</h1>
                        <Link href={`${pathname}/profiles`}>Show all</Link>
                    </header>
                    <div className="content" style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`, }}>
                        {searchData.profiles.slice(0, columnCount).map((item, index) => (
                            <div
                                className={`card ${currentSong.song == item.song && playPouse ? "active" : ""}`}
                                key={index}
                                onClick={() => router.push(`/@${item.username}`)}
                            >
                                <div className="images" >
                                    <Image
                                        src={item.image || "/other/unknown.music.webp"}
                                        alt="image"
                                        width={200}
                                        height={200}
                                        placeholder="blur"
                                        blurDataURL="/other/unknown.music.blur.webp"
                                        className={`image ${loadedImage ? 'unblur' : ''}`}
                                        onLoadingComplete={() => setLoadedImage(true)}
                                        style={{ borderRadius: "50%" }}
                                    />
                                </div>
                                <div className="title">
                                    <h2>{item.name}</h2>
                                    <p>Profile</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </article>}
            </> : <div className="no">
                <h2>No result found &quot;{pathname.split('/')[2].replaceAll('%20', ' ')}&quot;</h2>
                <p>Please make sure you words are spelled correctly, or use fewer or different keywords.</p>
            </div>
            }
        </HomeLayout >
    )
}
