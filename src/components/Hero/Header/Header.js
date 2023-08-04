import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import i18next from "i18next";

import { HiSun, HiMoon } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import logo from "../../../images/Logo/icon.png";

export default function Header({ darkmode, setDarkmode }) {
  const language = localStorage.getItem("lang");
  const [t, i18n] = useTranslation("global");
  const [lang, setLang] = useState(false);

  const handleChangeLanguage = (lang) => {
    i18next.changeLanguage(lang);
  };

  useEffect(() => {
    handleChangeLanguage(language);
    document.querySelector("html").setAttribute("lang", language || "en");
  }, [lang]);

  function langChanger(lan) {
    localStorage.setItem("lang", lan);
    setLang(!lang);
  }

  return (
    <header>
      <div className="container">
        <Link to={"/"} className="logo">
          <img src={logo} />
          <h1>Lorenzon</h1>
        </Link>
        <nav className="navbar">
          <Link className="login" to={"/login"}>
            {t("landing.header.login")}
          </Link>
          <Link className="register" to={"/register"}>
            {t("landing.header.register")}
          </Link>

          <ul className="lang">
            <span>{language || "EN"}</span>
            <li
              onClick={() => langChanger("en")}
              style={
                language == "en"
                  ? { color: "#010101" }
                  : { color: "#676" }
              }
              className="en"
            >
              EN
            </li>
            <li
              onClick={() => langChanger("ru")}
              style={
                language == "ru" ? { color: "#010101" } : { color: "#676" }
              }
              className="ru"
            >
              RU
            </li>
            <li
              onClick={() => langChanger("uz")}
              style={
                language == "uz" ? { color: "#010101" } : { color: "#676" }
              }
              className="uz"
            >
              UZ
            </li>
          </ul>

          <button onClick={() => setDarkmode(!darkmode)} className="darkmode">
            <HiMoon
              className="dark"
              style={darkmode ? { left: "-50%" } : { left: "52%" }}
            />
            <HiSun
              className="light"
              style={darkmode ? { left: "50%" } : { left: "150%" }}
            />
          </button>
        </nav>
        <div className="menu">
          <div
            onClick={() =>
              document.querySelector(".menu").classList.toggle("active")
            }
            className="toggle"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <nav className="nav-mini">
            <Link className="login" to={"/login"}>
              {t("landing.header.login")}
            </Link>
            <Link className="register" to={"/register"}>
              {t("landing.header.register")}
            </Link>
            <div className="langDarkMode">
              <ul className="lang">
              <li
              onClick={() => langChanger("en")}
              style={
                language == "en"
                  ? { color: "#010101" }
                  : { color: "#676" }
              }
              className="en"
            >
              EN
            </li>
            <li
              onClick={() => langChanger("ru")}
              style={
                language == "ru" ? { color: "#010101" } : { color: "#676" }
              }
              className="ru"
            >
              RU
            </li>
            <li
              onClick={() => langChanger("uz")}
              style={
                language == "uz" ? { color: "#010101" } : { color: "#676" }
              }
              className="uz"
            >
              UZ
            </li>
              </ul>
              <div onClick={() => setDarkmode(!darkmode)} className="darkmode">
                <HiMoon
                  className="dark"
                  style={darkmode ? { left: "-50%" } : { left: "52%" }}
                />
                <HiSun
                  className="light"
                  style={darkmode ? { left: "50%" } : { left: "150%" }}
                />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
