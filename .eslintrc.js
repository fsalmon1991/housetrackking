module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  "parser": "vue-eslint-parser",
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console':  0,
    'no-debugger': 0
  }
}
