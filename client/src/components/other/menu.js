import { useRouter } from 'next/navigation';
import { useState } from 'react'
import axios from 'axios';

import { useContextMenu, useMusic, useStore } from '../../store/zustand';
import useLocalStorage from '../../hooks/useLocalStorage';
import { info, success } from "../../utils/toastify"

import { IoIosAdd } from "react-icons/io";
import { GoShareAndroid } from "react-icons/go";
import { TbArrowBadgeRightFilled, TbClipboardCopy } from "react-icons/tb";
import { BiAlbum, BiMicrophone } from "react-icons/bi";
import { PiDesktopLight, PiQueue } from "react-icons/pi";
import { TiInfoLargeOutline } from "react-icons/ti";
import { HiOutlineCodeBracketSquare } from "react-icons/hi2";

export function SongMenu() {
    const [isHoverPlaylist, setIsHoverPlaylist] = useState()
    const [isHoverShare, setIsHoverShare] = useState()
    const cursor = useContextMenu((state) => state.cursor);
    const isShow = useContextMenu((state) => state.isShow);
    const setIsShow = useContextMenu((state) => state.setIsShow);
    const { yourPlaylists, _id, name, username } = useStore((state) => state.user);
    const setLoading = useStore((state) => state.setLoading);
    const getUserFromToken = useStore(state => state.getUserFromToken);
    const [token, setToken] = useLocalStorage("token", "null")
    const router = useRouter();

    const queue = useMusic(state => state.musics)
    const setQueue = useMusic(state => state.setMusics)

    return (
        <div id='menu' style={{
            top: `${cursor.y}px`,
            left: `${cursor.x}px`,
        }}>
            <ul className='list' >
                <li onMouseEnter={() => setIsHoverPlaylist(true)}
                    onMouseLeave={() => setIsHoverPlaylist(false)}
                >
                    <IoIosAdd className='add' />
                    <span>Add to Playlist</span>
                    <TbArrowBadgeRightFilled className='end' />
                </li>
                <li onClick={() => info('Coming Soon!')}>
                    <svg
                        className='like'
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="-1 0 22 20"
                        fill="none"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.82371 9.123C3.22571 13.485 8.76471 17.012 10.2367 17.885C11.7137 17.003 17.2927 13.437 18.6497 9.127C19.5407 6.341 18.7137 2.812 15.4277 1.753C13.8357 1.242 11.9787 1.553 10.6967 2.545C10.4287 2.751 10.0567 2.755 9.78671 2.551C8.42871 1.53 6.65471 1.231 5.03771 1.753C1.75671 2.811 0.932712 6.34 1.82371 9.123ZM10.2377 19.501C10.1137 19.501 9.99071 19.471 9.87871 19.41C9.56571 19.239 2.19271 15.175 0.395713 9.581C0.394712 9.581 0.394712 9.58 0.394712 9.58C-0.733288 6.058 0.522713 1.632 4.57771 0.324996C6.48171 -0.291004 8.55671 -0.020004 10.2347 1.039C11.8607 0.010996 14.0207 -0.273004 15.8867 0.324996C19.9457 1.634 21.2057 6.059 20.0787 9.58C18.3397 15.11 10.9127 19.235 10.5977 19.408C10.4857 19.47 10.3617 19.501 10.2377 19.501Z"
                            fill="#F3F3F3"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M16.1537 7.6249C15.7667 7.6249 15.4387 7.3279 15.4067 6.9359C15.3407 6.1139 14.7907 5.4199 14.0077 5.1669C13.6127 5.0389 13.3967 4.6159 13.5237 4.2229C13.6527 3.8289 14.0717 3.6149 14.4677 3.7389C15.8307 4.1799 16.7857 5.3869 16.9027 6.8139C16.9357 7.2269 16.6287 7.5889 16.2157 7.6219C16.1947 7.6239 16.1747 7.6249 16.1537 7.6249Z"
                            fill="#F3F3F3"
                        />
                    </svg>
                    <span>Add liked songs</span>
                </li>
                <li onClick={() => setQueue([...queue, isShow])}>
                    <PiQueue className='small' />
                    <span>Add to queue</span>
                </li>
                <hr />
                <li onClick={() => router.push(`/album/${isShow.album}`)}>
                    <BiAlbum className='small' />
                    <span>Album</span>
                </li>
                <li onClick={() => router.push(`/@${isShow.singerUsername[0]}`)}>
                    <BiMicrophone className='small' />
                    <span>Singer</span>
                </li>
                <li onClick={() => info('Coming Soon!')}>
                    <TiInfoLargeOutline className='small' />
                    <span>Credits</span>
                </li>
                <hr />
                <li onMouseEnter={() => setIsHoverShare(true)}
                    onMouseLeave={() => setIsHoverShare(false)}
                >
                    <GoShareAndroid className='small' />
                    <span>Share</span>
                    <TbArrowBadgeRightFilled className='end' />
                </li>
                <hr />
                <li onClick={() => info('Coming Soon!')}>
                    <PiDesktopLight className='small' />
                    <span>Open in Desktop app</span>
                </li>
            </ul>
            <ul onMouseEnter={() => setIsHoverPlaylist(true)}
                onMouseLeave={() => setIsHoverPlaylist(false)}
                className={`playlist${isHoverPlaylist ? ' active' : ''}`}
            >
                <li className='playlist create'
                    onClick={() => {
                        setIsShow(false)
                        setLoading(true)
                        axios.post(`${process.env.NEXT_PUBLIC_SERVER_API}/playlists`, {
                            name: isShow.name,
                            creatorId: _id,
                            creatorName: name,
                            creatorUsername: username,
                            image: isShow.image,
                            description: null,
                            subscribers: [_id],
                            songs: [isShow._id],
                        }, { headers: { 'secret': process.env.NEXT_PUBLIC_SECRET } }).then(() => getUserFromToken(token, router))
                            .catch((res) => console.log(res))
                            .finally(() => setLoading(false))
                    }}>
                    <IoIosAdd />
                    <button>Create Playlist</button>
                </li>
                <hr />
                {yourPlaylists.map((item, i) => (
                    <li key={i} className='playlist' onClick={() => {
                        axios.patch(`${process.env.NEXT_PUBLIC_SERVER_API}/playlists/song/${item._id}`, { id: isShow._id }, { headers: { 'secret': process.env.NEXT_PUBLIC_SECRET } }).then(({ data }) => success(data))
                    }}>
                        <img src={item.image || '/other/unknown.music.webp'} alt="playlist" width={22} height={22} />
                        <span>{item.name}</span>
                    </li>
                ))}
            </ul>
            <ul onMouseEnter={() => setIsHoverShare(true)}
                onMouseLeave={() => setIsHoverShare(false)}
                className={`share${isHoverShare ? ' active' : ''}`}
            >
                <li onClick={() => navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_CLIENT_API}/album/${isShow.album}`)}>
                    <TbClipboardCopy className='small' />
                    <span>Copy url song</span>
                </li>
                <li onClick={() => info('Coming Soon!')}>
                    <HiOutlineCodeBracketSquare className='small' />
                    <span>Copy code embed</span>
                </li>
            </ul>
        </div>
    )
}
