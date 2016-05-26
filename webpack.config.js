module.exports = {
    entry: './js/main.js',

    output: {
        path: __dirname,
        filename: 'bundle.js'
    },

    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            },
        ],
        loaders: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};
