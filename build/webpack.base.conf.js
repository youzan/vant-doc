module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader']
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.(css|pcss)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.css'],
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  performance: {
    hints: false
  }
};
