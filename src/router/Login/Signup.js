import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

import photo from "../../images/Login/register.svg";
import { wrong, success, warning } from "../../utility/toastify";
import country from "../../utility/country";

import {
  BiSolidLockAlt,
  BiSolidUser,
  BiSolidLock,
  BiSolidFlag,
  BiSolidCake,
} from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { HiSearch } from "react-icons/hi";
import {
  FaMale,
  FaFemale,
  FaGenderless,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import {
  Timestamp,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";

import {
  auth,
  db,
  providerGoogle,
  providerFacebook,
} from "../../firebase/firebase";

export default function Signup() {
  useEffect(
    () => document.getElementById("root").setAttribute("class", "register"),
    []
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [t, i18n] = useTranslation("global");
  const [eye, setEye] = useState(false);
  const pos = "top-left";

  const [allCountry, setAllCountry] = useState(country);
  const [newCountry, setNewCountry] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [selectCountry, setSelectCountry] = useState(t("login.signup.country"));
  const [ocCountry, setOcCountry] = useState(false);

  const [selectGender, setSelectGender] = useState(t("login.signup.gender"));
  const [ocGender, setOcGender] = useState(false);

  const [birthdayData, setBirthdayData] = useState("");
  const trimmedData = birthdayData.replace(/\s+/g, "");
  const happy =
    trimmedData.substring(6, 10) +
    "-" +
    trimmedData.substring(3, 5) +
    "-" +
    trimmedData.substring(0, 2);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      wrong(t("login.validation.conEqualPass"), pos);
    } else if (
      selectGender == "Gender" ||
      selectGender == "Пол" ||
      selectGender == "Jins"
    ) {
      warning(t("login.validation.enterGender"), pos);
    } else if (birthdayData.length < 14) {
      warning(t("login.validation.birthday"), pos);
    } else if (
      selectCountry == "Country" ||
      selectCountry == "Страна" ||
      selectCountry == "Mamlakat"
    ) {
      warning(t("login.validation.enterCountry"), pos);
    } else {
      try {
        const res = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        await setDoc(doc(db, "users", res.user.uid), {
          birthday: Timestamp.fromDate(new Date(happy)),
          country: selectCountry,
          email: data.email,
          gender: selectGender,
          image: null,
          name: `${data.firstName} ${data.lastName}`,
          password: data.password,
          role: "User",
          status: "basic",
          timeStamp: serverTimestamp(),
        });

        success(t("login.validation.signedup"), pos);

        setTimeout(() => navigate("/login"), 2000);
      } catch (error) {
        wrong(t("login.validation.errorRegister"), pos);
      }
    }
  };

  const authGoogle = () => {
    signInWithPopup(auth, providerGoogle)
      .then(async (result) => {
        success(t("login.validation.signedin"), pos);

        const confirm = result.user.reloadUserInfo;

        await setDoc(doc(db, "users", confirm.localId), {
          birthday: null,
          country: null,
          email: confirm.email,
          gender: null,
          image: confirm.photoUrl,
          name: confirm.displayName,
          password: "GOOGLE",
          role: "User",
          status: "basic",
          timeStamp: serverTimestamp(),
        });

        const docRef = doc(db, "users", confirm.localId);
        const user = await getDoc(docRef);
        const role = user.data().role;

        setTimeout(() => {
          dispatch({ type: "SET_CONFIRM", payload: confirm });
          dispatch({ type: "SET_USER", payload: user.data() });
          role === "Admin" ? navigate("/admin") : navigate("/");
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        wrong("QANDAYDIR XATOLIK YUZ BERDI", pos);
      });
  };

  const authFacebook = () => {
    signInWithPopup(auth, providerFacebook)
      .then(async (result) => {
        success(t("login.validation.signedin"), pos);

        const confirm = result.user;
        console.log(confirm);

        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        console.log(credential);
        console.log(accessToken);

        // await setDoc(doc(db, "users", confirm.localId), {
        //   birthday: null,
        //   country: null,
        //   email: confirm.email,
        //   gender: null,
        //   image: confirm.photoUrl,
        //   name: confirm.displayName,
        //   password: "GOOGLE",
        //   role: "User",
        //   status: "basic",
        //   timeStamp: serverTimestamp(),
        // });

        // const docRef = doc(db, "users", confirm.localId);
        // const user = await getDoc(docRef);
        // const role = user.data().role;

        // setTimeout(() => {
        //   dispatch({ type: "SET_CONFIRM", payload: confirm });
        //   dispatch({ type: "SET_USER", payload: user.data() });
        //   role === "Admin" ? navigate("/admin") : navigate("/");
        // }, 1000);
      })
      .catch((error) => {
        console.log(error);
        wrong("QANDAYDIR XATOLIK YUZ BERDI", pos);
      });
  };

  function handleValidation() {
    let name = errors.firstName || errors.lastName;
    if (name) warning(name.message, pos);
    if (birthdayData.length < 14) warning(t("login.validation.birthday"), pos);

    if (selectGender === t("login.signup.gender"))
      warning(t("login.validation.enterGender"), pos);

    if (selectCountry === t("login.signup.country"))
      warning(t("login.validation.enterCountry"), pos);

    if (errors.email) warning(t("login.validation.email"), pos);
    if (errors.password) {
      if (errors.password.message === "") {
        warning(t("login.validation.password"), pos);
      } else {
        warning(errors.password.message, pos);
      }
    }
    if (errors.confirmPassword) warning(t("login.validation.conpass"), pos);
  }

  let currentYear = new Date().getFullYear();
  function checkBirthdayValue(str, max) {
    if (str.charAt(0) !== "0" || str == "00") {
      let num = parseInt(str);
      if (isNaN(num) || num <= 0 || num > max) num = 1;
      if (
        num > parseInt(max.toString().charAt(0)) &&
        num.toString().length == 1
      ) {
        str = "0" + num;
      } else {
        str = num.toString();
      }
    }
    return str;
  }

  function inpBithday(e) {
    e.target.type = "text";
    let input = e.target.value;
    if (/\D\-$/.test(input)) input = input.substr(0, input.length - 3);
    let values = input.split("-").map(function (v) {
      return v.replace(/\D/g, "");
    });
    if (values[0]) values[0] = checkBirthdayValue(values[0], 31); // day check
    if (values[1]) values[1] = checkBirthdayValue(values[1], 12); // month check
    if (values[1]) values[1] = checkBirthdayValue(values[1], currentYear); // year check
    let output = values.map(function (v, i) {
      return v.length == 2 && i < 2 ? v + " - " : v;
    });
    e.target.value = output.join("").substr(0, 14);
  }

  return (
    <>
      <ToastContainer />
      <main id="register">
        <motion.section
          initial={{ x: "-2rem", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2, type: "spring" }}
          className="images"
        >
          <img src={photo} alt="Logo" />
          <Link to={"/"} className="logo">
            <h1>Lorenzon</h1>
          </Link>
        </motion.section>
        <motion.section
          initial={{ x: "2rem", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2, type: "spring" }}
          className="formes"
        >
          <div className="wrapper">
            <h1>{t("login.signup.title")}</h1>
            <p>{t("login.signup.paragraph")}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="name">
                <label className="firstName" htmlFor="firstName">
                  <BiSolidUser />
                  <input
                    {...register("firstName", {
                      required: t("login.validation.name"),
                      minLength: {
                        value: 4,
                        message: t("login.validation.nameLang"),
                      },
                    })}
                    id="firstName"
                    type="text"
                    placeholder={t("login.signup.firstName")}
                    aria-invalid={errors.firstName ? "true" : "false"}
                  />
                </label>
                <label className="lastName" htmlFor="lastName">
                  <BiSolidUser />
                  <input
                    {...register("lastName", {
                      required: t("login.validation.name"),
                      minLength: {
                        value: 4,
                        message: t("login.validation.nameLang"),
                      },
                    })}
                    id="lastName"
                    type="text"
                    placeholder={t("login.signup.lastName")}
                    aria-invalid={errors.lastName ? "true" : "false"}
                  />
                </label>
              </div>
              <div className="outher">
                <label className="birthday" htmlFor="birthday">
                  <BiSolidCake />
                  <input
                    type="tel"
                    id="birthday"
                    placeholder={t("login.signup.birthdayFormat")}
                    onChange={(e) => {
                      inpBithday(e);
                      setBirthdayData(e.target.value);
                    }}
                  />
                </label>
                <label className="gender">
                  {selectGender === "Male" ? (
                    <FaMale
                      onClick={() => {
                        setOcGender(!ocGender);
                        setOcCountry(false);
                      }}
                    />
                  ) : selectGender === "Female" ? (
                    <FaFemale
                      onClick={() => {
                        setOcGender(!ocGender);
                        setOcCountry(false);
                      }}
                    />
                  ) : (
                    <FaGenderless
                      onClick={() => {
                        setOcGender(!ocGender);
                        setOcCountry(false);
                      }}
                    />
                  )}
                  <div
                    onClick={() => {
                      setOcGender(!ocGender);
                      setOcCountry(false);
                    }}
                    id="select"
                    className="select"
                  >
                    <span
                      className={
                        selectGender == "Gender" ||
                        selectGender == "Пол" ||
                        selectGender == "Jins"
                          ? ""
                          : "active"
                      }
                    >
                      {selectGender === "Male"
                        ? t("login.signup.male")
                        : selectGender === "Female"
                        ? t("login.signup.female")
                        : selectGender}
                    </span>
                  </div>
                  <div
                    id="content"
                    className={ocGender ? "content active" : "content"}
                  >
                    <ul id="options">
                      <li
                        onClick={() => {
                          setSelectGender("Male");
                          setOcGender(false);
                        }}
                        id="selectedItem"
                      >
                        <FaMale />
                        <span>{t("login.signup.male")}</span>
                      </li>
                      <li
                        onClick={() => {
                          setSelectGender("Female");
                          setOcGender(false);
                        }}
                        id="selectedItem"
                      >
                        <FaFemale />
                        <span>{t("login.signup.female")}</span>
                      </li>
                    </ul>
                  </div>
                </label>
              </div>
              <label className="country">
                <BiSolidFlag
                  onClick={() => {
                    setOcCountry(!ocCountry);
                    setOcGender(false);
                  }}
                />
                <div
                  onClick={() => {
                    setOcCountry(!ocCountry);
                    setOcGender(false);
                  }}
                  id="select"
                  className="select"
                >
                  <span
                    className={
                      selectCountry == "Country" ||
                      selectCountry == "Страна" ||
                      selectCountry == "Mamlakat"
                        ? ""
                        : "active"
                    }
                  >
                    {selectCountry}
                  </span>
                  <i id="arrow" className="fa-solid fa-angle-down"></i>
                </div>
                <div
                  id="content"
                  className={ocCountry ? "content active" : "content"}
                >
                  <div className="search">
                    <HiSearch />
                    <input
                      onKeyUp={(e) => setSearchInput(e.target.value)}
                      id="searchCountryInp"
                      type="text"
                      placeholder="Search Country"
                    />
                  </div>
                  <ul id="options">
                    {searchInput === "" ? (
                      allCountry.map((item, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            setSelectCountry(item);
                            setOcCountry(false);
                          }}
                          id="selectedItem"
                        >
                          {item}
                        </li>
                      ))
                    ) : newCountry.length == 0 ? (
                      <li>{t("login.signup.NotCountry")}</li>
                    ) : (
                      newCountry.map((item, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            setSelectCountry(item);
                            setOcCountry(false);
                          }}
                          id="selectedItem"
                        >
                          {item}
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </label>
              <label className="email" htmlFor="email">
                <MdEmail />
                <input
                  {...register("email", { required: true })}
                  id="email"
                  type="email"
                  placeholder={t("login.signup.email")}
                  aria-invalid={errors.email ? "true" : "false"}
                />
              </label>
              <label className="password" htmlFor="password">
                <BiSolidLock />
                <input
                  {...register("password", {
                    required: true,
                    minLength: {
                      value: 8,
                      message: t("login.validation.passLang"),
                    },
                  })}
                  id="password"
                  type={eye ? "text" : "password"}
                  placeholder={t("login.signup.password")}
                  aria-invalid={errors.password ? "true" : "false"}
                />
                {eye ? (
                  <FaEye className="eye" onClick={() => setEye(!eye)} />
                ) : (
                  <FaEyeSlash className="eye" onClick={() => setEye(!eye)} />
                )}
              </label>
              <label className="confirmPassword" htmlFor="confirmPassword">
                <BiSolidLockAlt />
                <input
                  {...register("confirmPassword", { required: true })}
                  id="confirmPassword"
                  type={eye ? "text" : "password"}
                  placeholder={t("login.signup.conpass")}
                  aria-invalid={errors.confirmPassword ? "true" : "false"}
                />
                {eye ? (
                  <FaEye className="eye" onClick={() => setEye(!eye)} />
                ) : (
                  <FaEyeSlash className="eye" onClick={() => setEye(!eye)} />
                )}
              </label>
              <button onClick={handleValidation} type="submit">
                {t("login.signup.sign")}
              </button>
            </form>
            <div className="lines">
              <div className="line-start " />
              <span>{t("login.signup.or")}</span>
              <div className="line-end " />
            </div>
            <div className="providers">
              <button onClick={authGoogle}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M22.501 12.2332C22.501 11.3699 22.4296 10.7399 22.2748 10.0865H12.2153V13.9832H18.12C18.001 14.9515 17.3582 16.4099 15.9296 17.3898L15.9096 17.5203L19.0902 19.935L19.3106 19.9565C21.3343 18.1249 22.501 15.4298 22.501 12.2332Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12.214 22.5C15.1068 22.5 17.5353 21.5666 19.3092 19.9567L15.9282 17.3899C15.0235 18.0083 13.8092 18.4399 12.214 18.4399C9.38069 18.4399 6.97596 16.6083 6.11874 14.0766L5.99309 14.0871L2.68583 16.5954L2.64258 16.7132C4.40446 20.1433 8.0235 22.5 12.214 22.5Z"
                    fill="#34A853"
                  />
                  <path
                    d="M6.12046 14.0767C5.89428 13.4234 5.76337 12.7233 5.76337 12C5.76337 11.2767 5.89428 10.5767 6.10856 9.92337L6.10257 9.78423L2.75386 7.2356L2.64429 7.28667C1.91814 8.71002 1.50146 10.3084 1.50146 12C1.50146 13.6917 1.91814 15.29 2.64429 16.7133L6.12046 14.0767Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12.2141 5.55997C14.2259 5.55997 15.583 6.41163 16.3569 7.12335L19.3807 4.23C17.5236 2.53834 15.1069 1.5 12.2141 1.5C8.02353 1.5 4.40447 3.85665 2.64258 7.28662L6.10686 9.92332C6.97598 7.39166 9.38073 5.55997 12.2141 5.55997Z"
                    fill="#EB4335"
                  />
                </svg>
                <span>Google</span>
              </button>
              <button onClick={authFacebook}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="21"
                  viewBox="0 0 40 40"
                >
                  <linearGradient
                    id="a"
                    x1="-277.375"
                    x2="-277.375"
                    y1="406.6018"
                    y2="407.5726"
                    gradientTransform="matrix(40 0 0 -39.7778 11115.001 16212.334)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stopColor="#0062e0" />
                    <stop offset="1" stopColor="#19afff" />
                  </linearGradient>
                  <path
                    fill="url(#a)"
                    d="M16.7 39.8C7.2 38.1 0 29.9 0 20 0 9 9 0 20 0s20 9 20 20c0 9.9-7.2 18.1-16.7 19.8l-1.1-.9h-4.4l-1.1.9z"
                  />
                  <path
                    fill="#fff"
                    d="m27.8 25.6.9-5.6h-5.3v-3.9c0-1.6.6-2.8 3-2.8H29V8.2c-1.4-.2-3-.4-4.4-.4-4.6 0-7.8 2.8-7.8 7.8V20h-5v5.6h5v14.1c1.1.2 2.2.3 3.3.3 1.1 0 2.2-.1 3.3-.3V25.6h4.4z"
                  />
                </svg>
                <span>Facebook</span>
              </button>
            </div>
            <div className="replacement">
              <span>{t("login.signup.account")} </span>
              <Link to={"/login"}>{t("login.signup.to")}</Link>
            </div>
          </div>
        </motion.section>
      </main>
    </>
  );
}
