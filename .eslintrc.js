module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential'
  ],
  rules: {
    'indent': ['error', 2],
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
    'semi': ['error','never'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-semi': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
