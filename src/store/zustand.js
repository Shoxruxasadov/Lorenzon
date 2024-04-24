import axios from "axios";
import { create } from "zustand";

export const useStore = create((set) => ({
    user: {},
    isVerifyToken: false,
    setVerifyToken: (is) => set(() => ({ isVerifyToken: is })),
    getUserFromToken: (token, router) => axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/auth/${token.id}`, { headers: { 'password': token.password } }).then(({ data }) => {
        set(() => ({ user: data }));
        set(() => ({ isVerifyToken: true }));
    }).catch(() => router.push('/')),
    isAdmin: false,
    verifyAdmin: (token, router, setLoading) => axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/auth/${token.id}`, { headers: { 'password': token.password } }).then(({ data }) => {
        if (data.role == 'admin') { set(() => ({ isAdmin: true })); setLoading(false) }
        else { router.push('/') }
    }).catch(() => router.push('/')),
    loading: false,
    setLoading: (is) => set(() => ({ loading: is }))
}));

export const useSearch = create((set) => ({
    search: "",
    setSearch: (text) => set(() => ({ search: text })),
}));

export const useAuthCreate = create((set) => ({
    page: 1,
    setPage: (number) => set(() => ({ page: number })),
    email: "",
    setEmail: (value) => set(() => ({ email: value })),
    password: "",
    setPassword: (value) => set(() => ({ password: value })),
    randomCode: "",
    setRandomCode: (value) => set(() => ({ randomCode: value })),
    name: "",
    setName: (value) => set(() => ({ name: value })),
    image: "",
    setImage: (value) => set(() => ({ image: value })),
}));

export const useMusic = create((set) => ({
    playPouse: false,
    setPlayPouse: (isPlaying) => set(() => ({ playPouse: isPlaying })),
    shuffle: false,
    setShuffle: (isShuffle) => set(() => ({ shuffle: isShuffle })),
    loop: false,
    setLoop: (isLoop) => set(() => ({ loop: isLoop })),
    volume: 100,
    setVolume: (volume) => set(() => ({ volume: volume })),

    render: false,
    setRender: (render) => set(() => ({ render: render })),
    readRender: false,
    setReadRender: (render) => set(() => ({ readRender: render })),
    musics: [],
    setMusics: (musics) => set(() => ({ musics: musics })),
    currentMusic: {},
    setCurrentMusic: (music) => set(() => ({ currentMusic: music })),

    read: `0:00`,
    setRead: (read) => set(() => ({ read: read })),
    duration: `0:00`,
    setDuration: (duration) => set(() => ({ duration: duration })),
    readTime: 0,
    setReadTime: (read) => set(() => ({ readTime: read })),
    durationTime: 0,
    setDurationTime: (duration) => set(() => ({ durationTime: duration })),
    percentage: 0,
    setPercentage: (percentage) => set(() => ({ percentage: percentage })),
}));

export const useHomeModels = create((set) => ({
    RECOMMENDED_SONGS: [],
    SET_RECOMMENDED_SONGS: (songs) => set(() => ({ RECOMMENDED_SONGS: songs })),
    RECENTLY_PLAYED: [],
    SET_RECENTLY_PLAYED: (songs) => set(() => ({ RECENTLY_PLAYED: songs })),
    YOUR_FAVORITE_SINGERS: [],
    SET_YOUR_FAVORITE_SINGERS: (singers) => set(() => ({ YOUR_FAVORITE_SINGERS: singers })),
    DISCOVER_PICK_SONGS: [],
    SET_DISCOVER_PICK_SONGS: (songs) => set(() => ({ DISCOVER_PICK_SONGS: songs })),
    POPULAR_SONGS: [],
    SET_POPULAR_SONGS: (songs) => set(() => ({ POPULAR_SONGS: songs })),
}));

export const useAnotherModels = create((set) => ({
    RECOMMENDED_SONGS: [],
    SET_RECOMMENDED_SONGS: (songs) => set(() => ({ RECOMMENDED_SONGS: songs })),
    RECENTLY_PLAYED: [],
    SET_RECENTLY_PLAYED: (songs) => set(() => ({ RECENTLY_PLAYED: songs })),
    YOUR_FAVORITE_SINGERS: [],
    SET_YOUR_FAVORITE_SINGERS: (singers) => set(() => ({ YOUR_FAVORITE_SINGERS: singers })),
    DISCOVER_PICK_SONGS: [],
    SET_DISCOVER_PICK_SONGS: (songs) => set(() => ({ DISCOVER_PICK_SONGS: songs })),
    POPULAR_SONGS: [],
    SET_POPULAR_SONGS: (songs) => set(() => ({ POPULAR_SONGS: songs })),
}));

export const useHomeDetails = create((set) => ({
    lyrics: false,
    setLyrics: (is) => set(() => ({ lyrics: is })),
    comment: false,
    setComment: (is) => set(() => ({ comment: is })),
    queue: false,
    setQueue: (is) => set(() => ({ queue: is })),
    fullScreen: false,
    setFullScreen: (is) => set(() => ({ fullScreen: is })),
}));

export const useContextMenu = create((set) => ({
    cursor: { x: 0, y: 0, },
    setCursor: (cursor) => set(() => ({ cursor: cursor })),
    isShow: false,
    setIsShow: (isShow) => set(() => ({ isShow: isShow })),
    isHover: false,
    setIsHover: (isHover) => set(() => ({ isHover: isHover })),
}));



