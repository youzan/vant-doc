module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
            },
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.(css|pcss)$/,
                use: ['css-loader', 'postcss-loader']
            },
        ]
    },
    performance: {
        hints: false
    },
    resolve: {
        extensions: ['.webpack.js',  '.js', '.vue', '.ts']
    }
};
