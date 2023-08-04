import React, { useEffect, useState } from "react";
import Header from "../../components/Hero/Header/Header";
import Footer from "../../components/Hero/Footer/Footer";
import Main from "../../components/Hero/Main/Main";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const confirm = useSelector((state) => state.confirmReducer.confirm);
  const navigate = useNavigate()
  const [darkmode, setDarkmode] = useState(
    localStorage.getItem("theme") == "light" ? true : false
  );

  useEffect(() => {
    localStorage.setItem("theme", darkmode ? "light" : "dark");
    document
      .querySelector("body")
      .setAttribute("class", localStorage.getItem("theme"));
  }, [darkmode]);

  useEffect(() =>{if(confirm)navigate("/home")}, []);

  return (
    <div id="hero">
      <Header darkmode={darkmode} setDarkmode={setDarkmode} />
      <Main darkmode={darkmode} />
      <Footer darkmode={darkmode} />
    </div>
  );
}
