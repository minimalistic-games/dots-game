module.exports = {
    extends: 'standard',
    plugins: [
        'standard'
    ],
    rules: {
        'indent': ['error', 4, {'SwitchCase': 1}],
        'semi': ['error', 'always'],
        'no-var': 'error',
        'prefer-arrow-callback': 'error',
        'space-before-function-paren': ['error', { 'anonymous': 'always', 'named': 'never' }]
    }
};
