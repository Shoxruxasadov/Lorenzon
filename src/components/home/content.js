import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useTheme } from 'next-themes'
import { useState } from "react";
import Image from "next/image";
import axios from "axios";

import { useHomeDetails, useMusic, useStore } from "../../store/zustand";
import useLocalStorage from "../../hooks/useLocalStorage";
import { info } from "../../utils/toastify";

import { PiUserSwitch, PiUserCircle, PiSignOut, PiFeather, PiGear, PiGavel, PiMoon, PiSun, PiDevices, PiCheckBold, PiQueueFill, PiMicrophoneStageFill } from "react-icons/pi";
import { IoLanguageOutline, IoChevronBack, IoChevronForward } from "react-icons/io5";
import { BsPatchExclamationFill, BsChatSquareTextFill } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { TbPlaylistAdd } from "react-icons/tb";

export default function Content() {
    const user = useStore((state) => state.user);
    const getUserFromToken = useStore(state => state.getUserFromToken);
    const setVerifyToken = useStore((state) => state.setVerifyToken);
    const setLoading = useStore((state) => state.setLoading);
    const [token, setToken] = useLocalStorage("token", "null")
    const [userNavigate, setUserNavigate] = useState(false);
    const [loadedImage, setLoadedImage] = useState(false);
    const [navigate, setNavigate] = useState("");
    const { theme, setTheme } = useTheme()
    const router = useRouter();

    const songs = useMusic((state) => state.musics);
    const currentSong = useMusic((state) => state.currentMusic);
    const setCurrentSong = useMusic((state) => state.setCurrentMusic);

    const render = useMusic((state) => state.render);
    const setRender = useMusic((state) => state.setRender);
    const setReadTime = useMusic((state) => state.setReadTime);
    const playPouse = useMusic((state) => state.playPouse);
    const setPlayPouse = useMusic((state) => state.setPlayPouse);

    const lyrics = useHomeDetails((state) => state.lyrics);
    const comment = useHomeDetails((state) => state.comment);
    const queue = useHomeDetails((state) => state.queue);

    function switchAccount() {
        setToken("null")
        setPlayPouse(false)
        setVerifyToken(false)
        router.push('/account')
    }

    function logout() {
        setToken("null")
        setPlayPouse(false)
        setVerifyToken(false)
        signOut()
    }

    function arraysEqual(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; ++i) { if (a[i]._id !== b[i]) return false; }
        return true;
    }

    return (
        <aside id="content">
            <div className="user" onClick={() => {
                setUserNavigate(!userNavigate)
                setNavigate("")
            }}>
                <div className="info">
                    <Image
                        src={user.image || "/other/unknown.user.webp"}
                        alt="user"
                        width={100}
                        height={100}
                    />
                    <div className="name">
                        <h3>{user && user.name ? user.name : "Lorenzon"}</h3>
                        <div className="status">
                            <p>
                                <span className="pre">{user && user.status ? user.status : "Basic"}</span>
                                <span className="dot">•</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 1 15 15" className="corona" width="15" height="15">
                                    <path d="M11.3334 14.6667H4.66669C4.39335 14.6667 4.16669 14.44 4.16669 14.1667C4.16669 13.8933 4.39335 13.6667 4.66669 13.6667H11.3334C11.6067 13.6667 11.8334 13.8933 11.8334 14.1667C11.8334 14.44 11.6067 14.6667 11.3334 14.6667Z" fill={user && user.status == "premium" ? 'var(--main-click-color)' : 'var(--medium-color)'} />
                                    <path d="M13.5667 3.67999L10.9 5.58665C10.5467 5.83999 10.04 5.68665 9.88669 5.27999L8.62669 1.91999C8.41336 1.33999 7.59336 1.33999 7.38002 1.91999L6.11336 5.27332C5.96002 5.68665 5.46002 5.83999 5.10669 5.57999L2.44002 3.67332C1.90669 3.29999 1.20002 3.82665 1.42002 4.44665L4.19336 12.2133C4.28669 12.48 4.54002 12.6533 4.82002 12.6533H11.1734C11.4534 12.6533 11.7067 12.4733 11.8 12.2133L14.5734 4.44665C14.8 3.82665 14.0934 3.29999 13.5667 3.67999ZM9.66669 9.83332H6.33336C6.06002 9.83332 5.83336 9.60665 5.83336 9.33332C5.83336 9.05999 6.06002 8.83332 6.33336 8.83332H9.66669C9.94002 8.83332 10.1667 9.05999 10.1667 9.33332C10.1667 9.60665 9.94002 9.83332 9.66669 9.83332Z" fill={user && user.status == "premium" ? 'var(--main-click-color)' : 'var(--medium-color)'} />
                                </svg>
                            </p>
                        </div>
                    </div>
                </div>
                <div className={`arrow ${userNavigate ? "active" : ""}`}>
                    <IoIosArrowBack />
                </div>
            </div>
            <div className={`nav${userNavigate ? " active" : ""}${user && (user.role == "admin" || user.role === "singer") ? " admin" : ""} ${navigate}`} >
                <div className="lists">
                    <div className="list" onClick={() => switchAccount()}>
                        <PiUserSwitch />
                        <p>Switch Account</p>
                    </div>
                    <div className="list" onClick={() => router.push(`/@${user.username}`)}>
                        <PiUserCircle />
                        <p>Your Profile</p>
                    </div>
                    <div className="list" onClick={() => logout()}>
                        <PiSignOut />
                        <p>Log out</p>
                    </div>
                    <hr />
                    <div className="list theme" onClick={() => setNavigate("theme")}>
                        <PiMoon />
                        <p>Theme</p>
                        <IoChevronForward className="end" />
                    </div>
                    <div className="list language" onClick={() => setNavigate("language")}>
                        <IoLanguageOutline />
                        <p>Language</p>
                        <IoChevronForward className="end" />
                    </div>
                    <hr />
                    <div className="list error" onClick={() => router.push('/settings')}>
                        <PiGear />
                        <p>Settings</p>
                    </div>
                    {user && user.role === "admin" && (
                        <div className="list" onClick={() => router.push('/admin')}>
                            <PiGavel />
                            <p>Admin Panel</p>
                        </div>
                    )}
                    {user && user.role === "singer" && (
                        <div className="list" onClick={() => router.push('/singer')}>
                            <PiGavel />
                            <p>Singer Panel</p>
                        </div>
                    )}
                    <div className="list error" onClick={() => router.push('/support')}>
                        <PiFeather />
                        <p>Send Feedback</p>
                    </div>
                </div>

                <div className="theme-lists">
                    <div className="list back" onClick={() => setNavigate("")}>
                        <IoChevronBack />
                        <p>Theme</p>
                    </div>
                    <hr />
                    <div className={`list${theme == 'dark' ? ' selecting' : ''}`} onClick={() => setTheme('dark')}>
                        <PiMoon />
                        <p>Dark theme</p>
                        {theme == 'dark' && <PiCheckBold className="end" />}
                    </div>
                    <div className={`list${theme == 'light' ? ' selecting' : ''}`} onClick={() => setTheme('light')} >
                        <PiSun />
                        <p>Light theme</p>
                        {theme == 'light' && <PiCheckBold className="end" />}
                    </div>
                    <div className={`list${theme == 'system' ? ' selecting' : ''}`} onClick={() => setTheme('system')} >
                        <PiDevices />
                        <p>Device theme</p>
                        {theme == 'system' && <PiCheckBold className="end" />}
                    </div>
                </div>
                <div className="language-lists">
                    <div className="list back" onClick={() => setNavigate("")}>
                        <IoChevronBack />
                        <p>Language</p>
                    </div>
                    <hr />
                    <div className="list error" onClick={() => info("Not available yet!")}>
                        <Image src="/language/uz.svg" alt="uz" width={21} height={21} />
                        <p>Uzbek</p>
                        <BsPatchExclamationFill className="end" />
                    </div>
                    <div className="list error" onClick={() => info("Not available yet!")}>
                        <Image src="/language/ru.svg" alt="ru" width={21} height={21} />
                        <p>Russian</p>
                        <BsPatchExclamationFill className="end" />
                    </div>
                    <div className="list selecting">
                        <Image src="/language/en.svg" alt="en" width={21} height={21} />
                        <p>English</p>
                        <PiCheckBold className="end" />
                    </div>
                </div>
            </div>
            {queue && <article className={`${userNavigate ? "active" : ""} ${navigate ? "segment" : ""} ${user && user.role === "admin" ? "admin" : "simple"}`}>
                <header>
                    <div className="title">
                        <PiQueueFill />
                        <h4>Queue</h4>
                    </div>
                </header>
                <div className="content queue">
                    {songs.map((item, i) => (
                        <div className="card" key={i}>
                            <div className="image" onClick={() => {
                                if (playPouse && (currentSong.song == item.song)) {
                                    setPlayPouse(false)
                                } else {
                                    setPlayPouse(true)
                                    setCurrentSong(item)
                                    setTimeout(() => setRender(!render), 10)
                                    if (currentSong.song != item.song) setReadTime(0)
                                    axios.patch(`${process.env.NEXT_PUBLIC_SERVER_API}/users/song/${user._id}`, { id: item._id }, { headers: { 'secret': process.env.NEXT_PUBLIC_SECRET } })
                                }
                            }}>
                                <img alt={item.name} src={item.image} />
                                {
                                    playPouse && (currentSong.song == item.song) ? <svg xmlns="http://www.w3.org/2000/svg" width="13" height="16" viewBox="0 0 13 16" fill="none">
                                        <rect width="5.41667" height="16" rx="1.6" fill="#D9D9D9" />
                                        <rect width="5.41667" height="16" rx="1.6" fill="#D9D9D9" x="7.41666" />
                                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none" className="play">
                                        <path d="M12.3416 6.3117C13.5787 7.09733 13.5787 8.90267 12.3416 9.6883L3.07222 15.5752C1.74069 16.4208 0 15.4642 0 13.8869L0 2.11314C0 0.535778 1.74069 -0.420796 3.07221 0.424839L12.3416 6.3117Z" fill="#D9D9D9" />
                                    </svg>
                                }
                            </div>
                            <div className="title">
                                <h4 className={`${currentSong.song == item.song ? "active" : ""}`} onClick={() => router.push(`/album/${item.album}`)}>{item.name}</h4>
                                <p className={`singers ${currentSong.song == item.song ? "active" : ""}`}>{item.singerName.map((n, i) => <span key={i} onClick={() => router.push(`/@${item.singerUsername[i]}`)}>{n + ", "}</span>)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </article>}
            {lyrics && <article className={`${userNavigate ? "active" : ""} ${navigate ? "segment" : ""} ${user && user.role === "admin" ? "admin" : "simple"}`}>
                <header>
                    <div className="title">
                        <PiMicrophoneStageFill />
                        <h4>Lyrics</h4>
                    </div>
                </header>
                <div className="content queue">
                    {currentSong.lyrics ? '' : <p className="dontHave">The music has no lyrics!</p>}
                </div>
            </article>}
            {comment && <article className={`${userNavigate ? "active" : ""} ${navigate ? "segment" : ""} ${user && user.role === "admin" ? "admin" : "simple"}`}>
                <header>
                    <div className="title">
                        <BsChatSquareTextFill />
                        <h4>Comments</h4>
                    </div>
                </header>
                <div className="content comment">
                    <p className="dontHave">Music has no comments!</p>
                </div>
                {/* Chat Input for Typing Comment in Song */}
                {/* <footer>
                    <div className="typin">
                        <input type="text" />
                    </div>
                </footer> */}
            </article>}
            {(!lyrics && !comment && !queue) && <article className={`${userNavigate ? "active" : ""} ${navigate ? "segment" : ""} ${user && user.role === "admin" ? "admin" : "simple"}`}>
                <header>
                    <div className="title">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-1 -2.5 30 30" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M2 8C0.895431 8 0 8.89543 0 10V22C0 23.1046 0.89543 24 2 24H22C23.1046 24 24 23.1046 24 22V10C24 8.89543 23.1046 8 22 8H2ZM9.5 13.5002C9.5 12.7323 10.3295 12.251 10.9961 12.6319L14.9806 14.9087C15.6524 15.2926 15.6524 16.2613 14.9806 16.6452L10.9961 18.9221C10.3295 19.303 9.5 18.8216 9.5 18.0538V13.5002Z" fill='var(--text-color)' />
                            <rect x="1" y="4" width="22" height="2" rx="1" fill='var(--text-color)' />
                            <rect x="2" width="20" height="2" rx="1" fill='var(--text-color)' />
                        </svg>
                        <h4>Library</h4>
                    </div>
                    <button role="button" aria-labelledby="content" onClick={() => {
                        setLoading(true)
                        axios.post(`${process.env.NEXT_PUBLIC_SERVER_API}/playlists`, {
                            name: `My playlist № ${user.playlists.length + 1}`,
                            creatorId: user._id,
                            creatorName: user.name,
                            creatorUsername: user.username,
                            image: null,
                            description: null,
                            subscribers: [user._id],
                            songs: [],
                        }, { headers: { 'secret': process.env.NEXT_PUBLIC_SECRET } }).then(() => getUserFromToken(token, router)).catch((res) => console.log(res)).finally(() => setLoading(false))
                    }}><TbPlaylistAdd /></button>
                </header>
                <div className="content library">
                    {user.playlists && user.playlists.length > 0 ? (
                        user.playlists.map((playlist, i) => (
                            <div
                                className={`card${arraysEqual(songs, playlist.songs) && playPouse ? ' active' : ''}`}
                                onClick={() => router.push(`/playlist/${playlist._id}`)}
                                key={i}
                            >
                                <div className="image">
                                    <Image
                                        src={playlist.image || "/other/unknown.music.webp"}
                                        alt={playlist.name }
                                        width={200}
                                        height={200}
                                        placeholder="blur"
                                        blurDataURL="/other/unknown.music.blur.webp"
                                        className={`image ${loadedImage ? 'unblur' : ''}`}
                                        onLoad={() => setLoadedImage(true)}
                                    />
                                </div>
                                <div className="title">
                                    <h4>{playlist.name}</h4>
                                    <p>Playlist • {playlist.creatorName}</p>
                                </div>
                            </div>
                        ))
                    ) : <p className="dontHave">You don&#39;t have a playlist!</p>}
                </div>
            </article>}
        </aside>
    );
}
