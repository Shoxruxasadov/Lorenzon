import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Player from "../../components/Home/Player/Player"
import Sidebar from "../../components/Home/Sidebar/Sidebar";
import Main from "../../components/Home/Main/Main";
import Content from "../../components/Home/Content/Content";

export default function Home() {
  useEffect(() => document.getElementById("root").setAttribute("class", "home"), []);

  return (
    <>
      <Sidebar/>
      <Main/>
      <Content/>
      <Player/>
    </>
  );
}
