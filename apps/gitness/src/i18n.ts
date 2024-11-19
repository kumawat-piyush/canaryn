// i18n.ts
export async function loadLocaleData(locale: string) {
  try {
    const messages = await import(`../dist/lang/${locale}.json`)
    return messages.default
  } catch (error) {
    console.error(`Could not load locale '${locale}':`, error)
    return null
  }
}
