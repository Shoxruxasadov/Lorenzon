import axios from "axios";
import { useEffect, useState } from "react";
import { TbLoaderQuarter } from "react-icons/tb";

export function GetSingerItem({ singerId }) {
    const [singer, setSinger] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/users/${singerId}`).then(({ data }) => setSinger(data.name))
    }, [singerId]);

    return <>{singer || <TbLoaderQuarter />}</>;
}
