import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/Admin/logo.png";
import icon from "../../images/Admin/icon.png";

import { HiHome, HiMoon, HiSun } from "react-icons/hi";
import { FaUserFriends } from "react-icons/fa";
import { HiMiniMusicalNote } from "react-icons/hi2";

export default function Sidebar({ darkmode, setDarkmode }) {
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
        <div onClick={() => setDarkmode(!darkmode)} className="darkmode">
          <div
            className="sun"
            style={
              darkmode
                ? { backgroundColor: "#FFFFFF", color: "#0f54f0", boxShadow: "rgba(99, 99, 99, 0.1) 0px 2px 4px" }
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
                ? { backgroundColor: "transparent", color: "#000000" }
                : { backgroundColor: "#262528", color: "#0f54f0" }
            }
          >
            <HiMoon className="dark" />
            <span>Dark</span>
          </div>
        </div>
      </div>
      <div className="logout"></div>
    </div>
  );
}
