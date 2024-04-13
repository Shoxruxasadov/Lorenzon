import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { v4 as uuid } from 'uuid';

import { storage } from "../../../../lib/firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { success, wrong, warning } from "../../../../utils/toastify";
import AdminLayout from "../../../../layouts/admin";

import { FaMale, FaFemale, FaGenderless, FaEye, FaEyeSlash, FaUser, } from "react-icons/fa";
import { BiSolidLockAlt, BiSolidPencil, BiSolidLock, BiSolidFlag } from "react-icons/bi";
import { RiAdminFill, RiUser2Fill } from "react-icons/ri";
import { TbMailFilled } from "react-icons/tb";
import { MdVerifiedUser } from "react-icons/md";
import { HiSearch } from "react-icons/hi"
import axios from "axios";

export default function AddMusic() {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const photoRef = useRef(null);
    const musicRef = useRef(null);
    const router = useRouter()

    const [singers, setSingers] = useState([]);
    const [searchSinger, setSearchSinger] = useState('');
    const [selectSinger, setSelectSinger] = useState([{ name: 'Singer' }]);
    const [ocSinger, setOcSinger] = useState(false);

    const [music, setMusic] = useState('');
    const [photo, setPhoto] = useState('');
    const randomID = uuid().split('-')[4];
    const [disable, setDisable] = useState(false);

    useEffect(() => {
        if (selectSinger.length == 0) {
            setSelectSinger([{ name: 'Singer' }])
        }
    }, [selectSinger])

    function getSingers(inp) {
        setSearchSinger(inp)
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/users/singer/${inp}`)
            .then(({ data }) => setSingers(data)).catch((err) => console.error(err));
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
                                    singer: selectSinger.map(item => item._id),
                                    wrote: ['wrote-first', 'wrote-second'],
                                    source: 'source',
                                    album: 124,
                                    image: downloadImageURL,
                                    song: downloadSongURL,
                                    listenCount: 0,
                                }).then(({data}) => {
                                    success("Created song");
                                    router.push("/admin/musics")
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

    function openProp(prop) {
        if (prop == "singer") {
            setOcSinger(!ocSinger);
        }
    }

    return (
        <AdminLayout page="admin-add-user" title="Add music">
            <header>
                <div className="category">
                    <h1 onClick={() => router.push("/admin/musics")} className="link">
                        Music
                    </h1>
                    <h3>/</h3>
                    <h2>Add</h2>
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
                        <label className="country">
                            <BiSolidFlag onClick={() => openProp("singer")} />
                            <div id="select" className="select" onClick={() => openProp("singer")}>
                                {selectSinger.map(singer => <span style={{ textTransform: "capitalize", cursor: "crosshair" }} className={selectSinger[0].name == "Singer" ? "" : "active"} onClick={() => {
                                    setSelectSinger(selectSinger.filter(item => item._id != singer._id))
                                }}>{singer.name}</span>)}
                            </div>
                            <div id="content" className={ocSinger ? "content active" : "content"}>
                                <div className="search">
                                    <HiSearch />
                                    <input placeholder="Search Country" type="text" onKeyUp={(e) => getSingers(e.target.value)} />
                                </div>
                                <ul id="options">
                                    {searchSinger && (
                                        singers.map((item, index) => (
                                            <li style={{ textTransform: "capitalize" }} key={index} onClick={() => { selectSinger[0].name == "Singer" ? setSelectSinger([item]) : setSelectSinger(prev => [...prev, item]); setOcSinger(false); }} id="selectedItem">
                                                {item.name}
                                            </li>
                                        ))
                                    )}
                                    <li onClick={() => router.push('/admin/users/add')} id="routerSingerAdd">
                                        Add Singer
                                    </li>
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
