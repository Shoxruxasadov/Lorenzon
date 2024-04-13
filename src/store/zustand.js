import axios from "axios";
import { create } from "zustand";

export const useStore = create((set) => ({
    user: {},
    getUserFromToken: (token, router) => axios.post(`${process.env.NEXT_PUBLIC_SERVER_API}/auth/${token.id}`, { password: token.password }).then(({ data }) => set(() => ({ user: data[0] }))).catch(() => router.push('/')),
    isAdmin: false,
    verifyAdmin: (token, router, setLoading) => axios.post(`${process.env.NEXT_PUBLIC_SERVER_API}/auth/${token.id}`, { password: token.password }).then(({ data }) => {
        if (data[0].role == 'admin') { set(() => ({ isAdmin: true })); setLoading(false) }
          else { router.push('/') }
    }).catch(() => router.push('/'))
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