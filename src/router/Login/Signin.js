import React, { useEffect, useState } from "react";
import photo from "../../images/Login/login.svg";
import { useForm } from "react-hook-form";
import { wrong, success, warning } from "../../toastify/Toastify";
import { ToastContainer } from "react-toastify";

import { BiSolidLock } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";

export default function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [t, i18n] = useTranslation("global");
  const [darkmode, setDarkmode] = useState(
    localStorage.getItem("theme") == "light" ? true : false
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const posTaos = "top-right";

  const onSubmit = (data) => {
    let email = data.email;
    let password = data.password;

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        success( t("login.validation.signedin"), darkmode ? "light" : "dark", posTaos );

        const confirm = userCredential.user;
        const docRef = doc(db, "users", confirm.uid);
        const user = await getDoc(docRef);
        
        dispatch({ type: "SET_CONFIRM", payload: confirm });
        dispatch({ type: "SET_USER", payload: user.data() });

        setTimeout(() => navigate("/home"), 2000);
      }).catch((error) => wrong( t("login.validation.wrong"), darkmode ? "light" : "dark", posTaos ));
  };

  function handleValidation() {
    if (errors.email)
      warning(
        t("login.validation.email"),
        darkmode ? "light" : "dark",
        posTaos
      );
    if (errors.password)
      warning(
        t("login.validation.password"),
        darkmode ? "light" : "dark",
        posTaos
      );
  }

  return (
    <>
      <ToastContainer />
      <div id="login">
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
                  type="password"
                  placeholder={t("login.signin.password")}
                  aria-invalid={errors.password ? "true" : "false"}
                />
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
              <button onClick={handleValidation} type="submit">
                {t("login.signin.sign")}
              </button>
            </form>
            <div className="lines">
              <div className="line-start " />
              <span>{t("login.signin.or")}</span>
              <div className="line-end " />
            </div>
            <div className="providers">
              <button>
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
              <button>
                {/* <img src={apple} /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  viewBox="0 0 1024 1024"
                  className="icon"
                >
                  <path
                    fill={darkmode ? "#4e5667" : "#97a5c2"}
                    d="M747.4 535.7c-.4-68.2 30.5-119.6 92.9-157.5-34.9-50-87.7-77.5-157.3-82.8-65.9-5.2-138 38.4-164.4 38.4-27.9 0-91.7-36.6-141.9-36.6C273.1 298.8 163 379.8 163 544.6c0 48.7 8.9 99 26.7 150.8 23.8 68.2 109.6 235.3 199.1 232.6 46.8-1.1 79.9-33.2 140.8-33.2 59.1 0 89.7 33.2 141.9 33.2 90.3-1.3 167.9-153.2 190.5-221.6-121.1-57.1-114.6-167.2-114.6-170.7zm-105.1-305c50.7-60.2 46.1-115 44.6-134.7-44.8 2.6-96.6 30.5-126.1 64.8-32.5 36.8-51.6 82.3-47.5 133.6 48.4 3.7 92.6-21.2 129-63.7z"
                  />
                </svg>
                <span>Apple</span>
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
          <img src={photo} />
          <Link to={"/"} className="logo">
            <h1>Lorenzon</h1>
          </Link>
        </motion.section>
      </div>
    </>
  );
}
