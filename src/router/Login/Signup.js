import React, { useEffect, useState } from "react";
import photo from "../../images/Login/register.svg";
import { useForm } from "react-hook-form";
import { wrong, success, warning } from "../../toastify/Toastify";
import { ToastContainer } from "react-toastify";

import { BiSolidLockAlt, BiSolidUser, BiSolidLock } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export default function Signup() {
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
  const posTaos = "top-left";

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      wrong(
        t("login.validation.conEqualPass"),
        darkmode ? "light" : "dark",
        posTaos
      );
    } else {
      try {
        const res = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        await setDoc(doc(db, "users", res.user.uid), {
          birthday: null,
          country: null,
          email: data.email,
          image: null,
          name: `${data.firstName} ${data.lastName}`,
          password: data.password,
          phone: null,
          role: "User",
          timeStamp: serverTimestamp(),
        });

        success(
          t("login.validation.signedup"),
          darkmode ? "light" : "dark",
          posTaos
        );

        setTimeout(() => navigate("/login"), 2000);
      } catch (error) {
        wrong(
          t("login.validation.errorRegister"),
          darkmode ? "light" : "dark",
          posTaos
        );
      }
    }
  };

  function handleValidation() {
    let name = errors.firstName || errors.lastName;
    if (name) warning(name.message, darkmode ? "light" : "dark", posTaos);
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
    if (errors.confirmPassword)
      warning(
        t("login.validation.conpass"),
        darkmode ? "light" : "dark",
        posTaos
      );
  }

  return (
    <>
      <ToastContainer />
      <div id="register">
        <motion.section
          initial={{ x: "-2rem", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2, type: "spring" }}
          className="images"
        >
          <img src={photo} />
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
                  {...register("password", { required: true })}
                  id="password"
                  type="password"
                  placeholder={t("login.signup.password")}
                  aria-invalid={errors.password ? "true" : "false"}
                />
              </label>
              <label className="confirmPassword" htmlFor="confirmPassword">
                <BiSolidLockAlt />
                <input
                  {...register("confirmPassword", { required: true })}
                  id="confirmPassword"
                  type="password"
                  placeholder={t("login.signup.conpass")}
                  aria-invalid={errors.confirmPassword ? "true" : "false"}
                />
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
              <span>{t("login.signup.account")} </span>
              <Link to={"/login"}>{t("login.signup.to")}</Link>
            </div>
          </div>
        </motion.section>
      </div>
    </>
  );
}
