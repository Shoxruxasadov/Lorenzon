import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { IoTimeOutline } from "react-icons/io5";
import { HiSearch } from "react-icons/hi";

import GetAudioDuration from "../../../utility/getAudioDuration";

export default function Musics() {
  const sidebar = useSelector((state) => state.utilityReducer.sidebar);
  // const artists = useSelector((state) => state.musicsReducer.artists);
  // const playlists = useSelector((state) => state.musicsReducer.playlists);
  // const albums = useSelector((state) => state.musicsReducer.albums);
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
            <button>{t("admin.musics.button")}</button>
          </div>
        </div>
      </header>
      <div className="content">
        <div className="top">
          <div className="artists part userPart"></div>
          <div className="playlists part userPart"></div>
          <div className="albums part userPart"></div>
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
                  <div className="th">Title</div>
                  <div className="th">Album</div>
                  <div className="th">Playlist</div>
                  <div className="th">Date added</div>
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
