import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import verizon from "../../../images/Hero/section4/verizon.webp";
import veroblack from "../../../images/Hero/section4/veroblack.webp";
import line from "../../../images/Hero/section4/line.svg";
import outline from "../../../images/Hero/section4/outline.svg";
import appstore from "../../../images/Hero/section4/AppStore.webp";
import googleplay from "../../../images/Hero/section4/GooglePlay.webp";
import logo from "../../../images/Logo/black.png";
import { useSelector } from "react-redux";

export default function SectionFour() {
  const darkmode = useSelector((state) => state.utilityReducer.darkmode);
  const [t, i18n] = useTranslation("global");

  return (
    <section className="section4">
      <div className="container">
        <div className="verizon">
          <img src={darkmode ? verizon : veroblack} alt="verizon" />
          <p>{t("landing.section4.verizon")}</p>
          <img className="line" src={line} alt="" />
          <img className="outline" src={outline} alt="" />
        </div>
        <div className="install">
          <Link to={"/"} className="logo">
            <img src={logo} alt="Lorenzon" />
            <h1>Lorenzon</h1>
          </Link>
          <h2>{t("landing.section4.never")}</h2>
          <p>{t("landing.section4.available")}</p>
          <div className="download">
            <Link target="_blank" to={"https://apps.apple.com/us/app/lorenzon"}>
              <img className="ios" src={appstore} alt="App Store" />
            </Link>
            <Link
              target="_blank"
              to={
                "https://play.google.com/store/apps/details?id=com.shokhdev.lorenzon&hl=ru&gl=US"
              }
            >
              <img className="android" src={googleplay} alt="Google Play" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
