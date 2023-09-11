import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import webapp from "../../../images/Hero/heros/webapp.png";

export default function Heros() {
  const [t, i18n] = useTranslation("global");


  return (
    <section id="heros">
      <div className="container">
        <motion.div
          className="content"
          initial={{ x: "-2rem", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2, type: "spring" }}
        >
          <div className="title">
            <div className="headline">
              <h1>{t("hero.heros.headtitle")}</h1>
            </div>
            <div className="subtitle">
              <p>{t("hero.heros.subtitle")}</p>
            </div>
            <div className="login">
              <Link to={"/register"} className="signup">
                {t("hero.heros.signup")}
              </Link>
              <Link to={"/login"} className="signin">
                {t("hero.heros.signin")}
              </Link>
            </div>
          </div>
          <div className="webapp">
            <motion.img
              src={webapp}
              alt="WebApp"
              height={"550px"}
              initial={{ x: "16px", y: "32px", opacity: 0, scale: "1.1" }}
              animate={{ x: "-72px", y: "32px", opacity: 1, scale: "1.1" }}
              transition={{ duration: 2, type: "spring" }}
            />
          </div>
        </motion.div>
        <motion.div
          className="collaboration"
          initial={{ x: "-2rem", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2, type: "spring" }}
        >
          <div className="wrapper">
            <div className="line" />
            <div className="content-brand">
              <div className="title-brand">
                <p>{t("hero.heros.collaboration")}</p>
              </div>
              <div className="brands">
                <p>{t("hero.heros.brands")}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
