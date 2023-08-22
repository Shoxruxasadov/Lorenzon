import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

import photo1 from "../../../../images/Hero/section2/Rectangle28.webp";
import photo2 from "../../../../images/Hero/section2/Rectangle28-1.webp";
import photo3 from "../../../../images/Hero/section2/Rectangle28-2.webp";
import photo4 from "../../../../images/Hero/section2/Rectangle28-3.webp";
import photo5 from "../../../../images/Hero/section2/Rectangle28-4.webp";
import photo6 from "../../../../images/Hero/section2/Rectangle28-5.webp";
import photo7 from "../../../../images/Hero/section2/Rectangle28-6.webp";
import photo8 from "../../../../images/Hero/section2/Rectangle28-7.webp";

export default function Artists() {
  const darkmode = useSelector((state) => state.utilityReducer.darkmode);
  const [t, i18n] = useTranslation("global");

  return (
    <div className="artists">
      <div>
        <img src={photo1} />
        <img src={photo2} />
        <img src={photo3} />
        <img src={photo4} />
      </div>
      <div>
        <img src={photo5} />
        <img className="back" src={photo6} />
        <img className="ford" src={photo7} />
        <img src={photo8} />
      </div>
      <Link>
        <span>{t("landing.artist")}</span>
        <FaArrowRightLong />
      </Link>
    </div>
  );
}
