import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import verizon from "../../../images/Hero/section4/verizon.webp";
import veroblack from "../../../images/Hero/section4/veroblack.webp";
import line from "../../../images/Hero/section4/line.webp";
import outline from "../../../images/Hero/section4/outline.webp";
import appstore from "../../../images/Hero/section4/AppStore.webp";
import googleplay from "../../../images/Hero/section4/GooglePlay.webp";
import logo from "../../../images/Logo/black.png";

export default function SectionFour({ darkmode }) {
  const [t, i18n] = useTranslation("global");

  return (
    <section className="section4">
      <div className="container">
        <div className="verizon">
          {darkmode ? (
            <img className="verizonLogo" src={veroblack} />
          ) : (
            <img className="verizonLogo" src={verizon} />
          )}
          <p>{t("landing.section4.verizon")}</p>
          <img className="line" src={line} />
          <img className="outline" src={outline} />
        </div>
        <div className="install">
          <Link to={"/"} className="logo">
            <img src={logo} />
            <h1>Lorenzon</h1>
          </Link>
          <h2>{t("landing.section4.never")}</h2>
          <p>{t("landing.section4.available")}</p>
          <div className="download">
            <Link target="_blank" to={"https://apps.apple.com/us/app/lorenzon"}>
              <img className="ios" src={appstore} />
            </Link>
            <Link
              target="_blank"
              to={
                "https://play.google.com/store/apps/details?id=com.shokhdev.lorenzon&hl=ru&gl=US"
              }
            >
              <img className="android" src={googleplay} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
