export default {
  // Directory where the parser will look for files
  input: ['src/**/*.{js,jsx,ts,tsx}'],

  // Output directory for extracted translations
  output: './locales/$LOCALE/$NAMESPACE.json',

  // Specify default namespace
  defaultNamespace: 'component',

  // Specify the list of namespaces
  namespaces: ['component'],

  locales: ['en', 'es', 'fr'],

  keySeparator: '.',

  // Namespace separator
  namespaceSeparator: ':',

  // i18n keys are wrapped in a function like `t('key')`
  functions: ['t', 'i18nextViewsInstance.t']

  // // Automatically create empty translations in all locales
  // createOldCatalogs: false,
  // keepRemoved: false
}
