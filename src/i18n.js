import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import Config from "./constants/Config";

const languages = ['en', 'jp'];
const translations = {
  en: { translation: require("./assets/locales/en/translation.json"), },
  jp: { translation: require("./assets/locales/jp/translation.json"), },
};

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  .use(HttpApi)

  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)

  // pass the i18n instance to react-i18next.
  .use(initReactI18next)

  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources: translations,
    whitelist: languages,
    lng: "en",
    fallbackLng: false,
    debug: Config.env === 'dev' || Config.env === 'development',
    keySeparator: ".",
    ns: ['translation'],
    defaultNS: "translation",
    nsSeparator: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    backend: {
      loadPath: `./assets/locales/{{lng}}/{{ns}}.json`,
      addPath: `./assets/locales/add/{{lng}}/{{ns}}`,
    },
  })

export default i18n;
