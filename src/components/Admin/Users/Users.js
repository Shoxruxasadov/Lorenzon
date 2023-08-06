import React, { useEffect, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import unknown from "../../../images/Admin/unknown.jpg";
import { useSelector } from "react-redux";

export default function Users() {
  const users = useSelector((state) => state.userReducer.users);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => setData(users), [users]);

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
            <button onClick={() => navigate("/admin/users/add-user")}>
              Add User
            </button>
          </div>
        </div>
      </header>
      <div className="content">
        <div className="top">
          <div className="totalUser part userPart"></div>
          <div className="activeMembers part userPart"></div>
          <div className="newReturning part userPart"></div>
          <div className="activeMember part userPart"></div>
        </div>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Country</th>
                <th>Gender</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img src={item.image ? item.image : unknown} />
                    <div className="name">
                      <h1>{item.name}</h1>
                      <p>{item.email}</p>
                    </div>
                  </td>
                  <td>{item.phone}</td>
                  <td>{item.country}</td>
                  <td>{item.gender}</td>
                  <td>{item.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
