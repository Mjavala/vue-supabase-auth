module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:vue/base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }],
    'vue/multi-word-component-names': 'off',
    'vue/script-setup-uses-vars': 'error',
  },
};
