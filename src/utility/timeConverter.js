import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function TimeConverter({ timeSeconds }) {
  const [t] = useTranslation("global");
  const [month, setMonth] = useState(null);

  const date = new Date(timeSeconds * 1000);

  const mon =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  useEffect(() => {
    if (mon === "01") {
      setMonth(t("date.jan"));
    } else if (mon === "02") {
      setMonth(t("date.feb"));
    } else if (mon === "03") {
      setMonth(t("date.mar"));
    } else if (mon === "04") {
      setMonth(t("date.apr"));
    } else if (mon === "05") {
      setMonth(t("date.may"));
    } else if (mon === "06") {
      setMonth(t("date.jun"));
    } else if (mon === "07") {
      setMonth(t("date.jul"));
    } else if (mon === "08") {
      setMonth(t("date.aug"));
    } else if (mon === "09") {
      setMonth(t("date.sep"));
    } else if (mon === 10) {
      setMonth(t("date.oct"));
    } else if (mon === 11) {
      setMonth(t("date.nov"));
    } else if (mon === 12) {
      setMonth(t("date.dec"));
    }
  }, [t]);

  return <>{`${month} ${day}, ${year}`}</>;
}
