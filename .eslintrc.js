module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    'plugin:vue/recommended',
    "plugin:jest/recommended",
    'plugin:prettier/recommended',
    "plugin:jest/style",
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
    'jest'
  ],
  // add your custom rules here
  rules: {
    'semi': [2, 'never'],
    'no-console': 'off',
    'vue/max-attributes-per-line': 'off',
    "prettier/prettier": ["error", {"singleQuote": true, "semi": false}],
    "no-unused-vars": [1, {"vars" : "all", "args" : "after-used"} ],
    "vue/html-self-closing": ["error", { "html": { "void": "always" } }],
    "vue/html-closing-bracket-newline": [2, {"multiline": "always"}],
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error"
  }
}
