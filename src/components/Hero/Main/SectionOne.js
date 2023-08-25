import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

import darkPhoto from "../../../images/Hero/section1/bgDark.webp";
import lightPhoto from "../../../images/Hero/section1/bgLight.webp";
import logo48 from "../../../images/Hero/section1/Group3348.webp";
import logo49 from "../../../images/Hero/section1/Group3349.webp";
import logo50 from "../../../images/Hero/section1/Group3350.webp";
import logo51 from "../../../images/Hero/section1/Group3351.webp";
import light48 from "../../../images/Hero/section1/light3348.webp";
import light49 from "../../../images/Hero/section1/light3349.webp";
import light50 from "../../../images/Hero/section1/light3350.webp";
import light51 from "../../../images/Hero/section1/light3351.webp";

export default function SectionOne() {
  const darkmode = useSelector((state) => state.utilityReducer.darkmode);
  const [t, i18n] = useTranslation("global");

  return (
    <section className="section1">
      <div className="container">
        <div className="title">
          <motion.h1
            initial={{ x: "-2rem", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, type: "spring" }}
          >
            <span>{t("landing.section1.title1")}</span> <br />
            <span>{t("landing.section1.title2")}</span>
          </motion.h1>
          <motion.h3
            initial={{ x: "2rem", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, type: "spring" }}
          >
            <span>{t("landing.section1.miniTitle1")}</span>{" "}
            <span>{t("landing.section1.miniTitle2")}</span>{" "}
            <span>{t("landing.section1.miniTitle3")}</span>
          </motion.h3>
        </div>
        <motion.div
          initial={{ width: "0", height: "0" }}
          animate={{ width: "500px", height: "500px" }}
          transition={{ duration: 1 }}
          className="ellipse1"
        />
        <motion.div
          initial={{ width: "0" }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.7 }}
          className="line"
        />
        <motion.div
          initial={{ y: "3rem", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2, type: "spring" }}
          className="photo"
        >
          {darkmode ? <img src={darkPhoto} alt="Home Background" /> : <img src={lightPhoto} alt="Home Background" />}
        </motion.div>
        <motion.div
          initial={{ y: "3rem", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2, type: "spring" }}
          className="brands"
        >
          {darkmode ? (
            <>
              
              <img src={logo48} alt="Music Streaming" /> <img src={logo49} alt="Music Streaming" />
              <img src={logo50} alt="Music Streaming" /> <img src={logo51} alt="Music Streaming" />
            </>
          ) : (
            <>
              <img src={light48} alt="Music Streaming" /> <img src={light49} alt="Music Streaming" />
              <img src={light50} alt="Music Streaming" /> <img src={light51} alt="Music Streaming" />
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
