import React, { useEffect, useRef, useState } from "react";
import artist from "../../../images/Home/lxst.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function HomeSearch() {
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

  return (
    <>
      {isMobile() ? (
        <main>Search Page</main>
      ) : (
        <main
          className={
            media != "full" ? "homesearch active" : "homesearch non-active"
          }
        >
          <article>
            <header>
              <h2>Browse all</h2>
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
        </main>
      )}
    </>
  );
}
