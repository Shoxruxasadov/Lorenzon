import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import GetAudioDuration from "../../../../utility/duration";

import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { IoTimeOutline } from "react-icons/io5";
import { HiSearch } from "react-icons/hi";

import artist from "../../../../images/Admin/artist.jpg";
import album from "../../../../images/Admin/album.jpg";
import playDark from "../../../../images/Admin/play-dark.jpg";

export default function Music() {
  const sidebar = useSelector((state) => state.utilityReducer.sidebar);
  const musics = useSelector((state) => state.musicsReducer.musics);
  const [currentMusic, setCurrentMusic] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cuHovered, setCuHovered] = useState(null);
  const [t, i18n] = useTranslation("global");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  const [slicedData, setSlicedData] = useState([]);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => console.log(slicedData), [slicedData]);

  const [newSlicedData, setNewSlicedData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [page, setPage] = useState(1); // O'qish bo'limi
  const [perPage, setPerPage] = useState(10); // Har bir sahifada ko'rsatiladigan malumotlar soni
  const [totalPages, setTotalPages] = useState(1); // Jami bo'limlar
  const [loader, setLoader] = useState(true);

  const fetchData = () => {
    // Malumotlar massivining o'zi - dataMassiv
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    setCurrentData(musics.slice(startIndex, endIndex));
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
    setTotalPages(Math.ceil(musics.length / perPage));
    // setSlicedData([]);
    // setPage(1);
    fetchData();
  }, [musics]);

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
      className={sidebar ? "adout musics" : "adout musics active"}
      ref={scrollRef}
      onScroll={handleScroll}
    >
      <header>
        <div className="category">
          <h1>{t("admin.musics.title")}</h1>
        </div>
        <div className="others">
          <div className="search">
            <input
              type="text"
              placeholder={t("admin.musics.input")}
              onKeyUp={(e) => setSearchInput(e.target.value)}
            />
            <HiSearch />
          </div>
          <div className="addUser">
            <button onClick={() => navigate("/admin/musics/add-music")}>
              {t("admin.musics.button")}
            </button>
          </div>
        </div>
      </header>
      <div className="content">
        <div className="top">
          <div
            className="artistsBox part userPart"
            onClick={() => navigate("/admin/musics/singers")}
          >
            <img src={artist} alt="Artist" />
            <div className="title">
              <h1>{t("admin.singer.title")}</h1>
            </div>
          </div>
          <div
            className="playlistsBox part userPart"
            onClick={() => navigate("/admin/musics/playlists")}
          >
            <img src={playDark} alt="Artist" />
            <div className="title">
              <h1>{t("admin.playlist.title")}</h1>
            </div>
          </div>
          <div
            className="albumsBox part userPart"
            onClick={() => navigate("/admin/musics/albums")}
          >
            <img src={album} alt="Artist" />
            <div className="title">
              <h1>{t("admin.album.title")}</h1>
            </div>
          </div>
        </div>
        <div className="table-wrapper">
          <InfiniteScroll
            dataLength={musics.length} // Malumotlar massivi uzunligi
            next={fetchMoreData} // Qo'shimcha malumotlarni olish funktsiyasi
            hasMore={page < totalPages} // Qo'shimcha malumotlar mavjudligini tekshirish
          >
            <div className="table">
              <div className="thead">
                <div className="tr">
                  <div className="th">#</div>
                  <div className="th">{t("admin.musics.music")}</div>
                  <div className="th">{t("admin.musics.album")}</div>
                  <div className="th">{t("admin.musics.playlist")}</div>
                  <div className="th">{t("admin.musics.added")}</div>
                  <div className="th">
                    <IoTimeOutline />
                  </div>
                </div>
              </div>
              <div className="tbody">
                {searchInput === "" ? (
                  <>
                    {slicedData.map((item, index) => (
                      <div
                        className="tr"
                        key={index}
                        onClick={() => setCurrentMusic(index)}
                        onMouseEnter={() => {
                          setIsHovered(true);
                          setCuHovered(index);
                        }}
                        onMouseLeave={() => {
                          setIsHovered(false);
                          setCuHovered(null);
                        }}
                      >
                        <div className="td">
                          {currentMusic === index ? (
                            <BsFillPauseFill />
                          ) : cuHovered === index && isHovered ? (
                            <BsFillPlayFill />
                          ) : (
                            index + 1
                          )}
                        </div>
                        <div className="td">
                          <img src={item.image} alt={item.name} />
                          <div className="name">
                            <h1>{item.name}</h1>
                            <p>{item.artist}</p>
                          </div>
                        </div>
                        <div className="td">{item.album}</div>
                        <div className="td">{item.playlist}</div>
                        <div className="td">{item.timeStamp}</div>
                        <div className="td">
                          <GetAudioDuration audioUrl={item.song} />
                        </div>
                        {currentMusic === index && (
                          <audio autoPlay>
                            <source src={item.song} type="audio/mpeg" />
                          </audio>
                        )}
                      </div>
                    ))}
                    {loader ? (
                      <div className="tr">
                        <div
                          className="td"
                          style={{ paddingBottom: "5px", width: "100%" }}
                          colSpan={5}
                        >
                          {t("admin.users.loading")}
                        </div>
                      </div>
                    ) : (
                      <div className="tr">
                        <div
                          className="td"
                          style={{ paddingBottom: "5px", width: "100%" }}
                          colSpan={5}
                        >
                          {t("admin.users.otherData")}
                        </div>
                      </div>
                    )}
                  </>
                ) : newSlicedData.length == 0 ? (
                  <div className="tr">
                    <div
                      className="td"
                      style={{ paddingBottom: "5px", width: "100%" }}
                      colSpan={5}
                    >
                      {t("admin.users.serachUsers")}
                    </div>
                  </div>
                ) : (
                  <>
                    {newSlicedData.map((item, index) => (
                      <div
                        className="tr"
                        key={index}
                        onClick={() => setCurrentMusic(index)}
                      >
                        <div className="td">{index + 1}</div>
                        <div className="td">
                          <img src={item.image} alt={item.name} />
                          <div className="name">
                            <h1>{item.name}</h1>
                            <p>{item.artist}</p>
                          </div>
                        </div>
                        <div className="td">{item.album}</div>
                        <div className="td">{item.playlist}</div>
                        <div className="td">{item.timeStamp}</div>
                        <div className="td">{item.playlist}</div>
                        {currentMusic === index && (
                          <audio autoPlay>
                            <source src={item.song} type="audio/mpeg" />
                          </audio>
                        )}
                      </div>
                    ))}
                    {loader ? (
                      <div className="tr">
                        <div
                          className="td"
                          style={{ paddingBottom: "5px", width: "100%" }}
                          colSpan={5}
                        >
                          {t("admin.users.loading")}
                        </div>
                      </div>
                    ) : (
                      <div className="tr">
                        <div
                          className="td"
                          style={{ paddingBottom: "5px", width: "100%" }}
                          colSpan={5}
                        >
                          {t("admin.users.otherData")}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </section>
  );
}
