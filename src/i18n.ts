import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import enTranslation from "@/translations/en/translation.json"
import ptTranslation from "@/translations/pt/translation.json"
import { SUPPORTED_LANGUAGES, I18N_STORAGE_KEY } from "@/configs"

const storedLanguage = localStorage.getItem(I18N_STORAGE_KEY);
const fallbackLanguage = storedLanguage || SUPPORTED_LANGUAGES[1].code;

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      pt: { translation: ptTranslation }
    },
    lng: fallbackLanguage,
    fallbackLng: fallbackLanguage,

    interpolation: {
      escapeValue: false,
    },

    saveMissing: true,
    missingKeyHandler: (languages) => {
      localStorage.setItem(I18N_STORAGE_KEY, languages[0])
    },
  })

export default i18n