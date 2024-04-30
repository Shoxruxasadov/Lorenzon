import { useEffect, useState } from "react";
import Image from "next/image";
import HomeLayout from "../../layouts/home";
import { info } from "../../utils/toastify";

export default function Discover() {
    const [loadedImage, setLoadedImage] = useState(false)
    const [columnCount, setColumnCount] = useState(6);
    const covers = [
        {
            title: 'Music',
            image: '/discover/music.webp',
        },
        {
            title: 'Podcats',
            image: '/discover/podcasts.webp',
        },
        {
            title: 'Concerts',
            image: '/discover/concerts.webp',
        },
        {
            title: 'Made for you',
            image: '/discover/foryou.webp',
        },
        {
            title: 'New Releases',
            image: '/discover/releases.webp',
        },
        {
            title: 'Merch',
            image: '/discover/merch.webp',
        },
        {
            title: 'Pop',
            image: '/discover/pop.webp',
        },
        {
            title: 'Xip-Xop',
            image: '/discover/xipxop.webp',
        },
        {
            title: 'Mood',
            image: '/discover/mood.webp',
        },
        {
            title: 'Dance',
            image: '/discover/dance.webp',
        },
        {
            title: 'Charts',
            image: '/discover/charts.webp',
        },
        {
            title: 'Educational',
            image: '/discover/educational.webp',
        },
        {
            title: 'Documentary',
            image: '/discover/documentary.webp',
        },
        {
            title: 'Comedy',
            image: '/discover/comedy.webp',
        },
        {
            title: 'Gaming',
            image: '/discover/gaming.webp',
        },
        {
            title: 'Rock',
            image: '/discover/rock.webp',
        },
        {
            title: 'Indie',
            image: '/discover/indie.webp',
        },
        {
            title: 'Workout',
            image: '/discover/workout.webp',
        },
        {
            title: 'Trending',
            image: '/discover/trending.webp',
        },
        {
            title: 'K-pop',
            image: '/discover/kpop.webp',
        },
        {
            title: 'Chill',
            image: '/discover/chill.webp',
        },
        {
            title: 'Sleep',
            image: '/discover/sleep.webp',
        },
        {
            title: 'Party',
            image: '/discover/party.webp',
        },
        {
            title: 'Travel',
            image: '/discover/travel.webp',
        },
    ]

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
                    {covers.map((cover, index) => (
                        <div key={index} onClick={()=>info('Coming soon!')}>
                            <h4>{cover.title}</h4>
                            <Image
                                src={cover.image || "/other/unknown.music.webp"}
                                alt={cover.title}
                                width={200}
                                height={200}
                                placeholder="blur"
                                blurDataURL="/other/unknown.music.blur.webp"
                                className={`image ${loadedImage ? 'unblur' : ''}`}
                                onLoad={() => setLoadedImage(true)}
                            />
                        </div>
                    ))}
                </div>
            </article>
        </HomeLayout>
    )
}
