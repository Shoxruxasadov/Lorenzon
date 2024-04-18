import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";

import HomeLayout from "../../../../layouts/home";
import Banner from "../../../../layouts/banner";
import { useMusic } from "../../../../store/zustand";
import { usePathname } from "next/navigation";
import Loading from "../../../../components/loading/home";

export default function HomeSearchSongs() {
  const user = useStore(state => state.user);
  const [isLoading, setLoading] = useState(true)
  const render = useMusic((state) => state.render);
  const setRender = useMusic((state) => state.setRender);
  const [songs, setSongs] = useState([])

  const playPouse = useMusic((state) => state.playPouse);
  const setPlayPouse = useMusic((state) => state.setPlayPouse);
  const currentMusic = useMusic((state) => state.currentMusic);
  const setCurrentMusic = useMusic((state) => state.setCurrentMusic);
  const setReadTime = useMusic((state) => state.setReadTime);

  const [columnCount, setColumnCount] = useState(6);
  const [loadedImage, setLoadedImage] = useState(false)

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true)
    pathname && axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/search/songs/${pathname.split('/')[2]}`).then(({ data }) => setSongs(data)).finally(() => setLoading(false))

    const handleResize = () => {
      if (window.innerWidth >= 2330) {
        setColumnCount(10);
      }
      if (window.innerWidth >= 2130 && window.innerWidth < 2330) {
        setColumnCount(9);
      }
      if (window.innerWidth >= 1930 && window.innerWidth < 2130) {
        setColumnCount(8);
      }
      if (window.innerWidth >= 1730 && window.innerWidth < 1930) {
        setColumnCount(7);
      }
      if (window.innerWidth >= 1560 && window.innerWidth < 1730) {
        setColumnCount(6);
      }
      if (window.innerWidth >= 1400 && window.innerWidth < 1560) {
        setColumnCount(5);
      }
      if (window.innerWidth >= 1230 && window.innerWidth < 1400) {
        setColumnCount(4);
      }
      if (window.innerWidth >= 1024 && window.innerWidth < 1230) {
        setColumnCount(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pathname]);

  if (isLoading) return <Loading />
  return (
    <HomeLayout page="home-library" title="Searched Songs">
      <Banner src={"/other/space.ads.webp"} />
      <article>
        <header>
          <h2>Searched Songs</h2>
        </header>
        <div className="content" style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`, }} >
          {songs.map((item, index) => (
            <div className='card' key={index} >
              <div
                className="images"
                onClick={() => {
                  if (playPouse && (currentMusic.song == item.song)) {
                    setPlayPouse(false)
                  } else {
                    setPlayPouse(true)
                    setCurrentMusic(item)
                    setTimeout(() => setRender(!render), 10)
                    if (currentMusic.song != item.song) setReadTime(0)
                    axios.patch(`${process.env.NEXT_PUBLIC_SERVER_API}/users/song/${user._id}`, { id: item._id })
                  }
                }}>
                <svg
                  className={`pouse ${playPouse ? "active" : ""}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  fill="none"
                >
                  <circle cx="50" cy="50" r="50" fill="#6940EE" />
                  <rect
                    x="30"
                    y="30"
                    width="15"
                    height="40"
                    rx="5"
                    fill="#0D1219"
                  />
                  <rect
                    x="55"
                    y="30"
                    width="15"
                    height="40"
                    rx="5"
                    fill="#0D1219"
                  />
                </svg>
                <svg
                  className="play"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  fill="none"
                >
                  <circle cx="50" cy="50" r="50" fill="#6940EE" />
                  <path
                    d="M68.5 46.1699C71.8333 48.0944 71.8333 52.9056 68.5 54.8301L42.25 69.9856C38.9167 71.9101 34.75 69.5044 34.75 65.6554L34.75 35.3446C34.75 31.4956 38.9167 29.0899 42.25 31.0144L68.5 46.1699Z"
                    fill="#0D1219"
                  />
                </svg>
                <Image
                  src={item.image || "/other/unknown.music.webp"}
                  alt="image"
                  width={200}
                  height={200}
                  placeholder="blur"
                  blurDataURL="/other/unknown.music.blur.webp"
                  className={`image ${loadedImage ? 'unblur' : ''}`}
                  onLoadingComplete={() => setLoadedImage(true)}
                />
              </div>
              <div className="title">
                <h3>{item.name}</h3>
                <p>{item.singerName.map((n, i) => <span key={i} onClick={() => router.push(`/@${item.singerUsername[i]}`)}>{n + ", "}</span>)}</p>
              </div>
            </div>
          ))}
        </div>
      </article>
    </HomeLayout>
  )
}