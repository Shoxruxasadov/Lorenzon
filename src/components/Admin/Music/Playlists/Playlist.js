import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { HiSearch } from "react-icons/hi";
import { FaSolarPanel } from "react-icons/fa6";

export default function Playlist() {
  const sidebar = useSelector((state) => state.utilityReducer.sidebar);
  const darkmode = useSelector((state) => state.utilityReducer.darkmode);
  const playlists = useSelector((state) => state.musicsReducer.playlists);
  const [t, i18n] = useTranslation("global");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  const [slicedData, setSlicedData] = useState([]);
  const [currentData, setCurrentData] = useState([]);

  const [newSlicedData, setNewSlicedData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [page, setPage] = useState(1); // O'qish bo'limi
  const [perPage, setPerPage] = useState(2); // Har bir sahifada ko'rsatiladigan malumotlar soni
  const [totalPages, setTotalPages] = useState(1); // Jami bo'limlar
  const [loader, setLoader] = useState(true);

  const fetchData = () => {
    // Malumotlar massivining o'zi - dataMassiv
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    setCurrentData(playlists.slice(startIndex, endIndex));
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
    setTotalPages(Math.ceil(playlists.length / perPage));
    // setSlicedData([]);
    // setPage(1);
    fetchData();
  }, [playlists]);

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
    <section
      className={sidebar ? "adout playlists" : "adout playlists active"}
      ref={scrollRef}
      onScroll={handleScroll}
    >
      <header>
        <div className="category">
          <h1 onClick={() => navigate("/admin/musics")} className="link">
            {t("admin.musics.title")}
          </h1>
          <h3>/</h3>
          <h2>{t("admin.playlist.title")}</h2>
        </div>
        <div className="others">
          <div className="search">
            <input
              type="text"
              placeholder={t("admin.playlist.input")}
              onKeyUp={(e) => setSearchInput(e.target.value)}
            />
            <HiSearch />
          </div>
          <div className="addUser">
            <button onClick={()=>navigate("/admin/musics/playlists/add-playlist")}>{t("admin.playlist.button")}</button>
          </div>
        </div>
      </header>
      <div className="content">
        <InfiniteScroll
          dataLength={playlists.length} // Malumotlar massivi uzunligi
          next={fetchMoreData} // Qo'shimcha malumotlarni olish funktsiyasi
          hasMore={page < totalPages} // Qo'shimcha malumotlar mavjudligini tekshirish
        >
          <div className="card-wrapper">
            {searchInput === "" ? (
              <>
                {slicedData.map((item, index) => (
                  <div className="card" key={index}>
                    <span>{index + 1}</span>
                    <img src={item.image} alt={item.name} />
                    <h1>{item.name}</h1>
                  </div>
                ))}
                {loader ? (
                  <span className="loading">{t("admin.users.loading")}</span>
                ) : (
                  <span className="loading">{t("admin.users.otherData")}</span>
                )}
              </>
            ) : newSlicedData.length == 0 ? (
              <span className="loading">{t("admin.users.serachUsers")}</span>
            ) : (
              <>
                {newSlicedData.map((item, index) => (
                  <div className="card" key={index}>
                    <span className="num">{index + 1}</span>
                    <img src={item.image} alt={item.name} />
                    <h1>{item.name}</h1>
                  </div>
                ))}
                {loader ? (
                  <span className="loading">{t("admin.users.loading")}</span>
                ) : (
                  <span className="loading">{t("admin.users.otherData")}</span>
                )}
              </>
            )}
          </div>
        </InfiniteScroll>
      </div>
    </section>
  );
}
