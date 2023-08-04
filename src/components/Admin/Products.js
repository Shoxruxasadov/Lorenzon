import React from "react";
import { HiSearch } from "react-icons/hi";

export default function Products() {
  return (
    <section className="products">
      <header>
        <div className="category">
          <h1>Products</h1>
        </div>
        <div className="others">
          <div className="search">
            <input type="text" placeholder="Search anything here..." />
            <HiSearch />
          </div>
          <div className="addUser">
            <button>Add Product</button>
          </div>
        </div>
      </header>
    </section>
  );
}
