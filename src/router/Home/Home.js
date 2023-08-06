import React, { useEffect } from "react";

export default function Home() {
  function logout() {
    localStorage.setItem("confirm", null);
    localStorage.setItem("user", null);
  }

  return (
    <>
      <h1>Home Page</h1>
      <button onClick={logout}>Log out</button>
    </>
  );
}
