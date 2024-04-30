import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

import { useStore } from "../../../store/zustand";
import Loading from "../../../components/loading/home";
import Error from "../../../components/other/error";
import HomeLayout from "../../../layouts/home";

export default function Followers() {
    const [loadedImage, setLoadedImage] = useState(false)
    const [columnCount, setColumnCount] = useState(6);
    const user = useStore(state => state.user)
    const pathname = usePathname()
    const router = useRouter()

    const { data: followers, isLoading, isError, isSuccess, refetch } = useQuery({
        queryKey: ['followers'],
        queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/users/followers/${pathname.split('/')[1].slice(1)}`).then(({ data }) => data),
    })

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 2330) setColumnCount(10);
            if (window.innerWidth >= 2130 && window.innerWidth < 2330) setColumnCount(9);
            if (window.innerWidth >= 1930 && window.innerWidth < 2130) setColumnCount(8);
            if (window.innerWidth >= 1730 && window.innerWidth < 1930) setColumnCount(7);
            if (window.innerWidth >= 1560 && window.innerWidth < 1730) setColumnCount(6);
            if (window.innerWidth >= 1400 && window.innerWidth < 1560) setColumnCount(5);
            if (window.innerWidth >= 1230 && window.innerWidth < 1400) setColumnCount(4);
            if (window.innerWidth >= 1024 && window.innerWidth < 1230) setColumnCount(3);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (isLoading) return <Loading />;
    if (isSuccess) return (
        <HomeLayout page="home-follow" title={user.name}>
            {followers.length ? <div className="content" style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`, }}>
                {followers.map(user => (
                    <div key={user._id} className='card' onClick={() => router.push(`/@${user.username}`)}>
                        <div className="images">
                            <Image
                                src={user.image || "/other/unknown.user.webp"}
                                alt="image"
                                width={200}
                                height={200}
                                placeholder="blur"
                                blurDataURL="/other/unknown.user.blur.webp"
                                className={`image ${loadedImage ? 'unblur' : ''}`}
                                onLoad={() => setLoadedImage(true)}
                                style={{ borderRadius: "50%" }}
                            />
                        </div>
                        <div className="title">
                            <h2>{user.name}</h2>
                            <p>{user.role == 'singer' ? 'Singer' : 'Profile'}</p>
                        </div>
                    </div>
                ))}
            </div> : <div className="no">
                <h2>Followers are not available yet</h2>
                <p>Keep making content, you will surely get more followers.</p>
            </div>}
        </HomeLayout>
    )
    return <Error />
}
