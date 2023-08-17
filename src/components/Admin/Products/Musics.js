import React from "react";
import { HiSearch } from "react-icons/hi";

export default function Musics() {
  return (
    <section className="adout musics">
      <header>
        <div className="category">
          <h1>Musics</h1>
        </div>
        <div className="others">
          <div className="search">
            <input type="text" placeholder="Search anything here..." />
            <HiSearch />
          </div>
          <div className="addUser">
            <button>Add Collection</button>
          </div>
        </div>
      </header>
    </section>
  );
}
