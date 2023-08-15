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
      <h1 style={{ fontWeight: 500, color: "#3590f3" }}>
        404 | Not Page Found
      </h1>
      <a className="interactiveButton" onClick={() => navigate("/")}>
        <span>Back</span>
        <div className="liquid"></div>
      </a>
    </div>
  );
}
