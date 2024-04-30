import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { v4 as uuid } from 'uuid';
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

import { day, februaryDays, month } from "../../utils/calendar";
import { success, warning, wrong } from "../../utils/toastify";
import { useAuthCreate } from "../../store/zustand";
import useLocalStorage from "../../hooks/useLocalStorage";
import country from "../../utils/country";
import Root from "../../layouts/root";

import { FaUser, FaMale, FaFemale } from "react-icons/fa"
import { PiGenderIntersexBold } from "react-icons/pi"
import { IoIosArrowBack } from "react-icons/io";
import { BiSolidFlag } from "react-icons/bi"
import { HiSearch } from "react-icons/hi"

export default function RegisterAbout() {
    const [accounts, setAccounts] = useLocalStorage("accounts", "null")
    const [token, setToken] = useLocalStorage("token", "null")
    const password = useAuthCreate(state => state.password);
    const email = useAuthCreate(state => state.email);
    const setPage = useAuthCreate(state => state.setPage);
    const page = useAuthCreate(state => state.page);
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const [allCountry, setAllCountry] = useState(country);
    const [newCountry, setNewCountry] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const [selectCountry, setSelectCountry] = useState("country");
    const [ocCountry, setOcCountry] = useState(false);

    const [selectGender, setSelectGender] = useState("gender");
    const [ocGender, setOcGender] = useState(false);

    const [selectBirthDay, setSelectBirthDay] = useState("Day");
    const [ocBirthDay, setOcBirthDay] = useState(false);
    const [selectBirthMonth, setSelectBirthMonth] = useState("Month");
    const [selectBirthMonthNumber, setSelectBirthMonthNumber] = useState(0);
    const [ocBirthMonth, setOcBirthMonth] = useState(false);

    const auth = ({ name, birthyear }) => {
        if (selectCountry == "country") {
            warning("Enter country");
        } else if (selectGender == "gender") {
            warning("Enter gender");
        } else if (selectBirthDay == "Day") {
            warning("Enter birthday");
        } else if (selectBirthMonthNumber == 0) {
            warning("Enter birthday");
        } else if (selectBirthMonthNumber == 2 && selectBirthDay > 29) {
            warning("You entered the wrong birthday");
        } else {
            setLoading(true);
            axios.post(`${process.env.NEXT_PUBLIC_SERVER_API}/users`, {
                name: name,
                email: email,
                password: password,
                status: "basic",
                premium: null,
                role: "user",
                username: uuid().split('-')[4],
                gender: selectGender,
                country: selectCountry,
                birthday: `${birthyear}/${selectBirthMonthNumber}/${selectBirthDay}`,
                image: null,
                banner: null,
                lastSong: null,
                recently: [],
                description: null,
                website: null,
                socials: {
                    youtube: null,
                    instagram: null,
                    facebook: null,
                    telegram: null,
                    spotify: null,
                },
                followers: [],
                following: []
            }, { headers: { 'secret': process.env.NEXT_PUBLIC_SECRET } }).then(({ data }) => {
                const account = { id: data._id, password: data.password }
                setToken(account)

                if (accounts == "null" || accounts.length == 0) {
                    setAccounts([account])
                } else if (accounts.length == 1) {
                    accounts[0].id !== account.id && setAccounts([...accounts, account])
                } else if (accounts.length == 2) {
                    (accounts[0].id !== account.id && accounts[1].id !== account.id) && setAccounts([...accounts, account])
                }

                setTimeout(() => router.push('/home'), 1000)
                success("You a signed up");
            }).catch((err) => {
                err.response.data.message[0] ? wrong(err.response.data.message[0]) : wrong("error")
                console.log(err.response.data, err);
            }).finally(() => setLoading(false))
        }
    }

    function closeAllSelects() {
        setOcBirthMonth(false)
        setOcBirthDay(false)
        setOcCountry(false)
        setOcGender(false)
    }

    useEffect(() => {
        let arr = [];
        for (let i = 0; i < allCountry.length; i++) {
            if (allCountry[i].toUpperCase().startsWith(searchInput.toUpperCase())) arr.push(allCountry[i])
        }
        setNewCountry(arr);
    }, [searchInput]);

    useEffect(() => {
        document.querySelector("input").focus()
    }, [])

    return (
        <Root page="register" title="Tell us about yourself">
            <motion.section
                initial={{ x: 0, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, type: "spring" }}
                className="formes"
            >
                <Link href={"/"} className="logo">
                    <Image src="/lorenzon/white.svg" width={136} height={32} alt="Lorenzon" />
                </Link>
                <div className="wrapper about">
                    <div className="bar">
                        <div className={`line this${page - 1}`} />
                        <div className="back">
                            <IoIosArrowBack onClick={() => setPage(3)} />
                            <div className="step">
                                <p>Step {page - 1} of 3</p>
                                <p>Tell us about yourself</p>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(auth)}>
                        <p>Name</p>
                        <span>This name will appear on your profile</span>
                        <label className="name" htmlFor="name">
                            <FaUser className="faUser" />
                            <input
                                {...register("name", { required: true })}
                                id="name"
                                type="text"
                                placeholder="Enter name"
                            />
                        </label>
                        <p>Country</p>
                        <span>Why do we need your country? <span className="learn">Learn more.</span></span>
                        <label className="country">
                            <BiSolidFlag onClick={() => { closeAllSelects(); setOcCountry(!ocCountry) }} />
                            <div id="select" className="select" onClick={() => { closeAllSelects(); setOcCountry(!ocCountry) }}>
                                <span className={selectCountry == "country" ? "" : "active"} >{selectCountry}</span>
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
                        <p>Gender</p>
                        {/* We use your gender to help personalize our content recommendations and ads for you. */}
                        <span>Why do we need your gender? <span className="learn">Learn more.</span></span>
                        <label className="gender">
                            {selectGender == "male" ? (<FaMale onClick={() => { closeAllSelects(); setOcGender(!ocGender) }} />) : selectGender == "female" ? (<FaFemale onClick={() => { closeAllSelects(); setOcGender(!ocGender) }} />) : (<PiGenderIntersexBold onClick={() => { closeAllSelects(); setOcGender(!ocGender) }} />)}
                            <div id="select" className="select" onClick={() => { closeAllSelects(); setOcGender(!ocGender) }} >
                                <span className={selectGender == "gender" ? "" : "active"} >{selectGender}</span>
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
                        <p>Date of birth</p>
                        <span>Why do we need your date of birth? <span className="learn">Learn more.</span></span>
                        <label className="birthday">
                            <div className="day">
                                <div id="selectBirthDay" className="selectBirthDay" onClick={() => { closeAllSelects(); setOcBirthDay(!ocBirthDay) }}>
                                    <span className={selectBirthDay == "Day" ? "" : "active"}>{selectBirthDay}</span>
                                </div>
                                <div id="content" className={ocBirthDay ? "content active" : "content"} >
                                    <ul id="options">
                                        {selectBirthMonth != "February" ?
                                            day.map(day => (
                                                <li key={day} onClick={() => { setSelectBirthDay(String(day).length < 2 ? `0${day}` : String(day)); setOcBirthDay(false); }} id="selectedItem" >
                                                    <span>{day < 10 ? `0${day}` : String(day)}</span>
                                                </li>
                                            )) : februaryDays.map(day => (
                                                <li key={day} onClick={() => { setSelectBirthDay(String(day).length < 2 ? `0${day}` : String(day)); setOcBirthDay(false); }} id="selectedItem" >
                                                    <span>{day < 10 ? `0${day}` : String(day)}</span>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="month">
                                <div id="selectBirthMonth" className="selectBirthMonth" onClick={() => { closeAllSelects(); setOcBirthMonth(!ocBirthMonth) }}>
                                    <span className={selectBirthMonth == "Month" ? "" : "active"}>{selectBirthMonth}</span>
                                </div>
                                <div id="content" className={ocBirthMonth ? "content active" : "content"} >
                                    <ul id="options">
                                        {month.map(oy => (
                                            <li key={oy.value} onClick={() => { setSelectBirthMonthNumber(oy.value < 10 ? `0${oy.value}` : String(oy.value)); setSelectBirthMonth(oy.label); setOcBirthMonth(false); }} id="selectedItem" >
                                                <span>{oy.label}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <input
                                {...register("birthyear", { required: true })}
                                placeholder="Year"
                                maxLength={4}
                                max={new Date().getFullYear() - 12}
                                min={1900}
                                type="number"
                                id="year"
                            />
                        </label>

                        <button disabled={loading} type="submit">Sign up</button>
                    </form>
                </div>
            </motion.section>
        </Root>
    )
}
