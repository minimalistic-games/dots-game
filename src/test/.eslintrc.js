module.exports = {
  env: {
    "browser": true,
    "node": true,
    "mocha": true
  },
  rules: {
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
  }
};
