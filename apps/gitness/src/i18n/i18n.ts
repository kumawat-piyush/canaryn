import i18n from 'i18next'
// import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { i18next } from '@harnessio/views'
import Backend from 'i18next-http-backend'
import resourcesToBackend from 'i18next-resources-to-backend'

// import common from './en/common.json'
// import common_fr from './common-fr.json'

// const resources = {
//   en: { common }
//   // fr: { common: common_fr }
// }

i18n
  .use(initReactI18next)
  .use(
    resourcesToBackend((language: string, namespace: string) => {
      return import(`./${language}/${namespace}.json`)
    })
  )
  .init({
    resources: {},
    fallbackLng: 'en',
    debug: true,
    lng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

i18n.on('languageChanged', lng => {
  i18next.changeLanguage('fr')
})

export default i18n
