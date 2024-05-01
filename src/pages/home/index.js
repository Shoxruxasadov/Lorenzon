import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

import { useContextMenu, useHomeModels, useMusic, useStore } from "../../store/zustand";
import HomeLayout from "../../layouts/home";
import Banner from "../../layouts/banner";
import Loading from "../../components/loading/home";

export default function HomeMain() {
  const user = useStore((state) => state.user);
  const render = useMusic((state) => state.render);
  const setRender = useMusic((state) => state.setRender);

  const playPouse = useMusic((state) => state.playPouse);
  const setPlayPouse = useMusic((state) => state.setPlayPouse);
  const setMusics = useMusic((state) => state.setMusics);
  const currentSong = useMusic((state) => state.currentMusic);
  const setCurrentSong = useMusic((state) => state.setCurrentMusic);
  const setReadTime = useMusic((state) => state.setReadTime);

  const RECOMMENDED_SONGS = useHomeModels((state) => state.RECOMMENDED_SONGS);
  const FAVORITE_SINGERS = useHomeModels((state) => state.FAVORITE_SINGERS);
  const RECOMMENDED_ALBUMS = useHomeModels((state) => state.RECOMMENDED_ALBUMS);
  const RECOMMENDED_PLAYLISTS = useHomeModels((state) => state.RECOMMENDED_PLAYLISTS);

  const setCursor = useContextMenu((state) => state.setCursor);
  const setIsShow = useContextMenu((state) => state.setIsShow);
  const setIsHover = useContextMenu((state) => state.setIsHover);

  const [loadedImage, setLoadedImage] = useState(false)
  const [columnCount, setColumnCount] = useState(6);
  const router = useRouter();

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

  const onMouseMove = (e) => {
    let x = e.clientX;
    let y = e.clientY;
    return { x, y }
  };

  if (RECOMMENDED_SONGS.length > 0 || FAVORITE_SINGERS.length > 0 || RECOMMENDED_ALBUMS.length > 0 || RECOMMENDED_PLAYLISTS.length > 0) return (
    <HomeLayout page="home-main" title="Home">
      <Banner src={"/other/space.ads.webp"} />

      <article>
        <header>
          <h2>Recommended songs</h2>
          <Link href={"/songs"}>Show all</Link>
        </header>
        <div
          className="content"
          style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`, }}
        >
          {RECOMMENDED_SONGS.slice(0, columnCount).map((item, index) => (
            <div key={index}
              className={`card ${currentSong.song == item.song && playPouse ? "active" : ""}`}
              onContextMenu={(e) => {
                setIsShow(item)
                setCursor(onMouseMove(e))
              }}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              onMouseMove={onMouseMove}
            >
              <div
                className="images"
                onClick={() => {
                  if (playPouse && (currentSong.song == item.song)) {
                    setPlayPouse(false)
                  } else {
                    setMusics(RECOMMENDED_SONGS);
                    setPlayPouse(true)
                    setCurrentSong(item)
                    setTimeout(() => setRender(!render), 10)
                    if (currentSong.song != item.song) setReadTime(0)
                    axios.patch(`${process.env.NEXT_PUBLIC_SERVER_API}/users/song/${user._id}`, { id: item._id }, { headers: { 'secret': process.env.NEXT_PUBLIC_SECRET } })
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
                  onLoad={() => setLoadedImage(true)}
                />
              </div>
              <div className="title">
                <h3 onClick={() => router.push(`/album/${item.album}`)}>{item.name}</h3>
                <p>{item.singerName.map((n, i) => <span key={i} onClick={() => router.push(`/@${item.singerUsername[i]}`)}>{item.singerName.length == i + 1 ? n : n + ', '}</span>)}</p>
              </div>
            </div>
          ))}
        </div>
      </article>

      <article>
        <header>
          <h2>Favorite singers</h2>
          <Link href={"/singers"}>Show all</Link>
        </header>
        <div className="content" style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`, }} >
          {FAVORITE_SINGERS.slice(0, columnCount).map((item, index) => (
            <div key={index}
              className='card'
              onClick={() => router.push(`/@${item.username}`)}
            >
              <div className="images">
                <Image
                  src={item.image || "/other/unknown.user.webp"}
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
                <h2>{item.name}</h2>
                <p>Singer</p>
              </div>
            </div>
          ))}
        </div>
      </article>

      {user.recently && user.recently.length > 0 && <article>
        <header>
          <h2>Recently Played</h2>
          <Link href={"/recently"}>Show all</Link>
        </header>
        <div
          className="content"
          style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`, }}
        >
          {user.recently.slice(0, columnCount).map((item, index) => (
            <div key={index}
              className={`card ${currentSong.song == item.song && playPouse ? "active" : ""}`}
              onContextMenu={(e) => {
                setIsShow(item)
                setCursor(onMouseMove(e))
              }}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              onMouseMove={onMouseMove}
            >
              <div
                className="images"
                onClick={() => {
                  if (playPouse && (currentSong.song == item.song)) {
                    setPlayPouse(false)
                  } else {
                    setMusics(user.recently);
                    setPlayPouse(true)
                    setCurrentSong(item)
                    setTimeout(() => setRender(!render), 10)
                    if (currentSong.song != item.song) setReadTime(0)
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
                  onLoad={() => setLoadedImage(true)}
                />
              </div>
              <div className="title">
                <h3 onClick={() => router.push(`/album/${item.album}`)}>{item.name}</h3>
                <p>{item.singerName.map((n, i) => <span key={i} onClick={() => router.push(`/@${item.singerUsername[i]}`)}>{item.singerName.length == i + 1 ? n : n + ', '}</span>)}</p>
              </div>
            </div>
          ))}
        </div>
      </article>}

      <article>
        <header>
          <h2>Recommended Albums</h2>
          <Link href={"/albums"}>Show all</Link>
        </header>
        <div className="content" style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`, }} >
          {RECOMMENDED_ALBUMS.slice(0, columnCount).map((item, index) => (
            <div key={index}
              className='card'
              onClick={() => router.push(`/album/${item._id}`)}
            >
              <div className="images">
                <Image
                  src={item.image || "/other/unknown.music.webp"}
                  alt="image"
                  width={200}
                  height={200}
                  placeholder="blur"
                  blurDataURL="/other/unknown.music.blur.webp"
                  className={`image ${loadedImage ? 'unblur' : ''}`}
                  onLoad={() => setLoadedImage(true)}
                />
              </div>
              <div className="title">
                <h2>{item.name}</h2>
                <p>Album</p>
              </div>
            </div>
          ))}
        </div>
      </article>

      <article>
        <header>
          <h2>Recommended Playlists</h2>
          <Link href={"/playlists"}>Show all</Link>
        </header>
        <div className="content" style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`, }} >
          {RECOMMENDED_PLAYLISTS.slice(0, columnCount).map((item, index) => (
            <div key={index}
              className='card'
              onClick={() => router.push(`/playlist/${item._id}`)}
            >
              <div className="images">
                <Image
                  src={item.image || "/other/unknown.music.webp"}
                  alt="image"
                  width={200}
                  height={200}
                  placeholder="blur"
                  blurDataURL="/other/unknown.music.blur.webp"
                  className={`image ${loadedImage ? 'unblur' : ''}`}
                  onLoad={() => setLoadedImage(true)}
                />
              </div>
              <div className="title">
                <h2>{item.name}</h2>
                <p>Playlists • {item.creatorName}</p>
              </div>
            </div>
          ))}
        </div>
      </article>
    </HomeLayout>
  )
  return <Loading />
}