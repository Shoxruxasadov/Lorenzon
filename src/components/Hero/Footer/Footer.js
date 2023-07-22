import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { HiMail } from "react-icons/hi";

export default function Footer() {
  const [t, i18n] = useTranslation("global");

  return (
    <footer>
      <div className="container">
        <div className="title">
          <h1>
            {t("landing.footer.title1")} <br /> {t("landing.footer.title2")}
          </h1>
          <div className="title-down">
            <span className="social">
              <Link target="_blank" to={"https://instagram.com/lorenzon.uz"}>
                Instagram
              </Link>{" "}
              |{" "}
              <Link target="_blank" to={"https://facebook.com/lorenzonuz"}>
                Facebook
              </Link>{" "}
              |{" "}
              <Link target="_blank" to={"https://twitter.com/lorenzonuz"}>
                Twitter
              </Link>
            </span>
            <span className="activity">©2023 Lorenzon</span>
          </div>
        </div>
        <div className="keep">
          <h4>
            <Link to={"mailto:lorenzonuz@mail.ru"}>Info@lorenzon.uz</Link>
            <HiMail />
          </h4>
          <h3>
            {t("landing.footer.keep1")} <br /> {t("landing.footer.keep2")}
          </h3>
          <div className="privacy">
            <Link>{t("landing.footer.policy")}</Link>
            <Link>{t("landing.footer.service")}</Link>
          </div>
        </div>
        <div className="ellipse3" />
      </div>
    </footer>
  );
}
