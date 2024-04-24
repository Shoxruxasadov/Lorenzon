import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import Loading from "../../components/loading/home";
import Error from "../../components/other/error";
import UserLayout from "../../layouts/user";

export default function User() {
    const pathname = usePathname()

    const { data: user, isLoading, isError, isSuccess, refetch } = useQuery({
        queryKey: "user",
        queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/users/username/${pathname.substring(2)}`).then(({ data }) => data),
    })

    useEffect(() => {
        if (pathname) refetch()
    }, [pathname])

    console.log(user);

    if (isLoading) return <Loading />
    if (isError) return <Error />
    if (pathname.substring(1).startsWith("@") && isSuccess && user) return <UserLayout user={user} />
    return <Error />
}

