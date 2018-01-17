module.exports = {
  extends: 'airbnb-base',
  env: {
    browser: true
  },
  settings: {
    'import/resolver': 'webpack',
  },
  rules: {
    'arrow-parens': ['error', 'always'],
    'consistent-return': 'off',
    'import/prefer-default-export': 'off',
    'no-mixed-operators': 'off',
    'no-restricted-syntax': 'off',
  },
};
