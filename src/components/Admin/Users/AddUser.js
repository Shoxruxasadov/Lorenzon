import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Timestamp, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { success, wrong, warning } from "../../../utility/toastify";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import country from "../../../utility/country";

import { RiAdminFill, RiUser2Fill } from "react-icons/ri";
import { HiSearch } from "react-icons/hi";
import { TbMailFilled } from "react-icons/tb";
import { MdVerifiedUser } from "react-icons/md";
import unknown from "../../../images/Admin/unknown.jpg";

import {
  BiSolidLockAlt,
  BiSolidPencil,
  BiSolidLock,
  BiSolidFlag,
  BiSolidCake,
} from "react-icons/bi";

import {
  FaMale,
  FaFemale,
  FaGenderless,
  FaEye,
  FaEyeSlash,
  FaUser,
} from "react-icons/fa";

export default function AddUser() {
  const darkmode = useSelector((state) => state.utilityReducer.darkmode);
  const sidebar = useSelector((state) => state.utilityReducer.sidebar);
  const navigate = useNavigate();
  const [t, i18n] = useTranslation("global");
  const [lang, setLang] = useState(false);
  const [nextProfile, setNextProfile] = useState(false);
  const [eye, setEye] = useState(false);

  const [allCountry, setAllCountry] = useState(country);
  const [newCountry, setNewCountry] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [selectCountry, setSelectCountry] = useState(
    t("admin.adduser.country")
  );
  const [ocCountry, setOcCountry] = useState(false);

  const [selectGender, setSelectGender] = useState(t("admin.adduser.gender"));
  const [ocGender, setOcGender] = useState(false);

  const [selectRole, setSelectRole] = useState(t("admin.adduser.role"));
  const [ocRole, setOcRole] = useState(false);

  useEffect(() => {
    setSelectCountry(t("admin.adduser.country"));
    setSelectGender(t("admin.adduser.gender"));
    setSelectRole(t("admin.adduser.role"));
  }, [lang]);

  const [birthdayData, setBirthdayData] = useState("");
  const trimmedData = birthdayData.replace(/\s+/g, "");
  const happy =
    trimmedData.substring(6, 10) +
    "-" +
    trimmedData.substring(3, 5) +
    "-" +
    trimmedData.substring(0, 2);

  const inputRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [photo, setPhoto] = useState("");
  const [per, setPer] = useState(null);
  const [disable, setDisable] = useState(false);

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      warning(
        t("admin.adduser.validation.conEqualPass"),
        darkmode ? "dark" : "light",
        "top-right"
      );
    } else if (birthdayData.length < 14) {
      warning(
        t("admin.adduser.validation.enterBirthday"),
        darkmode ? "dark" : "light",
        "top-right"
      );
    } else if (
      selectGender == "Gender" ||
      selectGender == "Пол" ||
      selectGender == "Jins"
    ) {
      warning(
        t("admin.adduser.validation.enterGender"),
        darkmode ? "dark" : "light",
        "top-right"
      );
    } else if (
      selectCountry == "Country" ||
      selectCountry == "Страна" ||
      selectCountry == "Mamlakat"
    ) {
      warning(
        t("admin.adduser.validation.enterCountry"),
        darkmode ? "dark" : "light",
        "top-right"
      );
    } else if (
      selectRole == "Role" ||
      selectRole == "Роль" ||
      selectRole == "Rol"
    ) {
      warning(
        t("admin.adduser.validation.enterRole"),
        darkmode ? "dark" : "light",
        "top-right"
      );
    } else {
      setDisable(true);

      try {
        const res = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );

        if (photo) {
          const name = new Date().getTime() + "." + photo.name;
          const storageRef = ref(storage, `users/${name}`);
          const uploadTask = uploadBytesResumable(storageRef, photo);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              setPer(progress);
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
                default:
                  break;
              }
            },
            (error) => {
              wrong(
                t("admin.adduser.validation.noUploadPhoto"),
                darkmode ? "dark" : "light",
                "top-right"
              );
              console.log(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then(
                async (downloadURL) => {
                  await setDoc(doc(db, "users", res.user.uid), {
                    birthday: Timestamp.fromDate(new Date(happy)),
                    country: selectCountry,
                    email: data.email,
                    gender: selectGender,
                    image: downloadURL,
                    name: data.name,
                    password: data.password,
                    role: selectRole,
                    timeStamp: serverTimestamp(),
                  });
                }
              );
            }
          );
        } else {
          await setDoc(doc(db, "users", res.user.uid), {
            birthday: Timestamp.fromDate(new Date(happy)),
            country: selectCountry,
            email: data.email,
            gender: selectGender,
            image: null,
            name: data.name,
            password: data.password,
            role: selectRole,
            timeStamp: serverTimestamp(),
          });
        }

        success(
          t("admin.adduser.validation.addedUser"),
          darkmode ? "dark" : "light",
          "top-right"
        );
        setNextProfile(true);
        setTimeout(() => {
          setDisable(false);
        }, 2000);
      } catch {
        setDisable(false);
        wrong(
          t("admin.adduser.validation.errorRegister"),
          darkmode ? "dark" : "light",
          "top-right"
        );
      }
    }
  };

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

  useEffect(() => {
    let arr = [];
    for (let i = 0; i < allCountry.length; i++) {
      if (allCountry[i].toUpperCase().startsWith(searchInput.toUpperCase())) {
        arr.push(allCountry[i]);
      }
    }
    setNewCountry(arr);
  }, [searchInput]);

  function handleValidation() {
    if (errors.name)
      warning(errors.name.message, darkmode ? "dark" : "light", "top-right");

    if (errors.email)
      warning(
        t("admin.adduser.validation.email"),
        darkmode ? "dark" : "light",
        "top-right"
      );

    if (birthdayData.length < 14)
      warning(
        t("admin.adduser.validation.enterBirthday"),
        darkmode ? "dark" : "light",
        "top-right"
      );

    if (
      selectGender == "Gender" ||
      selectGender == "Пол" ||
      selectGender == "Jins"
    )
      warning(
        t("admin.adduser.validation.enterGender"),
        darkmode ? "dark" : "light",
        "top-right"
      );

    if (
      selectCountry == "Country" ||
      selectCountry == "Страна" ||
      selectCountry == "Mamlakat"
    )
      warning(
        t("admin.adduser.validation.enterCountry"),
        darkmode ? "dark" : "light",
        "top-right"
      );

    if (selectRole == "Role" || selectRole == "Роль" || selectRole == "Rol")
      warning(
        t("admin.adduser.validation.enterRole"),
        darkmode ? "dark" : "light",
        "top-right"
      );

    if (errors.password) {
      if (errors.password.message === "") {
        warning(
          t("admin.adduser.validation.password"),
          darkmode ? "dark" : "light",
          "top-right"
        );
      } else {
        warning(
          errors.password.message,
          darkmode ? "dark" : "light",
          "top-right"
        );
      }
    }
    if (errors.confirmPassword)
      warning(
        t("admin.adduser.validation.conpass"),
        darkmode ? "dark" : "light",
        "top-right"
      );
  }

  return (
    <>
      <ToastContainer />
      <section className={sidebar ? "adout add-user" : "adout add-user active"}>
        <header>
          <div className="category">
            <h1 onClick={() => navigate("/admin/users")} className="link">
              {t("admin.users.title")}
            </h1>
            <h3>/</h3>
            <h2>{t("admin.adduser.title")}</h2>
          </div>
          <div className="others">
            <div className="addUserProgress">
              <div
                className="profile"
                style={
                  !nextProfile
                    ? { color: "#0f54f0" }
                    : { color: darkmode ? "#3b393D" : "#b5b5b5" }
                }
              >
                <div
                  className="number"
                  style={
                    !nextProfile
                      ? { background: "#0f54f0" }
                      : { background: darkmode ? "#3b393D" : "#b5b5b5" }
                  }
                >
                  1
                </div>
                <p>{t("admin.adduser.firstStatus")}</p>
              </div>
              <div className="line" />
              <div
                className="confirmation"
                style={
                  nextProfile
                    ? { color: "#0f54f0" }
                    : { color: darkmode ? "#3b393D" : "#b5b5b5" }
                }
              >
                <div
                  className="number"
                  style={
                    nextProfile
                      ? { background: "#0f54f0" }
                      : { background: darkmode ? "#3b393D" : "#b5b5b5" }
                  }
                >
                  2
                </div>
                <p>{t("admin.adduser.secondStatus")}</p>
              </div>
            </div>
          </div>
        </header>
        <div className="content">
          <div className="head">
            <h1>{t("admin.adduser.basic")}</h1>
          </div>
          <form className="body" onSubmit={handleSubmit(onSubmit)}>
            <div className="photo">
              <div className="top">
                <div className="img" onClick={() => inputRef.current.click()}>
                  <div className="image">
                    <img src={photo ? URL.createObjectURL(photo) : unknown} />
                    <input
                      type="file"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      ref={inputRef}
                    />
                  </div>
                  <div className="change">
                    <BiSolidPencil />
                  </div>
                </div>
                <div className="title">
                  <h1>{t("admin.adduser.profilePhone")}</h1>
                  <p>{t("admin.adduser.titlePhoto")}</p>
                </div>
              </div>
              <div className="submit">
                <button
                  disabled={(per !== null && per < 100) || disable}
                  onClick={handleValidation}
                  type="submit"
                >
                  {t("admin.adduser.continue")}
                </button>
              </div>
            </div>
            <div className="terminal">
              <label htmlFor="name">
                <FaUser className="faUser" />
                <input
                  {...register("name", {
                    required: t("admin.adduser.validation.name"),
                    minLength: {
                      value: 3,
                      message: t("admin.adduser.validation.nameLang"),
                    },
                  })}
                  id="name"
                  type="text"
                  placeholder={t("admin.adduser.name")}
                  aria-invalid={errors.name ? "true" : "false"}
                />
              </label>
              <label htmlFor="email">
                <TbMailFilled />
                <input
                  {...register("email", { required: true })}
                  id="email"
                  type="email"
                  placeholder={t("admin.adduser.email")}
                  aria-invalid={errors.email ? "true" : "false"}
                />
              </label>
              <label className="birthday" htmlFor="birthday">
                <BiSolidCake />
                <input
                  type="tel"
                  id="birthday"
                  placeholder={t("admin.adduser.birthday")}
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
                      setOcRole(false);
                    }}
                  />
                ) : selectGender === "Female" ? (
                  <FaFemale
                    onClick={() => {
                      setOcGender(!ocGender);
                      setOcCountry(false);
                      setOcRole(false);
                    }}
                  />
                ) : (
                  <FaGenderless
                    onClick={() => {
                      setOcGender(!ocGender);
                      setOcCountry(false);
                      setOcRole(false);
                    }}
                  />
                )}
                <div
                  onClick={() => {
                    setOcGender(!ocGender);
                    setOcCountry(false);
                    setOcRole(false);
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
                      ? t("admin.adduser.male")
                      : selectGender === "Female"
                      ? t("admin.adduser.female")
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
                      <span>{t("admin.adduser.male")}</span>
                    </li>
                    <li
                      onClick={() => {
                        setSelectGender("Female");
                        setOcGender(false);
                      }}
                      id="selectedItem"
                    >
                      <FaFemale />
                      <span>{t("admin.adduser.female")}</span>
                    </li>
                  </ul>
                </div>
              </label>
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
                      <li>{t("admin.adduser.notCountry")}</li>
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
              <label className="role">
                {selectRole === "User" ? (
                  <RiUser2Fill
                    onClick={() => {
                      setOcRole(!ocRole);
                      setOcGender(false);
                      setOcCountry(false);
                    }}
                  />
                ) : selectRole === "Admin" ? (
                  <RiAdminFill
                    onClick={() => {
                      setOcRole(!ocRole);
                      setOcGender(false);
                      setOcCountry(false);
                    }}
                  />
                ) : (
                  <MdVerifiedUser
                    onClick={() => {
                      setOcRole(!ocRole);
                      setOcGender(false);
                      setOcCountry(false);
                    }}
                  />
                )}
                <div
                  onClick={() => {
                    setOcRole(!ocRole);
                    setOcGender(false);
                    setOcCountry(false);
                  }}
                  id="selectRole"
                  className="selectRole"
                >
                  <span
                    className={
                      selectRole == "Role" ||
                      selectRole == "Роль" ||
                      selectRole == "Rol"
                        ? ""
                        : "active"
                    }
                  >
                    {selectRole === "User"
                      ? t("admin.adduser.user")
                      : selectRole === "Admin"
                      ? t("admin.adduser.admin")
                      : selectRole}
                  </span>
                </div>
                <div
                  id="content"
                  className={ocRole ? "content active" : "content"}
                >
                  <ul id="options">
                    <li
                      onClick={() => {
                        setSelectRole("User");
                        setOcRole(false);
                      }}
                      id="selectedItem"
                    >
                      <RiUser2Fill />
                      <span>{t("admin.adduser.user")}</span>
                    </li>
                    <li
                      onClick={() => {
                        setSelectRole("Admin");
                        setOcRole(false);
                      }}
                      id="selectedItem"
                    >
                      <RiAdminFill />
                      <span>{t("admin.adduser.admin")}</span>
                    </li>
                  </ul>
                </div>
              </label>
              <label htmlFor="password">
                <BiSolidLock />
                <input
                  {...register("password", {
                    required: true,
                    minLength: {
                      value: 8,
                      message: t("admin.adduser.validation.passLang"),
                    },
                  })}
                  id="password"
                  type={eye ? "text" : "password"}
                  placeholder={t("admin.adduser.password")}
                  aria-invalid={errors.password ? "true" : "false"}
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
                  {...register("confirmPassword", { required: true })}
                  id="conpass"
                  type={eye ? "text" : "password"}
                  placeholder={t("admin.adduser.conpass")}
                  aria-invalid={errors.confirmPassword ? "true" : "false"}
                />
                {eye ? (
                  <FaEye className="eye" onClick={() => setEye(!eye)} />
                ) : (
                  <FaEyeSlash className="eye" onClick={() => setEye(!eye)} />
                )}
              </label>
              <div className="submit">
                <button
                  disabled={(per !== null && per < 100) || disable}
                  onClick={handleValidation}
                  type="submit"
                >
                  {t("admin.adduser.continue")}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
