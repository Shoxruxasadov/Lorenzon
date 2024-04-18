import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Rodal from "rodal";
import axios from "axios";

import { success, wrong } from "../../../utils/toastify";
import GetAudioDuration from "../../../hooks/useDuration";
import AdminLayout from "../../../layouts/admin";

import { IoTimeOutline } from "react-icons/io5";
import { HiSearch } from "react-icons/hi";

export default function AdminAlbums() {
  const [allAlbums, setAllAlbums] = useState([])
  const [loading, setLoading] = useState(true)
  const [albumDeleted, setAlbumDeleted] = useState({})
  const [rodalDelete, setRodalDelete] = useState(false)
  const router = useRouter()

  useEffect(() => {
    getAlbums()
  }, [])

  const getAlbums = () => axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/albums`).then(({ data }) => setAllAlbums(data)).finally(() => setLoading(false))
  const removeAlbum = () => axios.delete(`${process.env.NEXT_PUBLIC_SERVER_API}/albums/${albumDeleted._id}`).then(() => success("Deleted song")).catch(() => wrong("Error")).finally(() => { setRodalDelete(false); getAlbums() })

  return (
    <AdminLayout page="admin-musics" title="Musics">
      <header>
        <div className="category">
          <h1>Albums</h1>
        </div>
        <div className="others">
          <div className="search">
            <input
              type='text'
              placeholder='Search albums here...'
            />
            <HiSearch />
          </div>
        </div>
      </header>
      <div className="content">
        <div className="table">
          <table>
            <thead className="thead">
              <tr className="tr">
                <th className="th">Album</th>
                <th className="th">Songs</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {allAlbums.map((album, i) => (
                <tr className="tr" key={i} >
                  <td className="td">
                    <img src={album.image} alt={album.name} onClick={()=>router.push(`/album/${album._id}`)}/>
                    <div className="name">
                      <h1 onClick={()=>router.push(`/album/${album._id}`)}>{album.name}</h1>
                      <p>{album.singerName.map((n, i) => <span key={i} onClick={() => router.push(`/@${album.singerUsername[i]}`)}>{n + ", "}</span>)}</p>
                    </div>
                  </td>
                  <td className="td">{album.songs.length}</td>
                  <td><button onClick={() => { setRodalDelete(true); setAlbumDeleted(song) }}>Delete</button></td>
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
      <Rodal className="rodal-delete" visible={rodalDelete} onClose={() => setRodalDelete(false)}>
        <h1>Delete it <span>{albumDeleted.name}</span> ?</h1>
        <div className="sure">
          <p>Are you sure you want to delete this song?</p>
          <button onClick={removeAlbum}>delete</button>
        </div>
      </Rodal>
    </AdminLayout>
  );
}
