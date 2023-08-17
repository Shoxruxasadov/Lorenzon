import React from "react";
import { HiSearch } from "react-icons/hi";
import api from "../../../api/instance";
export default function Musics() {
  api.get().then(({ data }) => console.log(data));

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
