import axios from "axios";
import { create } from "zustand";

export const useStore = create((set) => ({
    user: {},
    isVerifyToken: false,
    setVerifyToken: (is) => set(() => ({ isVerifyToken: is })),
    getUserFromToken: (token, router) => axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/auth/${token.id}`, { headers: { 'password': token.password, 'secret': process.env.NEXT_PUBLIC_SECRET } }).then(({ data }) => {
        set(() => ({ user: data }));
        set(() => ({ isVerifyToken: true }));
    }).catch(() => router.push('/')),
    isAdmin: false,
    verifyAdmin: (token, router, setLoading) => axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/auth/${token.id}`, { headers: { 'password': token.password, 'secret': process.env.NEXT_PUBLIC_SECRET } }).then(({ data }) => {
        if (data.role == 'admin') { set(() => ({ isAdmin: true })); setLoading(false) }
        else { router.push('/') }
    }).catch(() => router.push('/')),
    loading: false,
    setLoading: (is) => set(() => ({ loading: is })),
    newsPath: '/home',
    setNewsPath: (path) => set(() => ({ newsPath: path })),
    about: {},
    setAbout: (userData) => set(() => ({ about: userData })),
    isOpenAbout: false,
    setOpenAbout: (is) => set(() => ({ isOpenAbout: is })),
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
    FAVORITE_SINGERS: [],
    SET_FAVORITE_SINGERS: (singers) => set(() => ({ FAVORITE_SINGERS: singers })),
    RECOMMENDED_ALBUMS: [],
    SET_RECOMMENDED_ALBUMS: (albums) => set(() => ({ RECOMMENDED_ALBUMS: albums })),
    RECOMMENDED_PLAYLISTS: [],
    SET_RECOMMENDED_PLAYLISTS: (playlists) => set(() => ({ RECOMMENDED_PLAYLISTS: playlists })),
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



