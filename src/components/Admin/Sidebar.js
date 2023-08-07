import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import i18next from "i18next";
import { useSelector } from "react-redux";

import logo from "../../images/Admin/logo.png";
import icon from "../../images/Admin/icon.png";

import { HiHome, HiMoon, HiSun } from "react-icons/hi";
import { FaUserFriends } from "react-icons/fa";
import { HiMiniMusicalNote } from "react-icons/hi2";
import { LuLogOut } from "react-icons/lu";

export default function Sidebar({ darkmode, setDarkmode }) {
  const user = useSelector((state) => state.confirmReducer.user);
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

  function logout() {
    localStorage.setItem("confirm", null);
    localStorage.setItem("user", null);
    document.location.reload(true);
  }

  return (
    <div className="sidebar">
      <div className="wrapper">
        <div className="logo">
          <img src={darkmode ? logo : icon} />
        </div>
        <div className="categories">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            <HiHome />
            <span>Home</span>
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            <FaUserFriends />
            <span>Users</span>
          </NavLink>
          <NavLink
            to="/admin/products"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            <HiMiniMusicalNote />
            <span>Products</span>
          </NavLink>
        </div>
      </div>
      <div className="out">
        <ul className="lang">
          <li
            onClick={() => langChanger("en")}
            style={
              darkmode
                ? language === "en"
                  ? {
                      transition: "0.15s",
                      boxShadow: "rgba(99, 99, 99, 0.1) 0px 2px 4px",
                      backgroundColor: "#FFFFFF",
                      color: "#0f54f0",
                    }
                  : { backgroundColor: "transparent", color: "#000000" }
                : language === "en"
                ? {
                    transition: "0.15s",
                    backgroundColor: "#262528",
                    color: "#0f54f0",
                  }
                : { backgroundColor: "transparent", color: "#ffffff" }
            }
            className="en"
          >
            EN
          </li>
          <li
            onClick={() => langChanger("ru")}
            style={
              darkmode
                ? language === "ru"
                  ? {
                      transition: "0.15s",
                      boxShadow: "rgba(99, 99, 99, 0.1) 0px 2px 4px",
                      backgroundColor: "#FFFFFF",
                      color: "#0f54f0",
                    }
                  : { backgroundColor: "transparent", color: "#000000" }
                : language === "ru"
                ? {
                    transition: "0.15s",
                    backgroundColor: "#262528",
                    color: "#0f54f0",
                  }
                : { backgroundColor: "transparent", color: "#ffffff" }
            }
            className="ru"
          >
            RU
          </li>
          <li
            onClick={() => langChanger("uz")}
            style={
              darkmode
                ? language === "uz"
                  ? {
                      transition: "0.15s",
                      boxShadow: "rgba(99, 99, 99, 0.1) 0px 2px 4px",
                      backgroundColor: "#FFFFFF",
                      color: "#0f54f0",
                    }
                  : { backgroundColor: "transparent", color: "#000000" }
                : language === "uz"
                ? {
                    transition: "0.15s",
                    backgroundColor: "#262528",
                    color: "#0f54f0",
                  }
                : { backgroundColor: "transparent", color: "#ffffff" }
            }
            className="uz"
          >
            UZ
          </li>
        </ul>
        <div onClick={() => setDarkmode(!darkmode)} className="darkmode">
          <div
            className="sun"
            style={
              darkmode
                ? {
                    transition: "0.15s",
                    boxShadow: "rgba(99, 99, 99, 0.1) 0px 2px 4px",
                    backgroundColor: "#FFFFFF",
                    color: "#0f54f0",
                  }
                : { backgroundColor: "transparent", color: "#ffffff" }
            }
          >
            <HiSun className="light" />
            <span>Light</span>
          </div>
          <div
            className="moon"
            style={
              darkmode
                ? {
                    transition: "0.15s",
                    backgroundColor: "transparent",
                    color: "#000000",
                  }
                : { backgroundColor: "#262528", color: "#0f54f0" }
            }
          >
            <HiMoon className="dark" />
            <span>Dark</span>
          </div>
        </div>
        <div className="logout" onClick={logout}>
          <div className="data">
            <img src={user.image} />
            <div className="title">
              <h3>{user.name}</h3>
              <h4>{user.email}</h4>
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
