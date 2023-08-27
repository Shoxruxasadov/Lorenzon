import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup/build";

import TimeStampConverter from "../../../utility/timestamp";
import ageConverter from "../../../utility/ageConverter";

import { HiSortDescending, HiSortAscending } from "react-icons/hi";
import { TbGenderMale, TbGenderFemale } from "react-icons/tb";
import { HiSearch } from "react-icons/hi";
import unknown from "../../../images/Admin/unknown.jpg";

export default function Users() {
  const users = useSelector((state) => state.userReducer.users);
  const sort = useSelector((state) => state.userReducer.sort);
  const sidebar = useSelector((state) => state.utilityReducer.sidebar);
  const [t, i18n] = useTranslation("global");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  const [slicedData, setSlicedData] = useState([]);
  const [currentData, setCurrentData] = useState([]);

  const [newSlicedData, setNewSlicedData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [qualityData, setQualityData] = useState(0);
  const [percentageData, setPercentageData] = useState(0);

  const [page, setPage] = useState(1); // O'qish bo'limi
  const [perPage, setPerPage] = useState(10); // Har bir sahifada ko'rsatiladigan malumotlar soni
  const [totalPages, setTotalPages] = useState(1); // Jami bo'limlar
  const [loader, setLoader] = useState(true);

  const [ages, setAges] = useState([]);
  const [overEighteens, setOverEighteens] = useState(0);
  const [notEighteens, setNotEighteens] = useState(0);
  const [middleAge, setMiddleAge] = useState(0);

  const [countrys, setCountrys] = useState([]);

  const [genders, setGenders] = useState([]);
  const [male, setMale] = useState(0);
  const [female, setFemale] = useState(0);

  const fetchData = () => {
    // Malumotlar massivining o'zi - dataMassiv
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    setCurrentData(users.slice(startIndex, endIndex));
  };

  const fetchMoreData = () => {
    setLoader(true);
    // Qo'shimcha malumotlarni olish funktsiyasi
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleScroll = () => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const isAtBottom =
        scrollContainer.scrollHeight - Math.ceil(scrollContainer.scrollTop) ===
        scrollContainer.clientHeight;
      if (isAtBottom) {
        page < totalPages ? fetchMoreData() : setLoader(false);
      }
    }
  };

  useEffect(() => fetchData(), [page, perPage]);
  useEffect(
    () => setSlicedData((prevData) => [...prevData, ...currentData]),
    [currentData]
  );

  useEffect(() => {
    setTotalPages(Math.ceil(users.length / perPage));
    setSlicedData([]);
    setPage(1);
    fetchData();

    let qualtyData = 0;
    users.filter((item) => {
      if (item.birthday != null && item.country != null && item.gender != null)
        qualtyData++;
    });

    setQualityData(qualtyData);
    setPercentageData(
      users.length > 0 ? Math.floor((qualtyData * 100) / users.length) : 0
    );

    // ---------------------

    const ageses = [];
    const countryses = [];
    const genderses = [];

    users.map((item) => {
      if (item.birthday !== null) {
        ageses.push(ageConverter(item.birthday));
      }
      if (item.country !== null) {
        countryses.push(item.country);
      }
      if (item.gender !== null) {
        genderses.push(item.gender);
      }
    });

    setAges(ageses);
    setCountrys(countryses);
    setGenders(genderses);
  }, [users]);

  useEffect(() => {
    let overEighteen = 0;
    let notEighteen = 0;
    let middle = 0;

    ages.filter((item) => {
      if (item >= 18) overEighteen++;
      if (item < 18) notEighteen++;
      middle += item;
    });

    const overPer =
      ages.length > 0 ? Math.round((overEighteen * 100) / ages.length) : 0;
    const notPer =
      ages.length > 0 ? Math.round((notEighteen * 100) / ages.length) : 0;

    setOverEighteens(overPer);
    setNotEighteens(notPer);
    setMiddleAge(ages.length > 0 ? Math.round(middle / ages.length) : 0);
  }, [ages]);

  useEffect(() => {
    let males = 0;
    let females = 0;

    genders.filter((item) => {
      if (item == "Male") males++;
      if (item == "Female") females++;
    });

    const malePer =
      genders.length > 0 ? Math.round((males * 100) / genders.length) : 0;
    const femalePer =
      genders.length > 0 ? Math.round((females * 100) / genders.length) : 0;

    setMale(malePer);
    setFemale(femalePer);
  }, [genders]);

  useEffect(() => {
    let arr = [];
    for (let i = 0; i < slicedData.length; i++) {
      if (
        slicedData[i].name.toUpperCase().startsWith(searchInput.toUpperCase())
      ) {
        arr.push(slicedData[i]);
      }
    }
    setNewSlicedData(arr);
  }, [searchInput]);

  useEffect(() => {
    setSlicedData([]);
    setPage(1);
  }, [sort]);

  return (
    <section
      className={sidebar ? "adout users" : "adout users active"}
      ref={scrollRef}
      onScroll={handleScroll}
    >
      <header>
        <div className="category">
          <h1>{t("admin.users.title")}</h1>
        </div>
        <div className="others">
          <div className="search">
            <input
              type="text"
              placeholder={t("admin.users.input")}
              onKeyUp={(e) => setSearchInput(e.target.value)}
            />
            <HiSearch />
          </div>
          <div className="addUser">
            <button onClick={() => navigate("/admin/users/add-user")}>
              {t("admin.users.button")}
            </button>
          </div>
        </div>
      </header>
      <div className="content">
        <div className="top">
          <div className="userStatistics part userPart">
            <div className="content">
              <h3>
                {t("admin.users.totalUser")}: {users.length} / {qualityData}
              </h3>
              <h3>
                {t("admin.users.middleAge")}: {middleAge}
              </h3>
            </div>
            <div className="skill big">
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
                width="80px"
                height="80px"
              >
                <defs>
                  <linearGradient id="GradientColor">
                    <stop offset="0%" />
                    <stop offset="100%" />
                  </linearGradient>
                </defs>
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  strokeLinecap="round"
                  style={{
                    strokeDashoffset: ((100 - percentageData) / 100) * 220,
                  }}
                />
              </svg>
            </div>
          </div>
          <div className="countryStatistics part userPart">
            <h1>{t("admin.users.country")}</h1>
          </div>
          <div className="ageStatistics part userPart">
            <div className="genderBox">
              <p>18+</p>
              <div className="skill">
                <div className="outer">
                  <div className="inner">
                    <div className="number">
                      <CountUp end={overEighteens} duration={1.5} />%
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
                      strokeDashoffset: `${
                        ((100 - overEighteens) / 100) * 188
                      }`,
                    }}
                  />
                </svg>
              </div>
            </div>
            <div className="genderBox">
              <p>-18</p>
              <div className="skill">
                <div className="outer">
                  <div className="inner">
                    <div className="number">
                      <CountUp end={notEighteens} duration={1.5} />%
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
                      strokeDashoffset: ((100 - notEighteens) / 100) * 188,
                    }}
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="genderStatistics part userPart">
            <div className="genderBox">
              <p>
                <TbGenderMale className="icon" />
                <span>{t("admin.users.male")}</span>
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
                    style={{
                      strokeDashoffset: `${((100 - male) / 100) * 188}`,
                    }}
                  />
                </svg>
              </div>
            </div>
            <div className="genderBox">
              <p>
                <TbGenderFemale className="icon" />
                <span>{t("admin.users.female")}</span>
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
          <InfiniteScroll
            dataLength={users.length} // Malumotlar massivi uzunligi
            next={fetchMoreData} // Qo'shimcha malumotlarni olish funktsiyasi
            hasMore={page < totalPages} // Qo'shimcha malumotlar mavjudligini tekshirish
          >
            <table>
              <thead>
                <tr>
                  <th onClick={() => dispatch({ type: "SET_SORT" })}>
                    {sort == "desc" ? (
                      <HiSortDescending />
                    ) : (
                      <HiSortAscending />
                    )}
                    {t("admin.users.name")}
                  </th>
                  <th>{t("admin.users.birthday")}</th>
                  <th>{t("admin.users.country")}</th>
                  <th>{t("admin.users.gender")}</th>
                  <th>{t("admin.users.role")}</th>
                </tr>
              </thead>
              <tbody>
                {searchInput === "" ? (
                  <>
                    {slicedData.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <img
                            src={item.image ? item.image : unknown}
                            alt={item.name}
                          />
                          <div className="name">
                            <h1>{item.name}</h1>
                            <p>{item.email}</p>
                          </div>
                        </td>
                        <td>
                          {item.birthday ? (
                            <TimeStampConverter timeSeconds={item.birthday} />
                          ) : null}
                        </td>
                        <td>{item.country}</td>
                        <td>{item.gender}</td>
                        <td>{item.role}</td>
                      </tr>
                    ))}
                    {loader ? (
                      <tr>
                        <th style={{ padding: "10px 0 15px" }} colSpan={5}>
                          {t("admin.users.loading")}
                        </th>
                      </tr>
                    ) : (
                      <tr>
                        <th style={{ padding: "10px 0 15px" }} colSpan={5}>
                          {t("admin.users.otherData")}
                        </th>
                      </tr>
                    )}
                  </>
                ) : newSlicedData.length == 0 ? (
                  <tr>
                    <th style={{ padding: "10px 0 15px" }} colSpan={5}>
                      {t("admin.users.serachUsers")}
                    </th>
                  </tr>
                ) : (
                  <>
                    {newSlicedData.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <img
                            src={item.image ? item.image : unknown}
                            alt={item.name}
                          />
                          <div className="name">
                            <h1>{item.name}</h1>
                            <p>{item.email}</p>
                          </div>
                        </td>
                        <td>
                          {item.birthday ? (
                            <TimeStampConverter timeSeconds={item.birthday} />
                          ) : null}
                        </td>
                        <td>{item.country}</td>
                        <td>{item.gender}</td>
                        <td>{item.role}</td>
                      </tr>
                    ))}
                    {loader ? (
                      <tr>
                        <th style={{ padding: "10px 0 15px" }} colSpan={5}>
                          {t("admin.users.loading")}
                        </th>
                      </tr>
                    ) : (
                      <tr>
                        <th style={{ padding: "10px 0 15px" }} colSpan={5}>
                          {t("admin.users.otherData")}
                        </th>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </table>
          </InfiniteScroll>
        </div>
      </div>
    </section>
  );
}
