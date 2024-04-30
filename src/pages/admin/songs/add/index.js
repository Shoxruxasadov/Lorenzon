import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { v4 as uuid } from 'uuid';
import axios from "axios";

import { storage } from "../../../../lib/firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { success, wrong, warning } from "../../../../utils/toastify";
import AdminLayout from "../../../../layouts/admin";

import { BiSolidLockAlt, BiSolidPencil, BiSolidLock, BiSolidFlag, BiSolidCake, } from "react-icons/bi";
import { FaMale, FaFemale, FaGenderless, FaEye, FaEyeSlash, FaUser, } from "react-icons/fa";
import { RiAdminFill, RiUser2Fill, RiNeteaseCloudMusicFill, RiAlbumFill } from "react-icons/ri";
import { TbMailFilled } from "react-icons/tb";
import { MdVerifiedUser } from "react-icons/md";
import { LiaPencilRulerSolid } from "react-icons/lia";
import { SiSourceengine } from "react-icons/si"
import { HiSearch } from "react-icons/hi"

export default function AddMusic() {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const photoRef = useRef(null);
    const musicRef = useRef(null);
    const router = useRouter()

    const [singers, setSingers] = useState([]);
    const [searchSinger, setSearchSinger] = useState('');
    const [selectSinger, setSelectSinger] = useState([{ name: 'Singer' }]);
    const [ocSinger, setOcSinger] = useState(false);

    const [selectWritten, setSelectWritten] = useState(['Written']);
    const [ocWritten, setOcWritten] = useState(false);

    const [albums, setAlbums] = useState([]);
    const [searchAlbum, setSearchAlbum] = useState('');
    const [selectAlbum, setSelectAlbum] = useState({ name: 'Album' });
    const [ocAlbum, setOcAlbum] = useState(false);

    const [birthdayData, setBirthdayData] = useState("");
    const trimmedData = birthdayData.replace(/\s+/g, "");
    const createdDay = trimmedData.substring(6, 10) + "/" + trimmedData.substring(3, 5) + "/" + trimmedData.substring(0, 2);

    const [music, setMusic] = useState('');
    const [photo, setPhoto] = useState('');
    const randomID = uuid().split('-')[4];
    const [disable, setDisable] = useState(false);

    useEffect(() => {
        if (selectSinger.length == 0) setSelectSinger([{ name: 'Singer' }])
    }, [selectSinger])

    useEffect(() => {
        if (selectWritten.length == 0) setSelectWritten(['Written'])
    }, [selectWritten])

    function getSingers(inp) {
        if(!inp) return
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/users/singer/${inp}`)
            .then(({ data }) => setSingers(data)).catch((err) => console.error(err));
    }

    function getAlbums(inp) {
        if(!inp) return
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/albums/name/${inp}`)
            .then(({ data }) => setAlbums(data)).catch((err) => console.error(err));
    }


    const onSubmit = (data) => {
        if (photo && music) {
            setDisable(true);
            const storagePhotoRef = ref(storage, `albums/${randomID}.${photo.name}`);
            const uploadPhotoTask = uploadBytesResumable(storagePhotoRef, photo);

            uploadPhotoTask.on("state_changed",
                (snapshot) => console.log(snapshot),
                (error) => {
                    wrong("Error: no upload image");
                    console.log(error);
                }, () => getDownloadURL(uploadPhotoTask.snapshot.ref).then(
                    async (downloadImageURL) => {
                        const storageMusicRef = ref(storage, `songs/${randomID}.${music.name}`);
                        const uploadMusicTask = uploadBytesResumable(storageMusicRef, music);

                        uploadMusicTask.on("state_changed",
                            (snapshot) => console.log(snapshot),
                            (error) => {
                                wrong("Error: no upload song");
                                console.log(error);
                            }, () => getDownloadURL(uploadMusicTask.snapshot.ref).then(
                                async (downloadSongURL) => axios.post(`${process.env.NEXT_PUBLIC_SERVER_API}/songs`, {
                                    name: data.name,
                                    singerId: selectSinger.map(item => item._id),
                                    singerName: selectSinger.map(item => item.name),
                                    singerUsername: selectSinger.map(item => item.username),
                                    wrote: selectWritten,
                                    source: data.source,
                                    album: selectAlbum._id || null,
                                    image: downloadImageURL,
                                    song: downloadSongURL,
                                    createdDay: createdDay,
                                    listenCount: 0,
                                }).then(({ data }) => {
                                    success("Created song");
                                    router.push("/admin/songs")
                                }).catch((err) => {
                                    err.response.data.message[0] ? wrong(err.response.data.message[0]) : wrong("error")
                                    console.log(err.response.data);
                                }).finally(() => setDisable(false))
                            )
                        );
                    }
                )
            );
        } else {
            wrong("No upload image or song");
        }
    }

    const currentYear = new Date().getFullYear();
    function checkBirthdayValue(str, max) {
        if (str.charAt(0) !== "0" || str == "00") {
            let num = parseInt(str);
            if (isNaN(num) || num <= 0 || num > max) num = 1;
            num > parseInt(max.toString().charAt(0)) && num.toString().length == 1 ? str = "0" + num : str = num.toString();
        }
        return str;
    }

    function inpBithday(e) {
        e.target.type = "text";
        let input = e.target.value;
        if (/\D\-$/.test(input)) input = input.substr(0, input.length - 3);
        let values = input.split("-").map((v) => v.replace(/\D/g, ""))
        if (values[0]) values[0] = checkBirthdayValue(values[0], 31); // day check
        if (values[1]) values[1] = checkBirthdayValue(values[1], 12); // month check
        if (values[1]) values[1] = checkBirthdayValue(values[1], currentYear); // year check
        let output = values.map((v, i) => v.length == 2 && i < 2 ? v + " - " : v);
        e.target.value = output.join("").substr(0, 14);
    }

    function openProp(prop) {
        if (prop == "singer") {
            setOcSinger(!ocSinger);
            setOcWritten(false);
            setOcAlbum(false);
        }
        if (prop == 'written') {
            setOcWritten(!ocWritten);
            setOcSinger(false);
            setOcAlbum(false);
        }
        if (prop == 'album') {
            setOcAlbum(!ocAlbum);
            setOcSinger(false);
            setOcWritten(false);
        }
    }

    return (
        <AdminLayout page="admin-add-music" title="Add music">
            <header>
                <div className="category">
                    <h1 onClick={() => router.push("/admin/songs")} className="link">
                        Songs
                    </h1>
                    <h3>/</h3>
                    <h2>Add song</h2>
                </div>
            </header>
            <div className="content">
                <div className="head">
                    <h1>Basic</h1>
                </div>
                <form className="body" onSubmit={handleSubmit(onSubmit)}>
                    <div className="photo">
                        <div className="top">
                            <div className="muz">
                                <div className="music" onClick={() => musicRef.current.click()}>
                                    <div
                                        className="dribble"
                                        onDragOver={event => event.preventDefault()}
                                        onDrop={event => {
                                            event.preventDefault();
                                            const { files } = event.dataTransfer;
                                            files.length > 0 && setMusic(files[0]);
                                        }}
                                    >
                                        <input
                                            id="fileMusic"
                                            type="file"
                                            ref={musicRef}
                                            onChange={({ target }) => setMusic(target.files[0])}
                                        />
                                        <button type="button">Select File</button>
                                        <label htmlFor="fileMusic">{music.name}</label>
                                    </div>
                                </div>
                            </div>
                            <div className="img" onClick={() => photoRef.current.click()}>
                                <div
                                    className="image"
                                    onDragOver={event => event.preventDefault()}
                                    onDrop={event => {
                                        event.preventDefault();
                                        const { files } = event.dataTransfer;
                                        files.length > 0 && setPhoto(files[0]);
                                    }}
                                >
                                    <img
                                        src={photo ? URL.createObjectURL(photo) : "/other/unknown.music.webp"}
                                        alt="Photo"
                                        style={{ borderRadius: "8px" }}
                                    />
                                    <input
                                        type="file"
                                        ref={photoRef}
                                        onChange={({ target }) => setPhoto(target.files[0])}
                                    />
                                </div>
                                <div className="change">
                                    <BiSolidPencil />
                                </div>
                            </div>
                        </div>
                        <div className="submit">
                            <button
                                disabled={disable}
                                type="submit"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                    <div className="terminal">
                        <label htmlFor="name">
                            <FaUser className="faUser" />
                            <input
                                {...register("name")}
                                placeholder='Name'
                                type="text"
                                id="name"
                            />
                        </label>
                        <label className="singers">
                            <RiNeteaseCloudMusicFill onClick={() => openProp("singer")} />
                            <div id="select" className="select" onClick={() => openProp("singer")}>
                                {selectSinger.map((singer, index) => <span key={index} className={selectSinger[0].name == "Singer" ? "" : "active"} onClick={() => {
                                    setSelectSinger(selectSinger.filter(item => item._id != singer._id))
                                }}>{singer.name}</span>)}
                            </div>
                            <div id="content" className={ocSinger ? "content active" : "content"}>
                                <div className="search">
                                    <HiSearch />
                                    <input placeholder="Search Singer" type="text" onKeyUp={(e) => getSingers(e.target.value)} onChange={(e) => setSearchSinger(e.target.value)} value={searchSinger} />
                                </div>
                                <ul id="options">
                                    {searchSinger && (
                                        singers.map((item, index) => (
                                            <li style={{ textTransform: "capitalize" }} key={index} onClick={() => { selectSinger[0].name == "Singer" ? setSelectSinger([item]) : setSelectSinger(prev => [...prev, item]); setOcSinger(false); setSearchSinger('') }} id="selectedItem">
                                                <img src={item.image || "/other/unknown.music.webp"} alt="singer" style={{ borderRadius: "50%", marginRight: "10px" }} width={30} height={30} />
                                                <p>{item.name}</p>
                                            </li>
                                        ))
                                    )}
                                    <li onClick={() => router.push('/admin/singers/add')} id="routerSingerAdd">
                                        Add Singer
                                    </li>
                                </ul>
                            </div>
                        </label>
                        <label htmlFor="source">
                            <SiSourceengine />
                            <input
                                {...register("source")}
                                placeholder='Source'
                                type="text"
                                id="source"
                            />
                        </label>
                        <label className="written">
                            <LiaPencilRulerSolid onClick={() => openProp("written")} />
                            <div id="select" className="select" onClick={() => openProp("written")}>
                                {selectWritten.map((written, index) => <span key={index} className={selectWritten[index] == "Written" ? "" : "active"} onClick={() => {
                                    setSelectWritten(selectWritten.filter(item => item != written))
                                }}>{written}</span>)}
                            </div>
                            <div id="content" className={ocWritten ? "content active" : "content"}>
                                <div className="search">
                                    <HiSearch />
                                    <input placeholder="Enter Written" type="text" onKeyUp={(e) => {
                                        if (e.key == 'Enter') {
                                            if (selectWritten[0] == 'Written') {
                                                setSelectWritten([e.target.value])
                                            } else {
                                                setSelectWritten([...selectWritten, e.target.value])
                                            }
                                            e.target.value = ""
                                        }
                                    }} />
                                </div>
                            </div>
                        </label>
                        <label className="birthday" htmlFor="birthday">
                            <BiSolidCake />
                            <input
                                onChange={(e) => { inpBithday(e); setBirthdayData(e.target.value); }}
                                placeholder="DD - MM - YYYY"
                                type="tel"
                                id="birthday"
                            />
                        </label>
                        <label className="albums">
                            <RiAlbumFill onClick={() => openProp("album")} />
                            <div id="select" className="select" onClick={() => openProp("album")}>
                                <span className={selectAlbum.name == "Album" ? "" : "active"}>{selectAlbum.name}</span>
                            </div>
                            <div id="content" className={ocAlbum ? "content active" : "content"}>
                                <div className="search">
                                    <HiSearch />
                                    <input placeholder="Search Album" type="text" onKeyUp={(e) => getAlbums(e.target.value)} onChange={(e) => setSearchAlbum(e.target.value)} value={searchAlbum} />
                                </div>
                                <ul id="options">
                                    {searchAlbum && (
                                        albums.map((item, index) => (
                                            <li style={{ textTransform: "capitalize" }} key={index} onClick={() => { setSelectAlbum(item); setOcAlbum(false); setSearchAlbum('') }} id="selectedItem">
                                                <img src={item.image || "/other/unknown.music.webp"} alt="album" style={{ borderRadius: "50%", marginRight: "10px" }} width={30} height={30} />
                                                <p>{item.name}</p>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>
                        </label>
                        <div className="submit">
                            <button
                                disabled={disable}
                                type="submit"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
