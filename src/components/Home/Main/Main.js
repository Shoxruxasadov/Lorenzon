import React, { useEffect, useRef, useState } from "react";
import artist from "../../../images/Home/lxst.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Main() {
  const contentMusic = useSelector(
    (state) => state.utilityReducer.contentMusic
  );
  const [columnCount, setColumnCount] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      if (!contentMusic) {
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
        // if (window.innerWidth >= 930 && window.innerWidth < 1130) {
        //   setColumnCount(2);
        // }
        // if (window.innerWidth < 930) {
        //   setColumnCount(1);
        // }
      } else {
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
        if (window.innerWidth >= 1060 && window.innerWidth < 1260) {
          setColumnCount(4);
        }
        if (window.innerWidth >= 860 && window.innerWidth < 1060) {
          setColumnCount(3);
        }
        // if (window.innerWidth >= 660 && window.innerWidth < 860) {
        //   setColumnCount(2);
        // }
        // if (window.innerWidth < 660) {
        //   setColumnCount(1);
        // }
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [contentMusic]);

  return (
    <main className={contentMusic ? "active" : "non-active"}>
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
            <button className="play">
              <span>Play</span>
            </button>
            <button className="follow">
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
    </main>
  );
}
