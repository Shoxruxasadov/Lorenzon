import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
      if (window.location.pathname === "/admin") navigate("/admin/dashboard");
  }, []);

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
    <div id="admin">
      <Sidebar darkmode={darkmode} setDarkmode={setDarkmode} />
      <Outlet darkmode={darkmode} />
    </div>
  );
}
