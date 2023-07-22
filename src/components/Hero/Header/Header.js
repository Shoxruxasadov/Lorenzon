import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import i18next from "i18next";

import { HiSun, HiMoon } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import logo from "../../../images/icon.png";

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

  return (
    <header>
      <div className="container">
        <Link to={"/"} className="logo">
          <img src={logo} />
          <h1>Lorenzon</h1>
        </Link>
        <nav>
          <Link className="login" to={"/login"}>
            {t("landing.header.login")}
          </Link>
          <Link className="register" to={"/register"}>
            {t("landing.header.register")}
          </Link>

          <ul className="lang">
            <span>{language || "EN"}</span>
            {language == null && (
              <>
                <li className="en">EN</li>
                <li
                  onClick={() => {
                    localStorage.setItem("lang", "ru");
                    setLang(!lang);
                  }}
                  style={{ color: "#555" }}
                  className="ru"
                >
                  RU
                </li>
                <li
                  onClick={() => {
                    localStorage.setItem("lang", "uz");
                    setLang(!lang);
                  }}
                  style={{ color: "#555" }}
                  className="uz"
                >
                  UZ
                </li>
              </>
            )}
            {language == "en" && (
              <>
                <li className="en">EN</li>
                <li
                  onClick={() => {
                    localStorage.setItem("lang", "ru");
                    setLang(!lang);
                  }}
                  style={{ color: "#555" }}
                  className="ru"
                >
                  RU
                </li>
                <li
                  onClick={() => {
                    localStorage.setItem("lang", "uz");
                    setLang(!lang);
                  }}
                  style={{ color: "#555" }}
                  className="uz"
                >
                  UZ
                </li>
              </>
            )}
            {language == "ru" && (
              <>
                <li
                  onClick={() => {
                    localStorage.setItem("lang", "en");
                    setLang(!lang);
                  }}
                  style={{ color: "#555" }}
                  className="en"
                >
                  EN
                </li>
                <li className="ru">RU</li>
                <li
                  onClick={() => {
                    localStorage.setItem("lang", "uz");
                    setLang(!lang);
                  }}
                  style={{ color: "#555" }}
                  className="uz"
                >
                  UZ
                </li>
              </>
            )}
            {language == "uz" && (
              <>
                <li
                  onClick={() => {
                    localStorage.setItem("lang", "en");
                    setLang(!lang);
                  }}
                  style={{ color: "#555" }}
                  className="en"
                >
                  EN
                </li>
                <li
                  onClick={() => {
                    localStorage.setItem("lang", "ru");
                    setLang(!lang);
                  }}
                  style={{ color: "#555" }}
                  className="ru"
                >
                  RU
                </li>
                <li className="uz">UZ</li>
              </>
            )}
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
      </div>
    </header>
  );
}
