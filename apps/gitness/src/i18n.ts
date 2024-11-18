import { i18n } from '@lingui/core'
// import * as enMessages from './locales/en.js'
// import * as frMessages from './locales/fr.js'
// import * as csMessages from './locales/cs.js'

export const locales = {
  en: 'English',
  cs: 'Česky',
  fr: 'Français'
}
// const messages = {
//   en: enMessages,
//   fr: frMessages,
//   cs: csMessages
// }
export const defaultLocale = 'en'

/**
 * We do a dynamic import of just the catalog that we need
 * @param locale any locale string
 */
// export async function dynamicActivate(locale: string) {
//   console.log('locale', locale)
//   const { messages } = await import(`./locales/${locale}.js`)
//   console.log('messages', messages)
//   i18n.load(locale, messages)
//   i18n.activate(locale)
// }

const messageFiles = import.meta.glob('./locales/*.js')

console.log('messageFiles', messageFiles)

export async function dynamicActivate(locale: string) {
  try {
    const messages = await messageFiles[`./locales/${locale}.js`]()
    i18n.load(locale, messages.default)
    i18n.activate(locale)
  } catch (error) {
    console.error(`Failed to load locale ${locale}:`, error)
  }
}
