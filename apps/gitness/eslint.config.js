import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import formatjs from 'eslint-plugin-formatjs' // Import formatjs

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      formatjs: formatjs // Add formatjs plugin
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      'formatjs/no-literal-string-in-jsx': [
        'error',
        {
          props: {
            include: [
              ['*', 'aria-{label,description,details,errormessage}'],
              ['[a-z]*([a-z0-9])', '(placeholder|title)'],
              ['img', 'alt']
            ],
            exclude: [
              ['Foo', 'message'],
              ['Bar', 'aria-{label,description}']
            ]
          }
        }
      ]
    }
  }
)
