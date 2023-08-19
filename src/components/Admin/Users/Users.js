import React, { useEffect, useRef, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import unknown from "../../../images/Admin/unknown.jpg";
import { useSelector } from "react-redux";
import CountUp from "react-countup/build";
import InfiniteScroll from "react-infinite-scroll-component";
import timeConverter from "../../../api/timeConverter";
import ageConverter from "../../../api/ageConverter";

import { TbGenderMale, TbGenderFemale } from "react-icons/tb";
import { useTranslation } from "react-i18next";

export default function Users() {
  const users = useSelector((state) => state.userReducer.users);
  const navigate = useNavigate();
  const [t, i18n] = useTranslation("global");

  const [data, setData] = useState([...users]); // Malumotlar massivi
  const [slicedData, setSlicedData] = useState([]);
  const [currentData, setCurrentData] = useState([]);

  const [newSlicedData, setNewSlicedData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [qualityData, setQualityData] = useState(0);
  const [percentageData, setPercentageData] = useState(0);

  const [page, setPage] = useState(1); // O'qish boliq
  const [perPage, setPerPage] = useState(20); // Har bir sahifada ko'rsatiladigan malumotlar soni
  const [totalPages, setTotalPages] = useState(1); // Jami bo'lgan bo'limdagi malumotlar soni
  const [loader, setLoader] = useState(true);

  const [ages, setAges] = useState([]);
  const [overEighteens, setOverEighteens] = useState(0);
  const [notEighteens, setNotEighteens] = useState(0);
  const [middleAge, setMiddleAge] = useState(0);
  const [notAge, setNotAge] = useState(0);

  const [countrys, setCountrys] = useState([]);

  const [genders, setGenders] = useState([]);
  const [male, setMale] = useState(0);
  const [female, setFemale] = useState(0);
  const [agender, setAgender] = useState(0);

  const fetchData = () => {
    // Malumotlar massivining o'zi - dataMassiv
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    setCurrentData(data.slice(startIndex, endIndex));
  };

  const fetchMoreData = () => {
    setLoader(true);
    // Qo'shimcha malumotlarni olish funktsiyasi
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const scrollRef = useRef(null);
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
  useEffect(() => setData([...users]), [users]);
  useEffect(
    () => setSlicedData((prevData) => [...prevData, ...currentData]),
    [currentData]
  );

  useEffect(() => {
    setTotalPages(Math.ceil(data.length / perPage));
    fetchData();

    let qualtyData = 0;
    data.filter((item) => {
      if (item.birthday != null && item.country != null && item.gender != null)
        qualtyData++;
    });

    setQualityData(qualtyData);
    setPercentageData(Math.floor((qualtyData * 100) / data.length));

    // ---------------------

    const ageses = [];
    const countryses = [];
    const genderses = [];

    data.map((item) => {
      ageses.push(item.birthday && ageConverter(item.birthday.seconds));
      countryses.push(item.country);
      genderses.push(item.gender);
    });

    setAges(ageses);
    setCountrys(countryses);
    setGenders(genderses);
  }, [data]);

  useEffect(() => {
    let overEighteen = 0;
    let notEighteen = 0;

    let arrMiddle = [];
    let allMiddle = 0;

    ages.filter((item) => {
      if (item >= 18) overEighteen++;
      if (item != null && item < 18) notEighteen++;
      if (item != null) arrMiddle.push(item);
    });

    arrMiddle.map((age) => {
      allMiddle += age;
    });

    const overPer = Math.round((overEighteen * 100) / data.length);
    const notPer = Math.round((notEighteen * 100) / data.length);

    setOverEighteens(overPer);
    setNotEighteens(notPer);
    setNotAge(100 - (overPer + notPer));
    setMiddleAge(Math.round(allMiddle / arrMiddle.length));
  }, [ages]);

  useEffect(() => {
    let males = 0;
    let females = 0;

    genders.filter((item) => {
      if (item == "Male") males++;
      if (item == "Female") females++;
    });

    const malePer = Math.round((males * 100) / data.length);
    const femalePer = Math.round((females * 100) / data.length);

    setMale(malePer);
    setFemale(femalePer);
    setAgender(100 - (malePer + femalePer));
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

  return (
    <section className="adout users" ref={scrollRef} onScroll={handleScroll}>
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
              {t("admin.users.totalUser")}: {data.length} / {qualityData}
              </h3>
              <h3>{t("admin.users.middleAge")}: {middleAge}</h3>
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
              <div className="skill big">
                <div className="outer">
                  <div className="inner">
                    <div className="number">
                      <CountUp end={notAge} duration={1.5} />%
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
                    style={{ strokeDashoffset: ((100 - notAge) / 100) * 220 }}
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
          <div
            style={{ justifyContent: "center" }}
            className="countryStatistics part userPart"
          >
            <h1>{t("admin.users.topCountry")}</h1>
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
              <div className="skill big">
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
                    style={{ strokeDashoffset: ((100 - agender) / 100) * 220 }}
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
            dataLength={data.length} // Malumotlar massivi uzunligi
            next={fetchMoreData} // Qo'shimcha malumotlarni olish funktsiyasi
            hasMore={page < totalPages} // Qo'shimcha malumotlar mavjudligini tekshirish
          >
            <table>
              <thead>
                <tr>
                  <th>{t("admin.users.name")}</th>
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
                          <img src={item.image ? item.image : unknown} />
                          <div className="name">
                            <h1>{item.name}</h1>
                            <p>{item.email}</p>
                          </div>
                        </td>
                        <td>
                          {item.birthday &&
                            timeConverter(item.birthday.seconds)}
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
                          <img src={item.image ? item.image : unknown} />
                          <div className="name">
                            <h1>{item.name}</h1>
                            <p>{item.email}</p>
                          </div>
                        </td>
                        <td>
                          {item.birthday &&
                            timeConverter(item.birthday.seconds)}
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
