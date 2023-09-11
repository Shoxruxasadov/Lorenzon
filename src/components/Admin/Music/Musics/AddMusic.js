import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Timestamp, doc, serverTimestamp, setDoc } from "firebase/firestore";
import {
  db,
  storage,
  database,
  dbRef,
  dbSet,
} from "../../../../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { success, wrong, warning } from "../../../../utility/toastify";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import country from "../../../../utility/country";

import { RiAdminFill, RiUser2Fill } from "react-icons/ri";
import { HiSearch } from "react-icons/hi";
import { TbMailFilled } from "react-icons/tb";
import { MdVerifiedUser } from "react-icons/md";
import unknown from "../../../../images/Admin/unknown.jpg";
import api from "../../../../api/instance";

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

export default function AddMusic() {
  const sidebar = useSelector((state) => state.utilityReducer.sidebar);
  const navigate = useNavigate();
  const [t, i18n] = useTranslation("global");
  const [eye, setEye] = useState(false);
  const photoRef = useRef(null);
  const musicRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [allCountry, setAllCountry] = useState(country);
  const [newCountry, setNewCountry] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [ocCountry, setOcCountry] = useState(false);

  const [selectGender, setSelectGender] = useState(t("admin.adduser.gender"));
  const [ocGender, setOcGender] = useState(false);

  const [selectRole, setSelectRole] = useState(t("admin.adduser.role"));
  const [ocRole, setOcRole] = useState(false);

  const [photo, setPhoto] = useState("");
  const [music, setMusic] = useState("");

  const [files, setFiles] = useState([]);
  const [photoUpload, setPhotoUpload] = useState("");
  const [per, setPer] = useState(null);
  const [disable, setDisable] = useState(false);

  const handleDragOver = (event) => event.preventDefault();

  const handleDrop = (event) => {
    event.preventDefault();
    const { files } = event.dataTransfer;
    if (files.length > 0) {
      setFiles(files[0]);
    }
  };

  useEffect(() => {
    setSelectGender(t("admin.adduser.gender"));
    setSelectRole(t("admin.adduser.role"));
  }, [t]);

  const onSubmit = (data) => {
    setDisable(true);

    console.log(data);

    try {
      const photoName = new Date().getTime() + "." + photoUpload.name;
      const photoStorageRef = ref(storage, `albums/${photoName}`);
      const photoUploadTask = uploadBytesResumable(
        photoStorageRef,
        photoUpload
      );

      const musicName = new Date().getTime() + "." + files.name;
      const musicStorageRef = ref(storage, `songs/${musicName}`);
      const musicUploadTask = uploadBytesResumable(musicStorageRef, files);

      photoUploadTask.on(
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
          console.log(error);
          wrong(t("admin.adduser.validation.noUploadPhoto"));
        },
        () => {
          getDownloadURL(photoUploadTask.snapshot.ref).then((downloadURL) =>
            setMusic(downloadURL)
          );
        }
      );

      musicUploadTask.on(
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
          wrong("NOT UPLOADET MUSIC");
          console.log(error);
        },
        () => {
          getDownloadURL(musicUploadTask.snapshot.ref).then((downloadURL) =>
            setPhoto(downloadURL)
          );
        }
      );
    } catch {
      setDisable(false);
      wrong(
        "SOME ERROR HAS OCCURRED",
      );
    }
  };

  useEffect(() => {
    console.log(photo);
    console.log(music);
    console.log(photo && music);

    const newMusic = {
      id: Math.round(Date.now() / 1000),
      album: "DJANUM",
      artist: "DJANUM",
      image: photo,
      name: "DJANUM",
      playlist: "DJANUM",
      song: music,
      timeStamp: Timestamp.now().seconds,
    };

    if (photo && music) {
      console.log("ketti");

      database
        .ref("musics")
        .push(newMusic)
        .then(() => {
          console.log("Data pushed successfully");
        })
        .catch((error) => {
          console.error("Error pushing data:", error);
        });

      // dbSet(dbRef(database, "musics"), {
      //   id: Math.round(Date.now() / 1000),
      //   album: "DJANUM",
      //   artist: "DJANUM",
      //   image: photo,
      //   name: "DJANUM",
      //   playlist: "DJANUM",
      //   song: music,
      //   timeStamp: Timestamp.now().seconds,
      // });

      success(
        t("admin.adduser.validation.addedUser"),
      );

      setDisable(false);
    }
  }, [photo, music]);

  useEffect(() => {
    let arr = [];
    for (let i = 0; i < allCountry.length; i++) {
      if (allCountry[i].toUpperCase().startsWith(searchInput.toUpperCase())) {
        arr.push(allCountry[i]);
      }
    }
    setNewCountry(arr);
  }, [searchInput]);

  function handleValidation() {}

  return (
    <>
      <ToastContainer />
      <section className={sidebar ? "adout add-user" : "adout add-user active"}>
        <header>
          <div className="category">
            <h1 onClick={() => navigate("/admin/musics")} className="link">
              {t("admin.musics.title")}
            </h1>
            <h3>/</h3>
            <h2>{t("admin.musics.add.title")}</h2>
          </div>
        </header>
        <div className="content">
          <div className="head">
            <h1>{t("admin.adduser.basic")}</h1>
          </div>
          <form className="body" onSubmit={handleSubmit(onSubmit)}>
            <div className="photo">
              <div className="top">
                <div className="muz" onClick={() => musicRef.current.click()}>
                  <div className="music">
                    <div
                      className="dribble"
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      {/* {files.map((file, index) => (
                        <span key={index}>{file.name}</span>
                      ))} */}
                      <span>{files.name}</span>
                    </div>
                  </div>
                </div>
                <div className="img" onClick={() => photoRef.current.click()}>
                  <div className="image">
                    <img
                      src={
                        photoUpload ? URL.createObjectURL(photoUpload) : unknown
                      }
                      alt="Photo"
                    />
                    <input
                      type="file"
                      ref={photoRef}
                      onChange={(e) => setPhotoUpload(e.target.files[0])}
                    />
                  </div>
                  <div className="change">
                    <BiSolidPencil />
                  </div>
                  <h1>{t("admin.adduser.profilePhone")}</h1>
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
                  // {...register("name", {
                  //   required: t("admin.adduser.validation.name"),
                  // })}
                  id="name"
                  type="text"
                  placeholder={t("admin.adduser.name")}
                  aria-invalid={errors.name ? "true" : "false"}
                />
              </label>
              <label htmlFor="email">
                <TbMailFilled />
                <input
                  // {...register("email", { required: true })}
                  id="email"
                  type="email"
                  placeholder={t("admin.adduser.email")}
                  aria-invalid={errors.email ? "true" : "false"}
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
                  // {...register("password", {
                  //   required: true,
                  // })}
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
                  // {...register("confirmPassword", { required: true })}
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
