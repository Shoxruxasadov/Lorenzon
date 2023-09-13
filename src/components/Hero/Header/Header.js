import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as LinkRoll } from "react-scroll";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import i18next from "i18next";

import logo from "../../../images/Logo/logo.png";
import comingsoon from "../../../images/Hero/heros/Coming Soon.svg";

export default function Header() {
  const [scrennWidth, setScrennWidth] = useState(window.innerWidth);
  const [t, i18n] = useTranslation("global");
  const [lang, setLang] = useState(false);
  const language = localStorage.getItem("lang");

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

  useEffect(() => {
    const handleResize = () => setScrennWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header>
      <div className="container">
        <motion.div
          initial={{ width: "0", height: "0" }}
          animate={{ width: "70px", height: "70px" }}
          transition={{ duration: 1 }}
          className="ellipse"
        />
        <Link to={"/"} className="logo">
          <img src={logo} alt="Lorenzon" />
          <h1>{t("brand")}</h1>
        </Link>
        {scrennWidth >= 780 && (
          <nav className="navbar">
            <ul className="list">
              <LinkRoll
                activeClass="active"
                to="heros"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
              >
                {t("hero.header.home")}
              </LinkRoll>
              <LinkRoll
                activeClass="active"
                to="home"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
              >
                Service
              </LinkRoll>
              <LinkRoll
                activeClass="active"
                to="home"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
              >
                Blog
              </LinkRoll>
              <LinkRoll
                activeClass="active"
                to="home"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
              >
                Support
              </LinkRoll>
              <LinkRoll
                activeClass="active"
                to="home"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
              >
                About Us
              </LinkRoll>
            </ul>
            <div className="download">
              <a>Download Now</a>
              <img src={comingsoon} />
            </div>
          </nav>
        )}
        {scrennWidth < 780 && (
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
          </div>
        )}
      </div>
    </header>
  );
}
