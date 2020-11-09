const paths = require('./paths')

const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

// 使用mockserver提供数据
const jsonServer = require('json-server');
const mockServer = jsonServer.create();

const database = require('../mock')();
const mockRouter = jsonServer.router(database);
const middlewares = jsonServer.defaults();
mockServer.use(middlewares);
mockServer.use(mockRouter);
mockServer.listen(3000, () => {
  console.info("JSON Server is running.......")
})


module.exports = merge(common, {
  // Set the mode to development or production
  mode: 'development',

  // Control how source maps are generated
  devtool: 'inline-source-map',

  // Spin up a server for quick development
  devServer: {
    historyApiFallback: true,
    contentBase: paths.build,
    open: true,
    compress: true,
    hot: true,
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  plugins: [
    // Only update what has changed on hot reload
    new webpack.HotModuleReplacementPlugin(),
  ],
})
