import { createInstance } from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en.json'
import fr from './fr.json'

const resources = {
  en: { translation: en },
  fr: { translation: fr }
}
const i18next = createInstance({
  resources,
  // fallbackLng: 'en',
  // lng: 'fr',
  interpolation: {
    escapeValue: false
  }
})
i18next.use(initReactI18next)
i18next.init()

export default i18next
