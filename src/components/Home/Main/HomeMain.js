import React, { useEffect, useRef, useState } from "react";
import artist from "../../../images/Home/lxst.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function HomeMain() {
  const musics = useSelector((state) => state.musicsReducer.musics);
  const music = useSelector((state) => state.utilityReducer.currentMusic);
  const pouse = useSelector((state) => state.utilityReducer.pouse);
  const follow = useSelector((state) => state.utilityReducer.follow);
  const media = useSelector((state) => state.utilityReducer.media);
  const [columnCount, setColumnCount] = useState(5);
  const dispatch = useDispatch();

  function isMobile() {
    const regex =
      /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  }

  useEffect(() => {
    const handleResize = () => {
      if (media == "full") {
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
      } else if (media == "desktop") {
        if (window.innerWidth >= 2060) {
          setColumnCount(9);
        }
        if (window.innerWidth >= 1860 && window.innerWidth < 2060) {
          setColumnCount(8);
        }
        if (window.innerWidth >= 1660 && window.innerWidth < 1860) {
          setColumnCount(7);
        }
        if (window.innerWidth >= 1460 && window.innerWidth < 1660) {
          setColumnCount(6);
        }
        if (window.innerWidth >= 1260 && window.innerWidth < 1460) {
          setColumnCount(5);
        }
      }

      if (isMobile()) {
        dispatch({ type: "SET_MEDIA", payload: "mobile" });
        document.querySelector("body").classList.add("mobile-web-player");
        document.querySelector("body").classList.remove("desktop-web-player");
      } else {
        document.querySelector("body").classList.add("desktop-web-player");
        document.querySelector("body").classList.remove("mobile-web-player");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [media]);

  console.log(musics);

  return (
    <main
      className={media != "full" ? "homemain active" : "homemain non-active"}
    >
      <div className="banner">
        <div className="title">
          <div className="info">
            <div className="name">
              <div className="verified">
                <div className="verify">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M9.53359 0.416756C9.79923 0.179395 10.2008 0.179395 10.4664 0.416756L12.8406 2.53818C12.9588 2.64382 13.1094 2.7062 13.2677 2.7151L16.4466 2.89382C16.8023 2.91382 17.0862 3.19775 17.1062 3.55342L17.2849 6.7323C17.2938 6.8906 17.3562 7.04118 17.4618 7.15941L19.5832 9.53359C19.8206 9.79923 19.8206 10.2008 19.5832 10.4664L17.4618 12.8406C17.3562 12.9588 17.2938 13.1094 17.2849 13.2677L17.1062 16.4466C17.0862 16.8023 16.8023 17.0862 16.4466 17.1062L13.2677 17.2849C13.1094 17.2938 12.9588 17.3562 12.8406 17.4618L10.4664 19.5832C10.2008 19.8206 9.79923 19.8206 9.53359 19.5832L7.15941 17.4618C7.04118 17.3562 6.8906 17.2938 6.7323 17.2849L3.55342 17.1062C3.19775 17.0862 2.91382 16.8023 2.89382 16.4466L2.7151 13.2677C2.7062 13.1094 2.64382 12.9588 2.53818 12.8406L0.416756 10.4664C0.179395 10.2008 0.179395 9.79923 0.416756 9.53359L2.53818 7.15941C2.64382 7.04118 2.7062 6.8906 2.7151 6.7323L2.89382 3.55342C2.91382 3.19775 3.19775 2.91382 3.55342 2.89382L6.7323 2.7151C6.8906 2.7062 7.04118 2.64382 7.15941 2.53818L9.53359 0.416756Z"
                      fill="#6940ee"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <path
                      d="M2.08334 5.41666L3.75001 7.08332L7.91668 2.91666"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p>Verified Artist</p>
              </div>
              <h4>LXST CXNTURY</h4>
            </div>
            <div className="listener">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  opacity="0.4"
                  d="M2.75 18.65C2.34 18.65 2 18.31 2 17.9V12.2C1.95 9.49 2.96 6.93 4.84 5.01C6.72 3.1 9.24 2.05 11.95 2.05C17.49 2.05 22 6.56 22 12.1V17.8C22 18.21 21.66 18.55 21.25 18.55C20.84 18.55 20.5 18.21 20.5 17.8V12.1C20.5 7.39 16.67 3.55 11.95 3.55C9.64 3.55 7.5 4.44 5.91 6.06C4.31 7.69 3.46 9.86 3.5 12.18V17.89C3.5 18.31 3.17 18.65 2.75 18.65Z"
                  fill="white"
                />
                <path
                  d="M5.94 12.45H5.81C3.71 12.45 2 14.16 2 16.26V18.14C2 20.24 3.71 21.95 5.81 21.95H5.94C8.04 21.95 9.75 20.24 9.75 18.14V16.26C9.75 14.16 8.04 12.45 5.94 12.45Z"
                  fill="white"
                />
                <path
                  d="M18.19 12.45H18.06C15.96 12.45 14.25 14.16 14.25 16.26V18.14C14.25 20.24 15.96 21.95 18.06 21.95H18.19C20.29 21.95 22 20.24 22 18.14V16.26C22 14.16 20.29 12.45 18.19 12.45Z"
                  fill="white"
                />
              </svg>
              <p>
                <b>1,959,498</b> monthly listeners
              </p>
            </div>
          </div>
          <div className="playing">
            <button
              className="play"
              onClick={() => {
                dispatch({ type: "SET_POUSE", payload: false });
                setTimeout(
                  () =>
                    dispatch({
                      type: "SET_CURRENT_MUSIC",
                      payload: {
                        album: "ODIUM",
                        artist: "LXST CXNTURY",
                        id: 1693330726480,
                        image:
                          "https://savemusic.me/uploads/cover/artist_webp/03e618308e87c40c6c03900f12f47c2b.webp",
                        name: "ODIUM",
                        playlist: "Phonk",
                        song: "https://firebasestorage.googleapis.com/v0/b/lorezoz.appspot.com/o/songs%2FODIUM.mp3?alt=media&token=cd9d41c8-a91d-4d79-bdeb-eac59fe8d83c",
                      },
                    }),
                  100
                );
              }}
            >
              <span>Play</span>
            </button>
            <button
              className="follow"
              onClick={() => dispatch({ type: "SET_FOLLOW" })}
            >
              {follow ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M4.16666 10.8333L7.49999 14.1667L15.8333 5.83333"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Following</span>
                </>
              ) : (
                <>
                  <span>Follow</span>
                </>
              )}
            </button>
          </div>
        </div>
        <div className="artist">
          <img src={artist} alt="S3BZS" />
        </div>
      </div>

      <article>
        <header>
          <h2>Jamp back in</h2>
          <Link>Show all</Link>
        </header>
        <div
          className="content"
          style={{
            gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
          }}
        >
          {musics.map((item, index) => (
            <div
              className={`card ${music == item && pouse ? "active" : ""}`}
              key={index}
              onClick={() => {
                if (music != item) {
                  dispatch({ type: "SET_POUSE", payload: false });
                }
                setTimeout(() => {
                  dispatch({ type: "SET_CURRENT_MUSIC", payload: item });
                  // dispatch({ type: "SET_POUSE", payload: !pouse })
                }, 100);

                if (media == "mobile") {
                }
              }}
            >
              <div className="images">
                <svg
                  className={`pouse ${pouse ? "active" : ""}`}
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
                <p>{item.artist}</p>
              </div>
            </div>
          ))}
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
        </div>
      </article>

      <article>
        <header>
          <h2>Recentky played</h2>
          <Link>Show all</Link>
        </header>
        <div
          className="content"
          style={{
            gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
          }}
        >
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
        </div>
      </article>

      <article>
        <header>
          <h2>Recommended</h2>

          <Link>Show all</Link>
        </header>
        <div
          className="content"
          style={{
            gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
          }}
        >
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
        </div>
      </article>
    </main>
  );
}
