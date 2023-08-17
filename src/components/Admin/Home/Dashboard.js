import React from "react";
import { HiSearch } from "react-icons/hi";

export default function Dashboard() {

  return (
    <section className="adout dashboard">
      <header>
        <div className="category">
          <h1>Dashboard</h1>
        </div>
        <div className="others">
          <div className="search">
            <input type="text" placeholder="Search anything here..." />
            <HiSearch />
          </div>
        </div>
      </header>
      <div className="content">
        <div className="top">
          <div className="customer first-piece part"></div>
          <div className="today last-piece part"></div>
        </div>
        <div className="mid">
          <div className="report first-piece part"></div>
          <div className="last-piece col">
            <div className="latest part"></div>
            <div className="profit part"></div>
          </div>
        </div>
        <div className="down">
          <div className="first-piece row">
            <div className="order part"></div>
            <div className="item part"></div>
          </div>
          <div className="visit last-piece part"></div>
        </div>
      </div>
    </section>
  );
}
