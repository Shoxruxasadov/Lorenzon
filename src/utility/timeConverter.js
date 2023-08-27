import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function TimeConverter({ timeSeconds }) {
  const [t] = useTranslation("global");
  const [month, setMonth] = useState(null);

  const date = new Date(timeSeconds * 1000);

  const year = date.getFullYear();
  const monthDate =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  useEffect(() => {
    if (monthDate === "01") {
      setMonth(t("date.jan"));
    } else if (monthDate === "02") {
      setMonth(t("date.feb"));
    } else if (monthDate === "03") {
      setMonth(t("date.mar"));
    } else if (monthDate === "04") {
      setMonth(t("date.apr"));
    } else if (monthDate === "05") {
      setMonth(t("date.may"));
    } else if (monthDate === "06") {
      setMonth(t("date.jun"));
    } else if (monthDate === "07") {
      setMonth(t("date.jul"));
    } else if (monthDate === "08") {
      setMonth(t("date.aug"));
    } else if (monthDate === "09") {
      setMonth(t("date.sep"));
    } else if (monthDate === 10) {
      setMonth(t("date.oct"));
    } else if (monthDate === 11) {
      setMonth(t("date.nov"));
    } else if (monthDate === 12) {
      setMonth(t("date.dec"));
    }
  }, [t]);

  return <>{`${month} ${day}, ${year}`}</>;
}
