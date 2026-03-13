module.exports = {
  extends: [
    'expo',
    'plugin:unicorn/recommended',
    "plugin:@typescript-eslint/recommended"
  ],
  plugins: ['unicorn',
    '@typescript-eslint'
  ],
  parser: '@typescript-eslint/parser',
  rules: {
   "@typescript-eslint/ban-ts-comment": "off",
    'unicorn/no-useless-promise-resolve-reject': 'off',
    'unicorn/prefer-date-now': 'off',
    'unicorn/no-abusive-eslint-disable': 'off',
    'arrow-body-style': ['error', 'as-needed'],
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
        ignore: ['use', 'App']
      }
    ],
    'unicorn/better-regex': 2,
    'unicorn/explicit-length-check': 2,
    'unicorn/prefer-default-parameters': 2,
    'unicorn/no-array-push-push': 2,
    'unicorn/prefer-array-index-of': 2,
    'unicorn/prefer-array-flat-map': 2,
    'unicorn/prefer-array-some': 2,
    'unicorn/prefer-array-find': 2,
    'unicorn/prefer-array-flat': 2,
    'unicorn/prefer-includes': 2,
    'unicorn/prefer-top-level-await': 2,
    'unicorn/no-useless-spread': 2,
    'unicorn/no-useless-fallback-in-spread': 2,
    'unicorn/no-for-loop': 2,
    'unicorn/prefer-set-size': 2,
    'unicorn/prefer-type-error': 2,
    'unicorn/prefer-object-from-entries': 2,
    'unicorn/no-instanceof-array': 2,
    'unicorn/prefer-native-coercion-functions': 2,
    'unicorn/prefer-logical-operator-over-ternary': 2,
    'unicorn/prefer-event-target': 2,
    'unicorn/no-await-expression-member': 2,
    'unicorn/no-new-array': 2,
    'unicorn/throw-new-error': 2,
    'unicorn/no-useless-length-check': 2,
    'unicorn/prefer-prototype-methods': 2,
    'unicorn/prefer-export-from': [2, { ignoreUsedVariables: true }],
    'unicorn/no-new-buffer': 2,
    'unicorn/prefer-query-selector': 2,
    'unicorn/prefer-string-replace-all': 2,
    'unicorn/prefer-switch': [2, { emptyDefaultCase: 'do-nothing-comment' }],
    'unicorn/switch-case-braces': 2,
    'unicorn/catch-error-name': 2,
    'unicorn/consistent-destructuring': 2,
    'unicorn/no-array-reduce': 0,
    'unicorn/no-null': 0,
    'unicorn/no-nested-ternary': 'off'
  }
};