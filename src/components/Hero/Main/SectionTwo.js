import React from "react";
import { useTranslation } from "react-i18next";
import CountUp from "react-countup/build";

export default function SectionTwo() {
  const [t, i18n] = useTranslation("global");

  return (
    <section className="section2">
      <div className="container">
        <div className="title">
          <h1>
            {t("landing.section2.title1")}{" "}
            <span>{t("landing.section2.artist")}</span>{" "}
            {t("landing.section2.title2")}
          </h1>
          <p>{t("landing.section2.paragraph")}</p>
        </div>
        <div className="people">
          <div className="register-people">
            <h1>
              +<CountUp end={5000000} duration={3} />
            </h1>
            <p>{t("landing.section2.registerPeople")}</p>
          </div>
          <div className="help-people">
            <h1>
              +<CountUp end={50000} duration={3} />
            </h1>
            <p>{t("landing.section2.heldPeople")}</p>
          </div>
        </div>
        <div className="ellipse2" />
      </div>
    </section>
  );
}
