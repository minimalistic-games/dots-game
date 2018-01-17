module.exports = {
  extends: 'airbnb-base',
  env: {
    "browser": true
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
      },
    },
  },
  rules: {
    "arrow-parens": ["error", "always"],
    "consistent-return": "off",
    "no-mixed-operators": "off",
    "no-restricted-syntax": "off",
  },
};
