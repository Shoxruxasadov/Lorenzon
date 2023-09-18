import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Player from "../../components/Home/Player/Player";
import Sidebar from "../../components/Home/Sidebar/Sidebar";
import Content from "../../components/Home/Content/Content";

export default function Home() {
  useEffect(
    () => document.getElementById("root").setAttribute("class", "home"),
    []
  );

  return (
    <>
      <Sidebar />
      <Outlet />
      <Content />
      <Player />
    </>
  );
}
