import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import i18next from "i18next";

import { HiSun, HiMoon } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import logo from "../../../images/Logo/logo.png";
import { useDispatch, useSelector } from "react-redux";

export default function Header() {
  const darkmode = useSelector((state) => state.utilityReducer.darkmode);
  const language = localStorage.getItem("lang");
  const [t, i18n] = useTranslation("global");
  const [lang, setLang] = useState(false);
  const dispatch = useDispatch();

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
                language == "en" ? { color: "#141414" } : { color: "#f1f1f1" }
              }
              className="en"
            >
              EN
            </li>
            <li
              onClick={() => langChanger("ru")}
              style={
                language == "ru" ? { color: "#141414" } : { color: "#f1f1f1" }
              }
              className="ru"
            >
              RU
            </li>
            <li
              onClick={() => langChanger("uz")}
              style={
                language == "uz" ? { color: "#141414" } : { color: "#f1f1f1" }
              }
              className="uz"
            >
              UZ
            </li>
          </ul>

          <button
            onClick={() => dispatch({ type: "SET_DARKMODE" })}
            className="darkmode"
          >
            <HiMoon
              className="dark"
              style={darkmode ? { left: "52%" } : { left: "-50%" }}
            />
            <HiSun
              className="light"
              style={darkmode ? { left: "150%" } : { left: "50%" }}
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
                      ? { color: "#141414" }
                      : { color: "#f1f1f1" }
                  }
                  className="en"
                >
                  EN
                </li>
                <li
                  onClick={() => langChanger("ru")}
                  style={
                    language == "ru"
                      ? { color: "#141414" }
                      : { color: "#f1f1f1" }
                  }
                  className="ru"
                >
                  RU
                </li>
                <li
                  onClick={() => langChanger("uz")}
                  style={
                    language == "uz"
                      ? { color: "#141414" }
                      : { color: "#f1f1f1" }
                  }
                  className="uz"
                >
                  UZ
                </li>
              </ul>
              <div
                onClick={() => dispatch({ type: "SET_DARKMODE" })}
                className="darkmode"
              >
                <HiMoon
                  className="dark"
                  style={darkmode ? { left: "52%" } : { left: "-50%" }}
                />
                <HiSun
                  className="light"
                  style={darkmode ? { left: "150%" } : { left: "50%" }}
                />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
