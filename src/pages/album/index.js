import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "../../components/loading/home";

export default function HomeAlbum() {
    const router = useRouter()
    useEffect(() => router.push('/home'), []);
    return <Loading/>
}
