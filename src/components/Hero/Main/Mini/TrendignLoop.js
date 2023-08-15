import React from "react";
import { useTranslation } from "react-i18next";
import star1 from "../../../../images/Hero/section1/Star1.svg";
import star2 from "../../../../images/Hero/section1/Star2.svg";

export default function TrendignLoop() {
  const [t, i18n] = useTranslation("global");

  return (
    <div className="trending">
      <div className="trending-inner">
        <span>
          {window.innerWidth < 660 ? (
            <>
              <div className="trending-line">
                <img src={star1} />
                <p>{t("landing.trending")}</p>
              </div>
              <div className="trending-outline">
                <img src={star2} />
                <p>{t("landing.trending")}</p>
              </div>
            </>
          ) : window.innerWidth < 920 ? (
            <>
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
            </>
          ) : (
            <>
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
            </>
          )}
        </span>
        <span>
          {window.innerWidth < 660 ? (
            <>
              <div className="trending-line">
                <img src={star1} />
                <p>{t("landing.trending")}</p>
              </div>
              <div className="trending-outline">
                <img src={star2} />
                <p>{t("landing.trending")}</p>
              </div>
            </>
          ) : window.innerWidth < 920 ? (
            <>
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
            </>
          ) : (
            <>
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
            </>
          )}
        </span>
      </div>
    </div>
  );
}
