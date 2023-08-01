import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import music from "../../../images/Hero/section3/music.webp";
import star from "../../../images/Hero/section3/star.webp";

export default function SectionThree() {
  const [t, i18n] = useTranslation("global");

  return (
    <section className="section3">
      <div className="container">
        <h1>{t("landing.section3.title")}</h1>
        <div>
          <span>{t("landing.section3.paragraph")}</span>
          <img className="star-img" src={star} />
          <img className="music-img" src={music} />
        </div>
        <Link>{t("landing.section3.button")}</Link>
      </div>
    </section>
  );
}
