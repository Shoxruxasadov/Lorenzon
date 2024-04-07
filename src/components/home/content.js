import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from 'next-themes'

import useLocalStorage from "../../hooks/useLocalStorage";
import { useStore } from "../../store/zustand";
import { info } from "../../utils/toastify";

import { PiUserSwitch, PiUserCircle, PiSignOut, PiFeather, PiGear, PiGavel, PiMoon, PiSun, PiDevices, PiCheckBold } from "react-icons/pi";
import { IoLanguageOutline, IoChevronBack, IoChevronForward } from "react-icons/io5";
import { BsPatchExclamationFill } from "react-icons/bs";
import { MdLocalLibrary } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";

export default function Content() {
    const user = useStore((state) => state.user);
    const [token, setToken] = useLocalStorage("token", "null")
    const [userNavigate, setUserNavigate] = useState(false);
    const [loadedImage, setLoadedImage] = useState(false);
    const [navigate, setNavigate] = useState("");
    const { theme, setTheme, resolvedTheme } = useTheme()
    const router = useRouter();

    // console.log(resolvedTheme);

    function switchAccount() {
        setToken("null")
        router.push('/account')
    }

    function logout() {
        setToken("null")
        router.push("/")
    }

    return (
        <aside id="content">
            <div className="user" onClick={() => {
                setUserNavigate(!userNavigate)
                setNavigate("")
            }}>
                <div className="info">
                    <Image
                        src={user.image || "/other/not.user.webp"}
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
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="15"
                                    height="15"
                                    viewBox="0 0 15 15"
                                    fill="none"
                                >
                                    <path
                                        d="M11.3334 14.6667H4.66669C4.39335 14.6667 4.16669 14.44 4.16669 14.1667C4.16669 13.8933 4.39335 13.6667 4.66669 13.6667H11.3334C11.6067 13.6667 11.8334 13.8933 11.8334 14.1667C11.8334 14.44 11.6067 14.6667 11.3334 14.6667Z"
                                        fill={
                                            user && user.status === "premium"
                                                ? "url(#paint0_linear_261_101)"
                                                : "white"
                                        }
                                    />
                                    <path
                                        d="M13.5667 3.67999L10.9 5.58665C10.5467 5.83999 10.04 5.68665 9.88669 5.27999L8.62669 1.91999C8.41336 1.33999 7.59336 1.33999 7.38002 1.91999L6.11336 5.27332C5.96002 5.68665 5.46002 5.83999 5.10669 5.57999L2.44002 3.67332C1.90669 3.29999 1.20002 3.82665 1.42002 4.44665L4.19336 12.2133C4.28669 12.48 4.54002 12.6533 4.82002 12.6533H11.1734C11.4534 12.6533 11.7067 12.4733 11.8 12.2133L14.5734 4.44665C14.8 3.82665 14.0934 3.29999 13.5667 3.67999ZM9.66669 9.83332H6.33336C6.06002 9.83332 5.83336 9.60665 5.83336 9.33332C5.83336 9.05999 6.06002 8.83332 6.33336 8.83332H9.66669C9.94002 8.83332 10.1667 9.05999 10.1667 9.33332C10.1667 9.60665 9.94002 9.83332 9.66669 9.83332Z"
                                        fill={
                                            user && user.status === "premium"
                                                ? "url(#paint1_linear_261_101)"
                                                : "white"
                                        }
                                    />
                                    <defs>
                                        <linearGradient
                                            id="paint0_linear_261_101"
                                            x1="8.00002"
                                            y1="13.6667"
                                            x2="8.00002"
                                            y2="14.6667"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#896aee" />
                                            <stop offset="1" stopColor="#896aee" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint1_linear_261_101"
                                            x1="7.99784"
                                            y1="1.48499"
                                            x2="7.99784"
                                            y2="12.6533"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#896aee" />
                                            <stop offset="1" stopColor="#896aee" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </p>
                        </div>
                    </div>
                </div>
                <div className={`arrow ${userNavigate ? "active" : ""}`}>
                    <IoIosArrowBack />
                </div>
            </div>
            <div className={`nav ${userNavigate ? "active" : ""} ${user && user.role === "admin" ? "admin" : ""} ${navigate}`} >
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
                    <div className="list error" onClick={() => {
                        info("Not available yet!")
                        // router.push('/settings')
                    }}>
                        <PiGear />
                        <p>Settings</p>
                        <BsPatchExclamationFill className="end" />
                    </div>
                    {user && user.role === "admin" && (
                        <div className="list" onClick={() => router.push('/admin')}>
                            <PiGavel />
                            <p>Admin Panel</p>
                        </div>
                    )}
                    <div className="list error" onClick={() => {
                        info("Not available yet!")
                        // router.push('/feedback')
                    }}>
                        <PiFeather />
                        <p>Send Feedback</p>
                        <BsPatchExclamationFill className="end" />
                    </div>
                </div>

                <div className="theme-lists">
                    <div className="list back" onClick={() => setNavigate("")}>
                        <IoChevronBack />
                        <p>Theme</p>
                    </div>
                    <hr />
                    <div className="list selecting" onChange={() => setTheme('dark')}>
                        <PiMoon />
                        <p>Dark theme</p>
                        <PiCheckBold className="end" />
                    </div>
                    <div className="list error" onClick={() => { info("Not available yet!"); setTheme('light') }} >
                        <PiSun />
                        <p>Light theme</p>
                        <BsPatchExclamationFill className="end" />
                    </div>
                    <div className="list error" onClick={() => { info("Not available yet!"); setTheme('system') }} >
                        <PiDevices />
                        <p>Device theme</p>
                        <BsPatchExclamationFill className="end" />
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
            <article className={`${userNavigate ? "active" : ""} ${navigate ? "segment" : ""} ${user && user.role === "admin" ? "admin" : "simple"}`}>
                <header>
                    <div className="title">
                        <MdLocalLibrary />
                        <h4>Your Library</h4>
                    </div>
                    <Link href={"/home"}>Show all</Link>
                </header>
                <div className="content">
                    <div className="card">
                        <img alt="library" src="https://firebasestorage.googleapis.com/v0/b/lorezoz.appspot.com/o/playlist%2Fphonk.jpg?alt=media&token=ae6bf60c-79a6-432c-9e69-a14106405388" />
                        <div className="title">
                            <h4>Phonk</h4>
                            <p>Playlist • Lorenzon</p>
                        </div>
                    </div>
                    <div className="card">
                        <img alt="library" src="https://i2o.scdn.co/image/ab67706c0000cfa31dce058bce8a49b949c48a66" />
                        <div className="title">
                            <h4>BRAZILIAN PHONK 😈 Phonk Brasileño 2024 🇧🇷 Viral TikTok Funk</h4>
                            <p>Playlist • HOUSE OF PHONK</p>
                        </div>
                    </div>
                    <div className="card">
                        <img alt="library" src="https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84175c629832f7cee13f7ff395" />
                        <div className="title">
                            <h4>Brazilian Phonk // Viral TikTok</h4>
                            <p>Playlist • AV</p>
                        </div>
                    </div>
                    <div className="card">
                        <img alt="library" src="https://i2o.scdn.co/image/ab67706c0000cfa343cfa7f56864a5314a40c755" />
                        <div className="title">
                            <h4>💯🔱PHONK 🔱💯</h4>
                            <p>Playlist • JORDI GR</p>
                        </div>
                    </div>
                    <div className="card">
                        <img alt="library" src="https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84dfc1b943196eebfb0c4534f0" />
                        <div className="title">
                            <h4>PHONK AGRESIVO 💀</h4>
                            <p>Playlist • 𝕮𝖆𝖒𝖎𝖑𝖔ᴳᵒᵈ〗</p>
                        </div>
                    </div>
                    <div className="card">
                        <img alt="library" src="https://i2o.scdn.co/image/ab67706c0000cfa31000fa118c9244c22d96c579" />
                        <div className="title">
                            <h4>phonk 💀</h4>
                            <p>Playlist • theonlyMajed</p>
                        </div>
                    </div>
                    <div className="card">
                        <img alt="library" src="https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84bc0d7dddac407ce260f0f7b5" />
                        <div className="title">
                            <h4>GYM PHONK 2024 😈 AGGRESSIVE WORKOUT PHONK MUSIC</h4>
                            <p>Playlist • Magic Records</p>
                        </div>
                    </div>
                    <div className="card">
                        <img alt="library" src="https://i2o.scdn.co/image/ab67706c0000cfa3ad4c22bc29f8fa3e37a14b70" />
                        <div className="title">
                            <h4>Phonk Éxitos 2024 💀 Brazilian Phonk Mano</h4>
                            <p>Playlist • Filtr Éxitos</p>
                        </div>
                    </div>
                    <div className="card artist">
                        <img alt="library" src="https://i.scdn.co/image/ab6761610000101fab8a761d12b6cbb5c164a102" />
                        <div className="title">
                            <h4>S3BZS</h4>
                            <p>Artist</p>
                        </div>
                    </div>
                    <div className="card">
                        <img alt="library" src="https://misc.scdn.co/liked-songs/liked-songs-64.png" />
                        <div className="title">
                            <h4>Liked Songs</h4>
                            <p>Playlist • 6 songs</p>
                        </div>
                    </div>


                    {/* <p className="dontHave">You don't have a playlist!</p> */}
                </div>
            </article>
        </aside>
    );
}
