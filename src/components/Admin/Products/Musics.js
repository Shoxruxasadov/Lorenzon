import React from "react";
import { HiSearch } from "react-icons/hi";
import api from "../../../api/instance";
import { useTranslation } from "react-i18next";

export default function Musics() {
  api.get().then(({ data }) => console.log(data));
  const [t, i18n] = useTranslation("global");

  return (
    <section className="adout musics">
      <header>
        <div className="category">
          <h1>{t("admin.musics.title")}</h1>
        </div>
        <div className="others">
          <div className="search">
            <input type="text" placeholder={t("admin.musics.input")} />
            <HiSearch />
          </div>
          <div className="addUser">
            <button>{t("admin.musics.button")}</button>
          </div>
        </div>
      </header>
    </section>
  );
}
