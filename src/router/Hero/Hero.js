import React, { useEffect, useState } from "react";
import Header from "../../components/Hero/Header/Header";
import Footer from "../../components/Hero/Footer/Footer";
import Main from "../../components/Hero/Main/Main";
import { Analytics } from '@vercel/analytics/react';

export default function Hero() {
  const [darkmode, setDarkmode] = useState(
    localStorage.getItem("theme") == "light" ? true : false
  );

  useEffect(() => {
    localStorage.setItem("theme", darkmode ? "light" : "dark");
    document
      .querySelector("body")
      .setAttribute("class", localStorage.getItem("theme"));
  }, [darkmode]);

  return (
    <div id="hero">
      <Header darkmode={darkmode} setDarkmode={setDarkmode} />
      <Main darkmode={darkmode} />
      <Footer darkmode={darkmode} />
      <<Analytics />
    </div>
  );
}