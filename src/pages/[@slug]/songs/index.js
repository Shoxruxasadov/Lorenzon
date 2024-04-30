import { useState } from 'react';
import Image from 'next/image'
import axios from 'axios';

import { useMusic, useStore } from '../../../store/zustand';
import GetAudioDuration from '../../../hooks/useDuration';
import HomeLayout from '../../../layouts/home'
import Banner from '../../../layouts/banner'
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/loading/home';
import Error from '../../../components/other/error';

export default function UserSongs() {
    const myuser = useStore((state) => state.user);
    const render = useMusic((state) => state.render);
    const setRender = useMusic((state) => state.setRender);
    const setReadTime = useMusic((state) => state.setReadTime);
    const playPouse = useMusic((state) => state.playPouse);
    const setPlayPouse = useMusic((state) => state.setPlayPouse);
    const queue = useMusic(state => state.musics)
    const setQueue = useMusic((state) => state.setMusics);
    const currentSong = useMusic((state) => state.currentMusic);
    const setCurrentSong = useMusic((state) => state.setCurrentMusic);
    const [loadedImage, setLoadedImage] = useState(false);
    const pathname = usePathname()

    const { data: user, isLoading, isError, isSuccess, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/users/username/${pathname.split('/')[1].substring(1)}`).then(({ data }) => data),
    })

    if (isLoading) return <Loading />;
    if (isSuccess && user.role == 'singer') return (
        <HomeLayout page="home-user-songs" title={user.name}>
            <h1>Songs</h1>
        </HomeLayout>
    )
    return <Error />
}
