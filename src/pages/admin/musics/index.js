import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import useLocalStorage from "../../../hooks/useLocalStorage";
import GetAudioDuration from "../../../hooks/useDuration";
import { useMusic } from "../../../store/zustand";
import AdminLayout from "../../../layouts/admin";

import { IoTimeOutline } from "react-icons/io5";
import { HiSearch } from "react-icons/hi";

export default function Music() {
  const [allMusics, setAllMusics] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    getMusics()
  }, [])

  const getMusics = () => axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/songs`).then(({ data }) => setAllMusics(data)).finally(() => setLoading(false))

  return (
    <AdminLayout page="admin-musics" title="Musics">
      <header>
        <div className="category">
          <h1>Musics</h1>
        </div>
        <div className="others">
          <div className="search">
            <input
              type='text'
              placeholder='Search musics here...'
            />
            <HiSearch />
          </div>
          <div className="addUser">
            <button onClick={() => router.push("/admin/musics/add")}>
              Add music
            </button>
          </div>
        </div>
      </header>
      <div className="content">
        <div className="table">
          <table>
            <thead className="thead">
              <tr className="tr">
                <th className="th">Music</th>
                <th className="th">Listen</th>
                <th className="th">Album</th>
                <th className="th"><IoTimeOutline /></th>
              </tr>
            </thead>
            <tbody className="tbody">
              {allMusics.map((item, index) => (
                <tr className="tr" key={index} >
                  <td className="td">
                    <img src={item.image} alt={item.name} />
                    <div className="name">
                      <h1>{item.name}</h1>
                      <p>{item.singer.map(item => <span key={item._id}>{item.name + ", "}</span>)}</p>
                    </div>
                  </td>
                  <td className="td">{item.listenCount}</td>
                  <td className="td">{item.album}</td>
                  <td className="td"><GetAudioDuration audioUrl={item.song} /></td>
                </tr>
              ))}
              {loading && <tr className="loadingTable">
                <td rowSpan={3} colSpan={7}>
                  <div className="waiting">
                    <span className="loader"></span>
                  </div>
                </td>
              </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
