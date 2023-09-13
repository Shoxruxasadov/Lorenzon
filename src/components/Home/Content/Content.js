import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IoIosArrowBack } from "react-icons/io";
import { MdLocalLibrary } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

export default function Content() {
  const user = useSelector((state) => state.confirmReducer.user);
  const contentMusic = useSelector(
    (state) => state.utilityReducer.contentMusic
  );
  const [userNav, setUserNav] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logout() {
    localStorage.setItem("confirm", null);
    localStorage.setItem("user", null);
    document.location.reload(true);
  }

  return (
    <aside className={!contentMusic ? "active" : "non-active"}>
      <div
        className="open"
        onClick={() => dispatch({ type: "SET_CONTENT_MUSIC" })}
      >
        <IoIosArrowBack />
      </div>
      <div className="user" onClick={() => setUserNav(!userNav)}>
        <div className="info">
          <img src={user && user.image} alt="user" />
          <div className="name">
            <h3>{user && user.name}</h3>
            <div className="status">
              <p>
                <span className="pre">{user && user.status}</span>
                <span className="dot">•</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                >
                  <path
                    d="M11.3334 14.6667H4.66669C4.39335 14.6667 4.16669 14.44 4.16669 14.1667C4.16669 13.8933 4.39335 13.6667 4.66669 13.6667H11.3334C11.6067 13.6667 11.8334 13.8933 11.8334 14.1667C11.8334 14.44 11.6067 14.6667 11.3334 14.6667Z"
                    fill={
                      user && user.status === "premium"
                        ? "url(#paint0_linear_261_101)"
                        : "white"
                    }
                  />
                  <path
                    d="M13.5667 3.67999L10.9 5.58665C10.5467 5.83999 10.04 5.68665 9.88669 5.27999L8.62669 1.91999C8.41336 1.33999 7.59336 1.33999 7.38002 1.91999L6.11336 5.27332C5.96002 5.68665 5.46002 5.83999 5.10669 5.57999L2.44002 3.67332C1.90669 3.29999 1.20002 3.82665 1.42002 4.44665L4.19336 12.2133C4.28669 12.48 4.54002 12.6533 4.82002 12.6533H11.1734C11.4534 12.6533 11.7067 12.4733 11.8 12.2133L14.5734 4.44665C14.8 3.82665 14.0934 3.29999 13.5667 3.67999ZM9.66669 9.83332H6.33336C6.06002 9.83332 5.83336 9.60665 5.83336 9.33332C5.83336 9.05999 6.06002 8.83332 6.33336 8.83332H9.66669C9.94002 8.83332 10.1667 9.05999 10.1667 9.33332C10.1667 9.60665 9.94002 9.83332 9.66669 9.83332Z"
                    fill={
                      user && user.status === "premium"
                        ? "url(#paint1_linear_261_101)"
                        : "white"
                    }
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_261_101"
                      x1="8.00002"
                      y1="13.6667"
                      x2="8.00002"
                      y2="14.6667"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#896aee" />
                      <stop offset="1" stopColor="#896aee" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_261_101"
                      x1="7.99784"
                      y1="1.48499"
                      x2="7.99784"
                      y2="12.6533"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#896aee" />
                      <stop offset="1" stopColor="#896aee" />
                    </linearGradient>
                  </defs>
                </svg>
              </p>
            </div>
          </div>
        </div>
        <div className={`arrow ${userNav ? "active" : ""}`}>
          <IoIosArrowBack />
        </div>
      </div>
      <div
        className={`user-nav ${userNav ? "active" : ""} ${
          user && user.role == "Admin" ? "admin" : ""
        }`}
      >
        <div className="list" onClick={() => navigate("/account")}>
          <p>Account</p>
        </div>
        <div className="list" onClick={() => navigate("/profile")}>
          <p>Profile</p>
        </div>
        <div className="list" onClick={() => navigate("/settings")}>
          <p>Settings</p>
        </div>
        <hr />
        {user.role == "Admin" && (
          <div className="list" onClick={() => navigate("/admin")}>
            <p>Admin Panel</p>
          </div>
        )}
        <div className="list" onClick={logout}>
          <p>Log out</p>
        </div>
      </div>
      <article>
        <header>
          <div className="title">
            <MdLocalLibrary />
            <h4>Your Library</h4>
          </div>
          <Link>Show all</Link>
        </header>
        <div className="content">
          <div className="card">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/lorezoz.appspot.com/o/playlist%2Fphonk.jpg?alt=media&token=ae6bf60c-79a6-432c-9e69-a14106405388"
              alt="Phonk"
            />
            <div className="title">
              <h4>Phonk</h4>
              <p>Playlist • Lorenzon</p>
            </div>
          </div>
          <div className="card">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/lorezoz.appspot.com/o/playlist%2Fphonk.jpg?alt=media&token=ae6bf60c-79a6-432c-9e69-a14106405388"
              alt="Phonk"
            />
            <div className="title">
              <h4>Phonk</h4>
              <p>Playlist • AV</p>
            </div>
          </div>
          <div className="card">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/lorezoz.appspot.com/o/playlist%2Fphonk.jpg?alt=media&token=ae6bf60c-79a6-432c-9e69-a14106405388"
              alt="Phonk"
            />
            <div className="title">
              <h4>Phonk</h4>
              <p>Playlist • Spotify</p>
            </div>
          </div>
        </div>
      </article>
    </aside>
  );
}
