import React from "react";
import { useTranslation } from "react-i18next";
import star1 from "../../../../images/section1/Star1.webp";
import star2 from "../../../../images/section1/Star2.webp";

export default function TrendignLoop() {
  const [t, i18n] = useTranslation("global");

  return (
    <div className="trending">
      <div className="trending-inner">
        <span>
          <div className="trending-line">
            <img src={star1} />
            <p>{t("landing.trending")}</p>
          </div>
          <div className="trending-outline">
            <img src={star2} />
            <p>{t("landing.trending")}</p>
          </div>
          <div className="trending-line">
            <img src={star1} />
            <p>{t("landing.trending")}</p>
          </div>
          <div className="trending-outline">
            <img src={star2} />
            <p>{t("landing.trending")}</p>
          </div>
        </span>
        <span>
          <div className="trending-line">
            <img src={star1} />
            <p>{t("landing.trending")}</p>
          </div>
          <div className="trending-outline">
            <img src={star2} />
            <p>{t("landing.trending")}</p>
          </div>
          <div className="trending-line">
            <img src={star1} />
            <p>{t("landing.trending")}</p>
          </div>
          <div className="trending-outline">
            <img src={star2} />
            <p>{t("landing.trending")}</p>
          </div>
        </span>
      </div>
    </div>
  );
}
