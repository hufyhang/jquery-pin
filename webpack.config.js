const path = require('path');
module.exports = {
  entry: {
    main: ['./src/ts/index.ts']
  },

  module: {
    rules: [{
      test: /\.js$/,
      loaders: ['babel-loader']
    }, {
      test: /\.ts$/,
      loaders: ['babel-loader', 'ts-loader']
    }]
  },

  output: {
    path: path.join(__dirname, 'dist/'),
    filename: '[name].js'
  },

  resolve: {
    modules: [
      path.join(__dirname, '.'),
      path.join(process.cwd(), 'node_modules')
    ],
    extensions: ['.ts', '.js']
  },

  devtool: 'source-map'

};
