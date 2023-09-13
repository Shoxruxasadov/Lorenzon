import React from "react";
import { useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: "100%",
        height: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <a className="interactiveButton" onClick={() => navigate("/")}>
        <span style={{textWrap: "nowrap"}}>ERROR | 404</span>
        <div className="liquid"></div>
      </a>
    </div>
  );
}
