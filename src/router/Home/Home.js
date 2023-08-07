import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Home() {
  function logout() {
    localStorage.setItem("confirm", null);
    localStorage.setItem("user", null);
    document.location.reload(true)
  }

  return (
    <div id="home">
      <a onClick={logout}>
        <span>Log out</span>
        <div className="liquid"></div>
      </a>
    </div>
  );
}
