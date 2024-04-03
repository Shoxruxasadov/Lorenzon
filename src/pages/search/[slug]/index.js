import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import HomeLayout from "../../../layouts/home";

export default function HomeSearching() {
    const [columnCount, setColumnCount] = useState(5);
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 2330) {
                setColumnCount(9);
            }
            if (window.innerWidth >= 2130 && window.innerWidth < 2330) {
                setColumnCount(8);
            }
            if (window.innerWidth >= 1930 && window.innerWidth < 2130) {
                setColumnCount(7);
            }
            if (window.innerWidth >= 1730 && window.innerWidth < 1930) {
                setColumnCount(6);
            }
            if (window.innerWidth >= 1530 && window.innerWidth < 1730) {
                setColumnCount(5);
            }
            if (window.innerWidth >= 1330 && window.innerWidth < 1530) {
                setColumnCount(4);
            }
            if (window.innerWidth >= 1130 && window.innerWidth < 1340) {
                setColumnCount(3);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);



    return (
        <HomeLayout page="home-search" title="Serach...">
            <div className="top">
                <article>
                    <header>
                        <h1>Top Result</h1>
                    </header>
                    <div className="content" style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`, }}>
                        <div></div>
                    </div>
                </article>
                <article>
                    <header>
                        <h1>Songs</h1>
                    </header>
                    <div className="content" style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`, }}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </article>
            </div>
            <article>
                <header>
                    <h1>Other Songs</h1>
                </header>
                <div className="content" style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`, }}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </article>
            <article>
                <header>
                    <h1>Artists</h1>
                </header>
                <div className="content" style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`, }}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </article>
            <article>
                <header>
                    <h1>Albums</h1>
                </header>
                <div className="content" style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`, }}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </article>
            <article>
                <header>
                    <h1>Playlists</h1>
                </header>
                <div className="content" style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`, }}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </article>
            <article>
                <header>
                    <h1>Podcasts</h1>
                </header>
                <div className="content" style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`, }}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </article>
            <article>
                <header>
                    <h1>Profiles</h1>
                </header>
                <div className="content" style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`, }}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </article>
            <article>
                <header>
                    <h1>Episodes</h1>
                </header>
                <div className="content" style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`, }}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </article>
        </HomeLayout>
    )
}
