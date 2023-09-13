import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import i18next from "i18next";
import { useDispatch, useSelector } from "react-redux";

import icon from "../../../images/Logo/white.png";

import { HiHome } from "react-icons/hi";
import { FaUserFriends } from "react-icons/fa";
import { HiMiniMusicalNote } from "react-icons/hi2";
import { LuLogOut } from "react-icons/lu";

export default function Sidebar() {
  const user = useSelector((state) => state.confirmReducer.user);
  const sidebar = useSelector((state) => state.utilityReducer.sidebar);
  const language = localStorage.getItem("lang");
  const [t, i18n] = useTranslation("global");
  const [lang, setLang] = useState(false);
  const dispatch = useDispatch();

  const [miniLang, setMiniLang] = useState(
    language === "en" ? 1 : language === "ru" ? 2 : language === "uz" ? 3 : 1
  );

  const handleChangeLanguage = (lang) => {
    i18next.changeLanguage(lang);
  };

  useEffect(() => {
    if (language == "en") setMiniLang(1);
    if (language == "ru") setMiniLang(2);
    if (language == "uz") setMiniLang(3);
    handleChangeLanguage(language);
    document.querySelector("html").setAttribute("lang", language || "en");
  }, [lang]);

  useEffect(() => {
    if (miniLang === 1) {
      localStorage.setItem("lang", "en");
    } else if (miniLang === 2) {
      localStorage.setItem("lang", "ru");
    } else if (miniLang === 3) {
      localStorage.setItem("lang", "uz");
    }
    setLang(!lang);
  }, [miniLang]);

  function langChanger(lan) {
    localStorage.setItem("lang", lan);
    setLang(!lang);
  }

  function miniLangChanger() {
    if (miniLang === 3) {
      setMiniLang(1);
    } else {
      setMiniLang((prev) => (prev += 1));
    }
  }

  function logout() {
    localStorage.setItem("confirm", null);
    localStorage.setItem("user", null);
    document.location.reload(true);
  }

  return (
    <div className={sidebar ? "sidebar" : "sidebar active"}>
      <div className="wrapper">
        <div onClick={() => dispatch({ type: "SET_SIDEBAR" })} className="logo">
          <img src={icon} alt="Lorenzon" />
        </div>
        <div className="categories">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            <HiHome />
            <span>{t("admin.sidebar.home")}</span>
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            <FaUserFriends />
            <span>{t("admin.sidebar.users")}</span>
          </NavLink>
          <NavLink
            to="/admin/musics"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            <HiMiniMusicalNote />
            <span>{t("admin.sidebar.musics")}</span>
          </NavLink>
        </div>
      </div>
      <div className="out">
        <ul className="lang">
          <li
            onClick={() => langChanger("en")}
            style={
              language === "en"
                ? {
                    transition: "0.15s",
                    backgroundColor: "#0D1219",
                    color: "#582ddd",
                  }
                : { backgroundColor: "transparent", color: "#f3f3f3" }
            }
            className="en"
          >
            EN
          </li>
          <li
            onClick={() => langChanger("ru")}
            style={
              language === "ru"
                ? {
                    transition: "0.15s",
                    backgroundColor: "#0D1219",
                    color: "#582ddd",
                  }
                : { backgroundColor: "transparent", color: "#f3f3f3" }
            }
            className="ru"
          >
            RU
          </li>
          <li
            onClick={() => langChanger("uz")}
            style={
              language === "uz"
                ? {
                    transition: "0.15s",
                    backgroundColor: "#0D1219",
                    color: "#582ddd",
                  }
                : { backgroundColor: "transparent", color: "#f3f3f3" }
            }
            className="uz"
          >
            UZ
          </li>
          <li className="miniLang" onClick={miniLangChanger}>
            {miniLang == 1
              ? "EN"
              : miniLang == 2
              ? "RU"
              : miniLang == 3
              ? "UZ"
              : "EN"}
          </li>
        </ul>
        <div className="logout" onClick={logout}>
          <div className="data">
            <img src={user && user.image} alt="User" />
            <div className="title">
              <h3>{user && user.name}</h3>
              <h4>{user && user.email}</h4>
            </div>
          </div>
          <div className="back">
            <LuLogOut />
          </div>
        </div>
      </div>
    </div>
  );
}
