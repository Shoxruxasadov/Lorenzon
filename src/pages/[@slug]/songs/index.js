import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import Loading from '../../../components/loading/home';
import Error from '../../../components/other/error';
import HomeLayout from '../../../layouts/home'

export default function UserSongs() {
    const pathname = usePathname()

    const { data: user, isLoading, isError, isSuccess, refetch } = useQuery({
        queryKey: ['userSongs'],
        queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/users/username/${pathname.split('/')[1].substring(1)}`, { headers: { 'secret': process.env.NEXT_PUBLIC_SECRET } }).then(({ data }) => data),
    })

    if (isLoading) return <Loading />;
    if (isSuccess && user.role == 'singer') return (
        <HomeLayout page="home-user-songs" title={user.name}>
            <h1>Songs</h1>
        </HomeLayout>
    )
    return <Error />
}
