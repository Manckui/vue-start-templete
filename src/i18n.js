// src/i18n.js

import { createI18n } from "vue-i18n"
import en from "./locales/en"
import it from "./locales/it"

const i18n = createI18n({
  legacy: false,
  locale: "it",
  messages: {
    en,
    it
  }
})

export { i18n }
