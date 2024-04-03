import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";

import Error from "../../components/other/error";
import Loading from "../../components/loading/home";
import UserLayout from "../../layouts/user";

export default function User() {
    const pathname = usePathname()
    const [user, setUser] = useState({})
    const [isLoading, setLoading] = useState(true)
    const username = pathname && pathname.substring(2)

    const getUser = async () => axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/users/username/${username}`).then(({ data }) => setUser(data[0])).finally(() => setLoading(false));

    useEffect(() => {
        if (pathname) getUser()
    }, [username])

    if (isLoading) return <Loading />
    if (!user) return <Error />
    if (pathname.substring(1).startsWith("@")) return <UserLayout user={user}/>
    return <Error />
}

