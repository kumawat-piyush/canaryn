import i18n from 'i18next'
// import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { i18next } from '@harnessio/views'

i18n

  //   .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // fallbackLng: 'en',
    debug: true,
    lng: 'en',

    interpolation: {
      escapeValue: false
    }
  })

i18n.on('languageChanged', lng => {
  i18next.changeLanguage('en')
})

export default i18n
