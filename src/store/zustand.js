import axios from "axios";
import { create } from "zustand";

export const useStore = create((set) => ({
    user: {},
    getUserFromToken: (token, router) => axios.post(`${process.env.NEXT_PUBLIC_SERVER_API}/auth/${token.id}`, { password: token.password }).then(({ data }) => set(() => ({ user: data[0] }))).catch(() => router.push('/'))
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
    musics: [],
    setMusics: (musics) => set(() => ({ musics: musics })),
    currentMusic: {},
    setCurrentMusic: (music) => set(() => ({ currentMusic: music })),
}));