import React, { useEffect } from "react";
import Header from "../../components/Hero/Header/Header";
import Footer from "../../components/Hero/Footer/Footer";
import Main from "../../components/Hero/Main/Main";

export default function Hero() {
  useEffect(() => document.getElementById("root").setAttribute("class", "hero"), []);

  return (
    <>
      <Header />
      <Main />
      {/* <Footer /> */}
    </>
  );
}
