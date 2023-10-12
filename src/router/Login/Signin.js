import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BiSolidLock } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { wrong, success, warning } from "../../utility/toastify";
import photo from "../../images/Login/login.svg";

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import {
  auth,
  db,
  providerGoogle,
  providerFacebook,
} from "../../firebase/firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

export default function Signin() {
  const confirm = useSelector((state) => state.confirmReducer.confirm);
  const user = useSelector((state) => state.confirmReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [t, i18n] = useTranslation("global");
  const [eye, setEye] = useState(false);
  const [wait, setWait] = useState(false);

  useEffect(() => {
    document.getElementById("root").setAttribute("class", "login");
    if (confirm && user) {
      navigate("/");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setWait(true);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(async (result) => {
        success(t("login.validation.signedin"));

        const confirm = result.user;
        const docRef = doc(db, "users", confirm.uid);
        const user = await getDoc(docRef);
        const role = user.data().role;

        setTimeout(() => {
          dispatch({ type: "SET_CONFIRM", payload: confirm });
          dispatch({ type: "SET_USER", payload: user.data() });
          role === "Admin" ? navigate("/admin") : navigate("/");
          setWait(false);
        }, 1000);
      })
      .catch((err) => {
        wrong(t("login.validation.wrong"));
        setWait(false);
      });
  };

  function handleValidation() {
    if (errors.email) warning(t("login.validation.email"));
    if (errors.password) warning(t("login.validation.password"));
  }

  const authGoogle = () => {
    signInWithPopup(auth, providerGoogle)
      .then(async (result) => {
        success(t("login.validation.signedin"));

        const confirm = result.user.reloadUserInfo;

        const docRef = doc(db, "users", confirm.localId);
        const user = await getDoc(docRef);

        if (user._document !== null) {
          const docRef = doc(db, "users", confirm.localId);
          const user = await getDoc(docRef);
          const role = user.data().role;

          console.log("IF ishladi");
          console.log(user.data());

          setTimeout(() => {
            dispatch({ type: "SET_CONFIRM", payload: confirm });
            dispatch({ type: "SET_USER", payload: user.data() });
            role === "Admin" ? navigate("/admin") : navigate("/");
          }, 1000);
        } else {
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

          console.log("ELSE ishladi");
          console.log(user.data());

          setTimeout(() => {
            dispatch({ type: "SET_CONFIRM", payload: confirm });
            dispatch({ type: "SET_USER", payload: user.data() });
            role === "Admin" ? navigate("/admin") : navigate("/");
          }, 1000);
        }
      })
      .catch((error) => {
        wrong("QANDAYDIR XATOLIK YUZ BERDI");
      });
  };

  const authFacebook = () => {
    signInWithPopup(auth, providerFacebook)
      .then(async (result) => {
        success(t("login.validation.signedin"));

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
      .catch((err) => wrong("QANDAYDIR XATOLIK YUZ BERDI"));
  };

  return (
    <>
      <ToastContainer />
      <main id="login" style={{ cursor: wait ? "wait" : "default" }}>
        <motion.section
          initial={{ x: "-2rem", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2, type: "spring" }}
          className="formes"
        >
          <div className="wrapper">
            <h1>{t("login.signin.title")}</h1>
            <p>{t("login.signin.paragraph")}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label className="email" htmlFor="email">
                <MdEmail />
                <input
                  {...register("email", { required: true })}
                  id="email"
                  type="text"
                  placeholder={t("login.signin.email")}
                  aria-invalid={errors.email ? "true" : "false"}
                />
              </label>
              <label className="password" htmlFor="password">
                <BiSolidLock />
                <input
                  {...register("password", { required: true })}
                  id="password"
                  type={eye ? "text" : "password"}
                  placeholder={t("login.signin.password")}
                  aria-invalid={errors.password ? "true" : "false"}
                />
                {eye ? (
                  <FaEye className="eye" onClick={() => setEye(!eye)} />
                ) : (
                  <FaEyeSlash className="eye" onClick={() => setEye(!eye)} />
                )}
              </label>
              <div className="remember">
                <div className="checkbox">
                  <div className="cbx">
                    <input id="cbx" type="checkbox" {...register("remember")} />
                    <label htmlFor="cbx"></label>
                    <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                      <path d="M2 8.36364L6.23077 12L13 2"></path>
                    </svg>
                  </div>
                  <label className="rememberme" htmlFor="cbx">
                    {t("login.signin.remember")}
                  </label>
                </div>
                <Link>{t("login.signin.forget")}</Link>
              </div>
              <button disabled={wait} onClick={handleValidation} type="submit">
                {t("login.signin.sign")}
              </button>
            </form>
            <div className="lines">
              <div className="line-start " />
              <span>{t("login.signin.or")}</span>
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
              <span>{t("login.signin.account")} </span>
              <Link to={"/register"}>{t("login.signin.to")}</Link>
            </div>
          </div>
        </motion.section>
        <motion.section
          initial={{ x: "2rem", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2, type: "spring" }}
          className="images"
        >
          <img src={photo} alt="Logo" />
          <Link to={"/"} className="logo">
            <h1>Lorenzon</h1>
          </Link>
        </motion.section>
      </main>
    </>
  );
}
