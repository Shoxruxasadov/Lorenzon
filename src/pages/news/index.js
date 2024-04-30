import { useRouter } from "next/navigation";
import { useStore } from "../../store/zustand";
import HomeLayout from "../../layouts/home";

export default function News() {
    const { news } = useStore(state => state.user)
    const router = useRouter()

    return (
        <HomeLayout page="home-news" title="News">
            {news.length ? <ul className="list">
                {
                    news.slice().reverse().map(support => (
                        <li onClick={() => router.push(support.subject)}>
                            <img src={support.live} alt="live" />
                            <div className="title">
                                {support.type == 'follow' && <h3>{support.subject}</h3>}
                                <p>{support.message} <span>{support.createdAt.substring(0, 10)}</span></p>
                            </div>
                        </li>
                    ))
                }
            </ul> : <div className="no">
                <h2>You do not have any news yet</h2>
                <p>All news will appear here. Subscribe to favorite singers to stay up to date with the most interesting things.</p>
            </div>}
        </HomeLayout>
    )
}
