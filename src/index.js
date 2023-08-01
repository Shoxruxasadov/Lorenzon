import React from "react";
import ReactDOM from "react-dom/client";
import { Analytics } from '@vercel/analytics/react';

// ROUTER
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

// REDUX
import { Provider } from "react-redux";
import store from "./redux/store";

// I18NEXT
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import global_en from "./translations/en/global.json";
import global_ru from "./translations/ru/global.json";
import global_uz from "./translations/uz/global.json";
const lang = localStorage.getItem("lang");
i18next.init({
  interpolation: { escapeValue: false },
  lng: lang === null ? "en" : lang,
  resources: {
    en: {
      global: global_en,
    },
    ru: {
      global: global_ru,
    },
    uz: {
      global: global_uz,
    },
  },
});

// RENDER
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <RouterProvider router={router} />
        <Analytics />
      </I18nextProvider>
    </Provider>
  </React.StrictMode>
);
