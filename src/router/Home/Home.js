import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Player from "../../components/Home/Player/Player";
import Sidebar from "../../components/Home/Sidebar/Sidebar";
import Content from "../../components/Home/Content/Content";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    document.getElementById("root").setAttribute("class", "home");
    dispatch({ type: "GET_ARTISTS" });
    dispatch({ type: "GET_PLAYLISTS" });
    dispatch({ type: "GET_ALBUMS" });
    dispatch({ type: "GET_MUSICS" });
  }, []);

  return (
    <>
      <Sidebar />
      <Outlet />
      <Content />
      <Player />
    </>
  );
}
