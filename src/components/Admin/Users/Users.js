import React, { useEffect, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import unknown from "../../../images/Admin/unknown.jpg";
import { useSelector } from "react-redux";
import CountUp from "react-countup/build";

import { TbGenderMale, TbGenderFemale, TbGenderAgender } from "react-icons/tb";

export default function Users() {
  const users = useSelector((state) => state.userReducer.users);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [qualityData, setQualityData] = useState(0);
  const [percentageData, setPercentageData] = useState(0);

  const [ages, setAges] = useState([]);

  const [countrys, setCountrys] = useState([]);

  const [genders, setGenders] = useState([]);
  const [male, setMale] = useState(0);
  const [female, setFemale] = useState(0);
  const [agender, setAgender] = useState(0);

  useEffect(() => {
    setData(users);

    const ages = [];
    const countrys = [];
    const genders = [];

    users.map((item) => {
      ages.push(item.birthday);
      countrys.push(item.countrys);
      genders.push(item.gender);
    });

    setAges(ages);
    setCountrys(countrys);
    setGenders(genders);
  }, [users]);

  useEffect(() => {
    let qualtyData = 0;
    data.filter((item) => {
      if (item.birthday != null && item.country != null && item.gender != null)
        qualtyData++;
    });
    setQualityData(qualtyData);
    setPercentageData(Math.floor((qualtyData * 100) / data.length));
  }, [data]);

  useEffect(() => {
    let males = 0;
    let females = 0;
    let agenders = 0;

    genders.filter((item) => {
      if (item == "Male") males++;
      if (item == "Female") females++;
      if (item == null || item == "Robot") agenders++;
    });

    setMale(Math.floor((males * 100) / data.length));
    setFemale(Math.floor((females * 100) / data.length));
    setAgender(Math.floor((agenders * 100) / data.length));
  }, [genders]);

  return (
    <section className="adout users">
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
          <div className="totalUser part userPart">
            <div className="content">
              <h1>Total Users</h1>
              <h2>{data.length}</h2>
              <p>from {qualityData}</p>
            </div>
            <div className="skill">
              <div className="outer">
                <div className="inner">
                  <div className="number">
                    <CountUp end={percentageData} duration={1.5} />%
                  </div>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="70px"
                height="70px"
              >
                <defs>
                  <linearGradient id="GradientColor">
                    <stop offset="0%" />
                    <stop offset="100%" />
                  </linearGradient>
                </defs>
                <circle
                  cx="35"
                  cy="35"
                  r="30"
                  strokeLinecap="round"
                  style={{
                    strokeDashoffset: ((100 - percentageData) / 100) * 188,
                  }}
                />
              </svg>
            </div>
          </div>
          <div className="activeMembers part userPart">
            <div className="content">
              <h1>Total Age</h1>
              <h2>{data.length}</h2>
              <p>from {data.length}</p>
            </div>
            <div className="skill">
              <div className="outer">
                <div className="inner">
                  <div className="number">
                    <CountUp end={70} duration={1.5} />%
                  </div>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="70px"
                height="70px"
              >
                <defs>
                  <linearGradient id="GradientColor">
                    <stop offset="0%" />
                    <stop offset="100%" />
                  </linearGradient>
                </defs>
                <circle cx="35" cy="35" r="30" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <div className="newReturning part userPart">
            <div className="content">
              <h1>Total Country</h1>
              <h2>{data.length}</h2>
              <p>from {data.length}</p>
            </div>
            <div className="skill">
              <div className="outer">
                <div className="inner">
                  <div className="number">
                    <CountUp end={70} duration={1.5} />%
                  </div>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="70px"
                height="70px"
              >
                <defs>
                  <linearGradient id="GradientColor">
                    <stop offset="0%" />
                    <stop offset="100%" />
                  </linearGradient>
                </defs>
                <circle cx="35" cy="35" r="30" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <div className="activeMember part userPart">
            <div className="genderBox">
              <p>
                <TbGenderMale className="icon" />
                <span>Male</span>
              </p>
              <div className="skill">
                <div className="outer">
                  <div className="inner">
                    <div className="number">
                      <CountUp end={male} duration={1.5} />%
                    </div>
                  </div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  width="70px"
                  height="70px"
                >
                  <defs>
                    <linearGradient id="GradientColor">
                      <stop offset="0%" />
                      <stop offset="100%" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="35"
                    cy="35"
                    r="30"
                    strokeLinecap="round"
                    style={{ strokeDashoffset: `${((100 - male) / 100) * 188 }`}}
                  />
                </svg>
              </div>
            </div>
            <div className="genderBox">
              <p>
                <TbGenderAgender className="icon" />
                <span>Not</span>
              </p>
              <div className="skill">
                <div className="outer">
                  <div className="inner">
                    <div className="number">
                      <CountUp end={agender} duration={1.5} />%
                    </div>
                  </div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  width="70px"
                  height="70px"
                >
                  <defs>
                    <linearGradient id="GradientColor">
                      <stop offset="0%" />
                      <stop offset="100%" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="35"
                    cy="35"
                    r="30"
                    strokeLinecap="round"
                    style={{ strokeDashoffset: ((100 - agender) / 100) * 188 }}
                  />
                </svg>
              </div>
            </div>
            <div className="genderBox">
              <p>
                <TbGenderFemale className="icon" />
                <span>Female</span>
              </p>
              <div className="skill">
                <div className="outer">
                  <div className="inner">
                    <div className="number">
                      <CountUp end={female} duration={1.5} />%
                    </div>
                  </div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  width="70px"
                  height="70px"
                >
                  <defs>
                    <linearGradient id="GradientColor">
                      <stop offset="0%" />
                      <stop offset="100%" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="35"
                    cy="35"
                    r="30"
                    strokeLinecap="round"
                    style={{ strokeDashoffset: ((100 - female) / 100) * 188 }}
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Birthday</th>
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
                  <td>{item.birthday}</td>
                  <td>{item.country}</td>
                  <td>{item.gender}</td>
                  <td>{item.role}</td>
                </tr>
              ))}
              {/* <tr><th style={{padding: "10px 0 15px"}} colSpan={5}>Loading...</th></tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
