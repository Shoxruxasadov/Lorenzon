import { useState } from 'react';
import Image from 'next/image'
import axios from 'axios';

import { useMusic, useStore } from '../../../../store/zustand';
import GetAudioDuration from '../../../../hooks/useDuration';
import HomeLayout from '../../../../layouts/home'
import Banner from '../../../../layouts/banner'
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import Loading from '../../../../components/loading/home';
import Error from '../../../../components/other/error';

export default function UserLastedSongs() {
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
    if (isSuccess) return (
        <HomeLayout page="home-user-lasted-songs" title={user.name}>
            <h1>Top tracks of this month</h1>
            <p>Visible only to you</p>
        </HomeLayout>
    )
    return <Error />
}
