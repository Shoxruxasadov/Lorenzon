import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { HiMail } from "react-icons/hi";
import {
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
  FaDev,
} from "react-icons/fa";

export default function Footer() {
  const darkmode = useSelector((state) => state.utilityReducer.darkmode);
  const [t, i18n] = useTranslation("global");

  return (
    <footer>
      <div className="container">
        <div className="title">
          <h1>
            {t("landing.footer.title1")} {window.innerWidth > 920 && <br />}
            {t("landing.footer.title2")}
          </h1>
          <h3>
            {t("landing.footer.keep1")} {window.innerWidth > 920 && <br />}
            {t("landing.footer.keep2")}
          </h3>
        </div>

        <div className="keep">
          <div className="social">
            <Link
              target="_blank"
              to={"https://www.facebook.com/profile.php?id=100n094783912041"}
            >
              <FaFacebookF />
              <span>Facebook</span>
            </Link>{" "}
            |{" "}
            <Link target="_blank" to={"https://instagram.com/lorenzon.uz"}>
              <FaInstagram />
              <span>Instagram</span>
            </Link>{" "}
            |{" "}
            <Link target="_blank" to={"https://t.me/lorenzonuz"}>
              <FaTelegramPlane />
              <span>Telegram</span>
            </Link>
          </div>
          {window.innerWidth < 920 && <span>|</span>}
          <div className="copyright">
            <Link target="_black" to={"https://ShoxruxAsadov.uz"}>
              <FaDev />
              <span>{t("landing.footer.copyright")}</span>
            </Link>
            |{" "}
            <Link to={"mailto:lorenzonuz@mail.ru"}>
              <span>lorenzonuz@mail.ru</span>
              <HiMail />
            </Link>
          </div>
        </div>
        <div className="ellipse3" />
      </div>
    </footer>
  );
}
