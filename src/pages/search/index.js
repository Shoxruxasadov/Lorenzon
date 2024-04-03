import HomeLayout from "../../layouts/home";
import { useEffect, useState } from "react";

export default function HomeSearch() {
    const [columnCount, setColumnCount] = useState(5);

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
        <HomeLayout page="home-search" title="Serach">
            <article>
                <header>
                    <h2>Browse all</h2>
                </header>
                <div className="content" style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`, }} >
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
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
