const paths = require('./paths')
const isDevelop = process.env.NODE_ENV === 'development'

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  // Where webpack looks to start building the bundle
  entry: [paths.src + '/index.js'],

  // Where webpack outputs the assets and bundles
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  // Customize the webpack build process
  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
        },
      ],
    }),

    // Generates an HTML file from a template
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
    new HtmlWebpackPlugin({
      title: 'webpack5 start',
      favicon: paths.src + '/assets/favicon.png',
      template: paths.src + '/template.html', // template file
      filename: 'index.html', // output file
    }),

    new VueLoaderPlugin()
  ],

  // Determine how modules within the project are treated
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'         //vue-loader 编译vue模块
      },
      {
        test: /(?<!\.d)\.tsx?$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          // transpileOnly: true,
          // experimentalWatchApi: true,
          // configFile: path.resolve(__dirname, '../tsconfig.json')
        },
        exclude: /node_modules/
      },
      // 参考 https://stackoverflow.com/questions/38231645/typescriptwebpack-typescript-emmited-no-output-for-index-d-ts
      {
        test: /(\.d\.ts)|(\.js\.map)$/,
        loader: 'ignore-loader',
      },
      // JavaScript: Use Babel to transpile JavaScript files
      {test: /\.js$/, exclude: /node_modules/, use: ['babel-loader']},

      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {loader: 'css-loader', options: {sourceMap: true, importLoaders: 1}},
          {loader: 'postcss-loader', options: {sourceMap: true}},
          {loader: 'sass-loader', options: {sourceMap: true}},
        ],
      },
      {
        test: /\.less$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "less-loader" // compiles Less to CSS
        }]
      },
      // Images: Copy image files to build folder
      {test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource'},

      // Fonts and SVGs: Inline files
      {test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline'},
    ],
  },

  resolve:{
    //引入路径是不用写对应的后缀名
    extensions: ['.js', '.vue', '.json', '.ts'],
    alias:{
        //正在使用的是vue的运行时版本，而此版本中的编译器时不可用的，我们需要把它切换成运行时 + 编译的版本
        'vue$':'vue/dist/vue.esm.js',
        //用@直接指引到src目录下
        '@': paths.src,
    }
  },
}
