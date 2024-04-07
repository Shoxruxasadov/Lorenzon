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

import { BiSolidLockAlt, BiSolidPencil, BiSolidLock, BiSolidFlag, BiSolidCake, } from "react-icons/bi";
import { PiCrownSimpleFill, PiStarFill, PiGenderIntersexBold } from "react-icons/pi";
import { FaMale, FaFemale, FaEye, FaEyeSlash, FaUser, } from "react-icons/fa";
import { RiAdminFill, RiUser2Fill } from "react-icons/ri";
import { MdVerifiedUser } from "react-icons/md"; 4
import { TbMailFilled } from "react-icons/tb";
import { SiInstatus } from "react-icons/si";
import { HiSearch } from "react-icons/hi";
import { FaAt } from "react-icons/fa6";

export default function AdminAddUser() {
    const { register, handleSubmit } = useForm();
    const [nextProfile, setNextProfile] = useState(false);
    const [loadImage, setLoadImage] = useState(false);
    const [eye, setEye] = useState(false);
    const router = useRouter()

    const [allCountry, setAllCountry] = useState(country);
    const [newCountry, setNewCountry] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const [selectCountry, setSelectCountry] = useState("country");
    const [ocCountry, setOcCountry] = useState(false);

    const [selectGender, setSelectGender] = useState("gender");
    const [ocGender, setOcGender] = useState(false);

    const [selectRole, setSelectRole] = useState("role");
    const [ocRole, setOcRole] = useState(false);

    const [selectStatus, setSelectStatus] = useState("status");
    const [ocStatus, setOcStatus] = useState(false);

    const [birthdayData, setBirthdayData] = useState("");
    const trimmedData = birthdayData.replace(/\s+/g, "");
    const happy = trimmedData.substring(6, 10) + "/" + trimmedData.substring(3, 5) + "/" + trimmedData.substring(0, 2);

    const imageRef = useRef(null);
    const [photo, setPhoto] = useState("");
    const [per, setPer] = useState(null);
    const [disable, setDisable] = useState(false);
    const radomID = uuid().split('-')[4]

    const imagebase64 = (file) => {
        const render = new FileReader()
        render.readAsDataURL(file)
        const data = new Promise((resolve, reject) => {
            render.onload = () => resolve(render.result)
            render.onerror = error => reject(error)
        })
        return data
    }

    const handeUploadImage = async (e) => {
        const photo = e.target.files[0]

        // Make Image Base64
        // const image = await imagebase64(photo)
        // setPhoto(image);

        if (photo) {
            const storageRef = ref(storage, `users/${radomID}.${photo.name}`);
            const uploadTask = uploadBytesResumable(storageRef, photo);

            uploadTask.on("state_changed",
                () => setLoadImage(true),
                (error) => {
                    wrong("Error");
                    console.log(error);
                    setLoadImage(false)
                }, () => getDownloadURL(uploadTask.snapshot.ref).then(
                    async (downloadURL) => {
                        setPhoto(downloadURL)
                        setLoadImage(false)
                    }
                )
            );
        } else {
            warning('Not image selected')
        }
    }

    const onSubmit = async (data) => {
        if (!data.name) {
            warning("Enter Name");
        } else if (!data.email) {
            warning("Enter Email");
        } else if (data.username && data.username.length < 4) {
            warning("Enter Username");
        } else if (selectStatus == "status") {
            warning("Enter Status");
        } else if (selectRole == "role") {
            warning("Enter Role");
        } else if (!data.password) {
            warning("Enter Password");
        } else if (data.password.length < 8 || data.password.length > 20) {
            warning("Enter Password must 8 to 20");
        } else if (data.password !== data.confirmPassword) {
            warning("No equal password");
        } else {
            setDisable(true);
            axios.post(`${process.env.NEXT_PUBLIC_SERVER_API}/users`, {
                name: data.name,
                email: data.email,
                password: data.password,
                status: selectStatus,
                role: selectRole,
                username: data.username || radomID,
                gender: selectGender == "gender" ? null : selectGender,
                country: selectCountry == "country" ? null : selectCountry,
                birthday: happy.length < 10 ? null : happy,
                image: photo || null,
                banner: null
            }).then(() => {
                success("Created user");
                router.push("/admin/users")
            }).catch((err) => {
                err.response.data.message[0] ? wrong(err.response.data.message[0]) : wrong("error")
                console.log(err.response.data);
            }).finally(() => setDisable(false))
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
            setOcRole(false);
            setOcStatus(false);

        }
        if (prop == "gender") {
            setOcGender(!ocGender);
            setOcCountry(false);
            setOcRole(false);
            setOcStatus(false);
        }
        if (prop == "role") {
            setOcRole(!ocRole);
            setOcGender(false);
            setOcCountry(false);
            setOcStatus(false);
        }
        if (prop == "status") {
            setOcStatus(!ocStatus);
            setOcRole(false);
            setOcGender(false);
            setOcCountry(false);
        }
    }

    return (
        <AdminLayout page="admin-add-user" title="Add user">
            <header>
                <div className="category">
                    <h1 onClick={() => router.push("/admin/users")} className="link">Users</h1>
                    <h3>/</h3>
                    <h2>Add user</h2>
                </div>
                <div className="others">
                    <div className="addUserProgress">
                        <div className="profile" style={!nextProfile ? { color: "#0f54f0" } : { color: "#3b393D" }} >
                            <div className="number" style={!nextProfile ? { background: "#0f54f0" } : { background: "#3b393D" }} >1</div>
                            <p>Profile</p>
                        </div>
                        <div className="line" />
                        <div className="confirmation" style={nextProfile ? { color: "#0f54f0" } : { color: "#3b393D" }} >
                            <div className="number" style={nextProfile ? { background: "#0f54f0" } : { background: "#3b393D" }} >2</div>
                            <p>Confirmation</p>
                        </div>
                    </div>
                </div>
            </header>
            <div className="content">
                <div className="head">
                    <h1>Basic Information</h1>
                </div>
                <form className="body" onSubmit={handleSubmit(onSubmit)}>
                    <div className="photo">
                        <div className="top">
                            <div className="img" onClick={() => imageRef.current.click()}>
                                <div className="image">
                                    <img src={photo ? photo : "/other/not.user.webp"} alt="User Photo" />
                                    <input type="file" onChange={handeUploadImage} ref={imageRef} />
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
                            <button disabled={(per !== null && per < 100) || disable} type="submit">Continue</button>
                        </div>
                    </div>
                    <div className="terminal">
                        <label htmlFor="name">
                            <FaUser className="faUser" />
                            <input
                                {...register("name")}
                                placeholder="Name"
                                type="text"
                            />
                        </label>
                        <label htmlFor="email">
                            <TbMailFilled />
                            <input
                                {...register("email")}
                                placeholder="Email"
                                type="email"
                            />
                        </label>
                        <label htmlFor="username">
                            <FaAt />
                            <input
                                {...register("username")}
                                placeholder="Username"
                                type="text"
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
                                        allCountry.map((item, index) => (
                                            <li style={{ textTransform: "capitalize" }} key={index} onClick={() => { setSelectCountry(item); setOcCountry(false); }} id="selectedItem">{item}</li>
                                        ))
                                    ) : newCountry.length == 0 ? (
                                        <li className="found">Country not found 😕</li>
                                    ) : (
                                        newCountry.map((item, index) => (
                                            <li style={{ textTransform: "capitalize" }} key={index} onClick={() => { setSelectCountry(item); setOcCountry(false); }} id="selectedItem">{item}</li>
                                        ))
                                    )}
                                </ul>
                            </div>
                        </label>
                        <label className="role">
                            {selectRole === "user" ? (<RiUser2Fill onClick={() => openProp("role")} />) : selectRole === "admin" ? (<RiAdminFill onClick={() => openProp("role")} />) : (<MdVerifiedUser onClick={() => openProp("role")} />)}
                            <div id="selectRole" className="selectRole" onClick={() => openProp("role")}>
                                <span style={{ textTransform: "capitalize" }} className={selectRole == "role" ? "" : "active"}>{selectRole}</span>
                            </div>

                            <div id="content" className={ocRole ? "content active" : "content"} >
                                <ul id="options">
                                    <li onClick={() => { setSelectRole("user"); setOcRole(false); }} id="selectedItem" >
                                        <RiUser2Fill />
                                        <span>User</span>
                                    </li>
                                    <li onClick={() => { setSelectRole("admin"); setOcRole(false); }} id="selectedItem" >
                                        <RiAdminFill />
                                        <span>Admin</span>
                                    </li>
                                </ul>
                            </div>
                        </label>
                        <label htmlFor="password">
                            <BiSolidLock />
                            <input
                                {...register("password")}
                                placeholder="Password"
                                type={eye ? "text" : "password"}
                            />
                            {eye ? (
                                <FaEye className="eye" onClick={() => setEye(!eye)} />
                            ) : (
                                <FaEyeSlash className="eye" onClick={() => setEye(!eye)} />
                            )}
                        </label>
                        <label htmlFor="conpass">
                            <BiSolidLockAlt />
                            <input
                                {...register("confirmPassword")}
                                placeholder="Confirm Password"
                                type={eye ? "text" : "password"}
                            />
                            {eye ? (
                                <FaEye className="eye" onClick={() => setEye(!eye)} />
                            ) : (
                                <FaEyeSlash className="eye" onClick={() => setEye(!eye)} />
                            )}
                        </label>
                        <div className="submit">
                            <button disabled={(per !== null && per < 100) || disable} type="submit">Continue</button>
                        </div>
                    </div>
                </form>
            </div >
            {
                loadImage && <div className="loading">
                    <span className="loader"></span>
                </div>
            }
        </AdminLayout >
    );
}