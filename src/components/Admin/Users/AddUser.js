import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import {
  BiSolidPencil,
  BiSolidCake,
  BiSolidLock,
  BiSolidLockAlt,
} from "react-icons/bi";
import { FaUser, FaPhone, FaFlag, FaUsersCog } from "react-icons/fa";
import { TbMailFilled } from "react-icons/tb";
import { MdVerifiedUser } from "react-icons/md";
import { useForm } from "react-hook-form";
import unknown from "../../../images/Admin/unknown.jpg";

import { success, wrong, warning, info } from "../../../toastify/Toastify";
import { ToastContainer } from "react-toastify";

export default function AddUser() {
  const navigate = useNavigate();
  const [nextProfile, setNextProfile] = useState(false);
  const inputRef = useRef(null);
  const [darkmode, setDarkmode] = useState(
    localStorage.getItem("theme") === "light" ? true : false
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [photo, setPhoto] = useState("");
  const [getPhoto, setGetPhoto] = useState(null);
  const [per, setPer] = useState(null);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    const uploadPhoto = () => {
      const name = new Date().getTime() + "." + photo.name;
      const storageRef = ref(storage, `Users/${name}`);
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
              info("Upload is paused", darkmode, "top-right");
              break;
            case "running":
              success("Upload is running", darkmode, "top-right");
              break;
            default:
              break;
          }
        },
        (error) => {
          wrong("RASM YUKLANMADI !", darkmode, "top-right");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setGetPhoto(downloadURL);
          });
        }
      );
    };
    photo && uploadPhoto();
  }, [photo]);

  const onSubmit = async (data) => {
    if (data.password !== data.conpass) {
      warning(
        "Tasqinlanga parol xato",
        darkmode ? "light" : "dark",
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

        await setDoc(doc(db, "users", res.user.uid), {
          birthday: data.birthday,
          country: data.country,
          email: data.email,
          gender: data.gender,
          image: getPhoto,
          name: data.name,
          password: data.password,
          phone: data.phone,
          role: data.role,
          timeStamp: serverTimestamp(),
        });

        success("User qo'shildi", darkmode ? "light" : "dark", "top-right");
        setNextProfile(true);
        setTimeout(() => {
          setDisable(false);
        }, 2000);
      } catch (err) {
        setDisable(false);
        wrong("Bunday user mavjud", darkmode ? "light" : "dark", "top-right");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <section className="add-user">
        <header>
          <div className="category">
            <h1 onClick={() => navigate("/admin/users")} className="link">
              Users
            </h1>
            <h3>/</h3>
            <h2>Add User</h2>
          </div>
          <div className="others">
            <div className="addUserProgress">
              <div
                className="profile"
                style={
                  !nextProfile
                    ? { color: "#0f54f0" }
                    : { color: darkmode ? "#b5b5b5" : "#3b393D" }
                }
              >
                <div
                  className="number"
                  style={
                    !nextProfile
                      ? { background: "#0f54f0" }
                      : { background: darkmode ? "#b5b5b5" : "#3b393D" }
                  }
                >
                  1
                </div>
                <p>Profile</p>
              </div>
              <div className="line" />
              <div
                className="confirmation"
                style={
                  nextProfile
                    ? { color: "#0f54f0" }
                    : { color: darkmode ? "#b5b5b5" : "#3b393D" }
                }
              >
                <div
                  className="number"
                  style={
                    nextProfile
                      ? { background: "#0f54f0" }
                      : { background: darkmode ? "#b5b5b5" : "#3b393D" }
                  }
                >
                  2
                </div>
                <p>Confirmation</p>
              </div>
            </div>
          </div>
        </header>
        <div className="content">
          <div className="card">
            <div className="head">
              <h1>Basic Information</h1>
            </div>
            <form className="body" onSubmit={handleSubmit(onSubmit)}>
              <div className="photo">
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
                  <h1>Profile photo</h1>
                  <p>This will be displayed on your profile.</p>
                </div>
              </div>
              <div className="terminal">
                <div className="datas">
                  <label htmlFor="name">
                    <FaUser />
                    <input
                      type="text"
                      id="name"
                      placeholder="Name"
                      {...register("name", { required: true })}
                      aria-invalid={errors.name ? "true" : "false"}
                    />
                  </label>
                  <label htmlFor="email">
                    <TbMailFilled />
                    <input
                      type="text"
                      id="email"
                      placeholder="Email"
                      {...register("email", { required: true })}
                      aria-invalid={errors.email ? "true" : "false"}
                    />
                  </label>
                  <label htmlFor="phone">
                    <FaPhone />
                    <input
                      type="number"
                      id="phone"
                      placeholder="Phone"
                      {...register("phone", { required: true })}
                      aria-invalid={errors.phone ? "true" : "false"}
                    />
                  </label>
                </div>
                <div className="datas">
                  <label htmlFor="birthday">
                    <BiSolidCake />
                    <input
                      type="text"
                      id="birthday"
                      placeholder="Birthday"
                      {...register("birthday", { required: true })}
                      aria-invalid={errors.birthday ? "true" : "false"}
                    />
                  </label>
                  <label htmlFor="password">
                    <BiSolidLock />
                    <input
                      type="password"
                      id="password"
                      placeholder="Password"
                      {...register("password", { required: true })}
                      aria-invalid={errors.password ? "true" : "false"}
                    />
                  </label>
                  <label htmlFor="conpass">
                    <BiSolidLockAlt />
                    <input
                      type="password"
                      id="conpass"
                      placeholder="Confirm Password"
                      {...register("conpass", { required: true })}
                      aria-invalid={errors.conpass ? "true" : "false"}
                    />
                  </label>
                </div>
                <div className="datas">
                  <label htmlFor="country">
                    <FaFlag />
                    <input
                      type="text"
                      id="country"
                      placeholder="Country"
                      {...register("country", { required: true })}
                      aria-invalid={errors.country ? "true" : "false"}
                    />
                  </label>
                  <label htmlFor="gender">
                    <FaUsersCog />
                    <input
                      type="text"
                      id="gender"
                      placeholder="Gender"
                      {...register("gender", { required: true })}
                      aria-invalid={errors.gender ? "true" : "false"}
                    />
                  </label>
                  <label htmlFor="role">
                    <MdVerifiedUser />
                    <input
                      type="text"
                      id="role"
                      placeholder="Role"
                      {...register("role", { required: true })}
                      aria-invalid={errors.role ? "true" : "false"}
                    />
                  </label>
                </div>
                <div className="submit">
                  <button
                    disabled={(per !== null && per < 100) || disable}
                    type="submit"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
