import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import axios from "axios";

import HomeLayout from "../../layouts/home";
import Banner from "../../layouts/banner";
import { useMusic } from "../../store/zustand";

export default function HomeMain() {
  const playPouse = useMusic((state) => state.playPouse);
  const setPlayPouse = useMusic((state) => state.setPlayPouse);
  const musics = useMusic((state) => state.musics);
  const setMusics = useMusic((state) => state.setMusics);
  const currentMusic = useMusic((state) => state.currentMusic);
  const setCurrentMusic = useMusic((state) => state.setCurrentMusic);
  const cardRef = useRef(null);

  const [articleHeight, setArticleHeight] = useState(`280px`);
  const [columnCount, setColumnCount] = useState(5);

  // console.log({
  //   album: "METAMORPHOSIS",
  //   artist: "InterWorld",
  //   image: "",
  //   name: "METAMORPHOSIS",
  //   playlist: "Phonk",
  //   song: ""
  // });

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_FIREBASE_API}/musics.json`).then(({ data }) => setMusics(data))

    const handleResize = () => {
      setArticleHeight(cardRef.current && `${cardRef.current.offsetHeight + 45}px`)
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
  }, []);

  return (
    <HomeLayout page="home-main" title="Home">
      <Banner src={"/other/space.ads.png"} />

      <article style={{ height: articleHeight }}>
        <header>
          <h2>Jamp back in</h2>
          <Link href={"/home"}>Show all</Link>
        </header>
        <div
          className="content"
          style={{
            gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
          }}
        >
          {musics.map((item, index) => (
            <div
              className={`card ${currentMusic == item && playPouse ? "active" : ""}`}
              key={index}
              ref={cardRef}
              onClick={() => {
                setCurrentMusic(item)
                if (playPouse && (currentMusic == item)) {
                  setPlayPouse(false)
                } else {
                  setPlayPouse(true)
                }
              }}
            >
              <div className="images">
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
                <img className="image" src={item.image} alt="image" />
              </div>
              <div className="title">
                <h3>{item.name}</h3>
              </div>
            </div>
          ))}
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
        </div>
      </article>
    </HomeLayout>
  )
}