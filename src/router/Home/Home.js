import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Player from "../../components/Home/Player/Player";
import Sidebar from "../../components/Home/Sidebar/Sidebar";
import Content from "../../components/Home/Content/Content";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();

  function isMobile() {
    const regex =
      /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  }

  useEffect(() => {
    document.getElementById("root").setAttribute("class", "home");
    dispatch({ type: "GET_ARTISTS" });
    dispatch({ type: "GET_PLAYLISTS" });
    dispatch({ type: "GET_ALBUMS" });
    dispatch({ type: "GET_MUSICS" });

    if (isMobile()) {
      dispatch({ type: "SET_MEDIA", payload: "mobile" });
      document.querySelector("body").classList.add("mobile-web-player");
      document.querySelector("body").classList.remove("desktop-web-player");
    } else {
      dispatch({
        type: "SET_MEDIA",
        payload: localStorage.getItem("media") == "full" ? "full" : "desktop",
      });
      document.querySelector("body").classList.add("desktop-web-player");
      document.querySelector("body").classList.remove("mobile-web-player");
    }
  }, []);

  console.log();

  return (
    <>
      {isMobile() ? (
        <>
          <Outlet />
          <Player />
          <Sidebar />
        </>
      ) : (
        <>
          <Sidebar />
          <Outlet />
          <Content />
          <Player />
        </>
      )}
    </>
  );
}
