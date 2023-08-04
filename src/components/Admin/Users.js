import React from "react";
import { HiSearch } from "react-icons/hi";

export default function Users() {
  return (
    <section className="users">
      <header>
        <div className="category">
          <h1>Users</h1>
        </div>
        <div className="others">
          <div className="search">
            <input type="text" placeholder="Search anything here..." />
            <HiSearch />
          </div>
          <div className="addUser">
            <button>Add User</button>
          </div>
        </div>
      </header>
    </section>
  );
}
