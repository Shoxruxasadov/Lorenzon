import HomeLayout from "../../layouts/home";
import { useEffect, useState } from "react";

export default function Discover() {
    const [columnCount, setColumnCount] = useState(6);

    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth >= 2330) setColumnCount(9);
          if (window.innerWidth >= 2130 && window.innerWidth < 2330) setColumnCount(8);
          if (window.innerWidth >= 1930 && window.innerWidth < 2130) setColumnCount(7);
          if (window.innerWidth >= 1730 && window.innerWidth < 1930) setColumnCount(6);
          if (window.innerWidth >= 1560 && window.innerWidth < 1730) setColumnCount(5);
          if (window.innerWidth >= 1400 && window.innerWidth < 1560) setColumnCount(4);
          if (window.innerWidth >= 1230 && window.innerWidth < 1400) setColumnCount(3);
          if (window.innerWidth >= 1024 && window.innerWidth < 1230) setColumnCount(2);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);

    return (
        <HomeLayout page="home-discover" title="Discover">
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
