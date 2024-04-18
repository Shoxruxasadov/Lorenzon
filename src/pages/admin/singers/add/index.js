import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { v4 as uuid } from 'uuid';
import axios from "axios";

import { storage } from "../../../../lib/firebase/firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { warning, wrong, success } from "../../../../utils/toastify";
import AdminLayout from "../../../../layouts/admin";
import country from "../../../../utils/country";

import { BiSolidPencil, BiSolidLock, BiSolidFlag, BiSolidCake, } from "react-icons/bi";
import { PiCrownSimpleFill, PiStarFill, PiGenderIntersexBold } from "react-icons/pi";
import { FaMale, FaFemale, FaEye, FaEyeSlash, FaUser, } from "react-icons/fa";
import { TbMailFilled } from "react-icons/tb";
import { SiInstatus } from "react-icons/si";
import { HiSearch } from "react-icons/hi";
import { FaAt } from "react-icons/fa6";

export default function AdminAddSinger() {
    const { register, handleSubmit } = useForm();
    const [eye, setEye] = useState(false);
    const router = useRouter()

    const [allCountry, setAllCountry] = useState(country);
    const [newCountry, setNewCountry] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const [selectCountry, setSelectCountry] = useState("country");
    const [ocCountry, setOcCountry] = useState(false);

    const [selectGender, setSelectGender] = useState("gender");
    const [ocGender, setOcGender] = useState(false);

    const [selectStatus, setSelectStatus] = useState("status");
    const [ocStatus, setOcStatus] = useState(false);

    const [birthdayData, setBirthdayData] = useState("");
    const trimmedData = birthdayData.replace(/\s+/g, "");
    const happy = trimmedData.substring(6, 10) + "/" + trimmedData.substring(3, 5) + "/" + trimmedData.substring(0, 2);

    const [disable, setDisable] = useState(false);
    const [photo, setPhoto] = useState("");
    const randomID = uuid().split('-')[4];
    const imageRef = useRef(null);

    const onSubmit = async (data) => {
        if (!data.name) {
            warning("Enter Name");
        } else if (!data.email) {
            warning("Enter Email");
        } else if (data.username && data.username.length < 4) {
            warning("Enter Username");
        } else if (selectStatus == "status") {
            warning("Enter Status");
        } else if (!data.password) {
            warning("Enter Password");
        } else if (data.password.length < 8 || data.password.length > 20) {
            warning("Enter Password must 8 to 20");
        }else {
            setDisable(true);

            const addUserRequest = (image) => axios.post(`${process.env.NEXT_PUBLIC_SERVER_API}/users`, {
                name: data.name,
                email: data.email,
                password: data.password,
                status: selectStatus,
                role: 'singer',
                username: data.username || randomID,
                gender: selectGender == "gender" ? null : selectGender,
                country: selectCountry == "country" ? null : selectCountry,
                birthday: happy.length < 10 ? null : happy,
                image: image || null,
                banner: null
            }).then(() => {
                success("Created user");
                router.push("/admin/singers")
            }).catch((err) => {
                err.response.data.message[0] ? wrong(err.response.data.message[0]) : wrong("error")
                console.log(err.response.data);
            }).finally(() => setDisable(false))


            if (photo) {
                const storageRef = ref(storage, `users/${randomID}.${photo.name}`);
                const uploadTask = uploadBytesResumable(storageRef, photo);

                uploadTask.on("state_changed",
                    (snapshot) => console.log(snapshot),
                    (error) => {
                        wrong("Error: no upload image");
                        console.log(error);
                    }, () => getDownloadURL(uploadTask.snapshot.ref).then(
                        async (downloadURL) => addUserRequest(downloadURL)
                    )
                );
            } else {
                addUserRequest()
            }
        }
    }

    useEffect(() => {
        let arr = [];
        for (let i = 0; i < allCountry.length; i++) {
            if (allCountry[i].toUpperCase().startsWith(searchInput.toUpperCase())) arr.push(allCountry[i])
        }
        setNewCountry(arr);
    }, [searchInput]);

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
        if (prop == "country") {
            setOcCountry(!ocCountry);
            setOcGender(false);
            setOcStatus(false);
        }
        if (prop == "gender") {
            setOcGender(!ocGender);
            setOcCountry(false);
            setOcStatus(false);
        }
        if (prop == "status") {
            setOcStatus(!ocStatus);
            setOcGender(false);
            setOcCountry(false);
        }
    }

    return (
        <AdminLayout page="admin-add-user" title="Add user">
            <header>
                <div className="category">
                    <h1 onClick={() => router.push("/admin/singers")} className="link">Singers</h1>
                    <h3>/</h3>
                    <h2>Add singer</h2>
                </div>
            </header>
            <div
                className="content"
                onDragOver={event => event.preventDefault()}
                onDrop={event => {
                    event.preventDefault();
                    const { files } = event.dataTransfer;
                    files.length > 0 && setPhoto(files[0]);
                }}>
                <div className="head">
                    <h1>Basic Information</h1>
                </div>
                <form className="body" onSubmit={handleSubmit(onSubmit)}>
                    <div className="photo">
                        <div className="top">
                            <div className="img" onClick={() => imageRef.current.click()}>
                                <div className="image">
                                    <img src={photo ? URL.createObjectURL(photo) : "/other/unknown.user.webp"} alt="User Photo" />
                                    <input type="file" onChange={({ target }) => setPhoto(target.files[0])} ref={imageRef} />
                                </div>
                                <div className="change">
                                    <BiSolidPencil />
                                </div>
                            </div>
                            <div className="title">
                                <h1>Profile photo</h1>
                                <p>This will be displayed on your profile.</p>
                            </div>
                        </div>
                        <div className="submit">
                            <button disabled={disable} type="submit">Continue</button>
                        </div>
                    </div>
                    <div className="terminal">
                        <label htmlFor="name">
                            <FaUser className="faUser" />
                            <input
                                {...register("name")}
                                placeholder="Name"
                                type="text"
                                id="name"
                            />
                        </label>
                        <label htmlFor="email">
                            <TbMailFilled />
                            <input
                                {...register("email")}
                                placeholder="Email"
                                type="email"
                                id="email"
                            />
                        </label>
                        <label htmlFor="username">
                            <FaAt />
                            <input
                                {...register("username")}
                                placeholder="Username"
                                type="text"
                                id="username"
                            />
                        </label>
                        <label className="status">
                            {selectStatus == "basic" ? (<PiStarFill onClick={() => openProp("status")} />) : selectStatus == "premium" ? (<PiCrownSimpleFill onClick={() => openProp("status")} />) : (<SiInstatus onClick={() => openProp("status")} />)}
                            <div id="select" className="select" onClick={() => openProp("status")}>
                                <span style={{ textTransform: "capitalize" }} className={selectStatus == "status" ? "" : "active"} >{selectStatus}</span>
                            </div>
                            <div id="content" className={ocStatus ? "content active" : "content"}>
                                <ul id="options">
                                    <li onClick={() => { setSelectStatus("basic"); setOcStatus(false); }} id="selectedItem" >
                                        <PiStarFill />
                                        <span>Basic</span>
                                    </li>
                                    <li onClick={() => { setSelectStatus("premium"); setOcStatus(false); }} id="selectedItem" >
                                        <PiCrownSimpleFill />
                                        <span>Premium</span>
                                    </li>
                                </ul>
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
                        <label className="gender">
                            {selectGender == "male" ? (<FaMale onClick={() => openProp("gender")} />) : selectGender == "female" ? (<FaFemale onClick={() => openProp("gender")} />) : (<PiGenderIntersexBold onClick={() => openProp("gender")} />)}
                            <div id="select" className="select" onClick={() => openProp("gender")}>
                                <span style={{ textTransform: "capitalize" }} className={selectGender == "gender" ? "" : "active"} >{selectGender}</span>
                            </div>
                            <div id="content" className={ocGender ? "content active" : "content"}>
                                <ul id="options">
                                    <li onClick={() => { setSelectGender("male"); setOcGender(false); }} id="selectedItem" >
                                        <FaMale />
                                        <span>Male</span>
                                    </li>
                                    <li onClick={() => { setSelectGender("female"); setOcGender(false); }} id="selectedItem" >
                                        <FaFemale />
                                        <span>Female</span>
                                    </li>
                                </ul>
                            </div>
                        </label>
                        <label className="country">
                            <BiSolidFlag onClick={() => openProp("country")} />
                            <div id="select" className="select" onClick={() => openProp("country")}>
                                <span style={{ textTransform: "capitalize" }} className={selectCountry == "country" ? "" : "active"} >{selectCountry}</span>
                                <i id="arrow" className="fa-solid fa-angle-down"></i>
                            </div>
                            <div id="content" className={ocCountry ? "content active" : "content"}>
                                <div className="search">
                                    <HiSearch />
                                    <input placeholder="Search Country" type="text" onKeyUp={(e) => setSearchInput(e.target.value)} />
                                </div>
                                <ul id="options">
                                    {searchInput === "" ? (
                                        allCountry.map((item, i) => (
                                            <li key={i} style={{ textTransform: "capitalize" }} onClick={() => { setSelectCountry(item); setOcCountry(false); }} id="selectedItem">{item}</li>
                                        ))
                                    ) : newCountry.length == 0 ? (
                                        <li className="found">Country not found 😕</li>
                                    ) : (
                                        newCountry.map((item, i) => (
                                            <li key={i} style={{ textTransform: "capitalize" }} onClick={() => { setSelectCountry(item); setOcCountry(false); }} id="selectedItem">{item}</li>
                                        ))
                                    )}
                                </ul>
                            </div>
                        </label>
                        <label htmlFor="password">
                            <BiSolidLock />
                            <input
                                {...register("password")}
                                placeholder="Password"
                                type={eye ? "text" : "password"}
                                id="password"
                            />
                            {eye ? (
                                <FaEye className="eye" onClick={() => setEye(!eye)} />
                            ) : (
                                <FaEyeSlash className="eye" onClick={() => setEye(!eye)} />
                            )}
                        </label>
                        <div className="submit">
                            <button disabled={disable} type="submit">Continue</button>
                        </div>
                    </div>
                </form>
            </div >
        </AdminLayout >
    );
}