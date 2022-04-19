const resolveApp = require('./paths')
const  HtmlWebpackPlugin = require('html-webpack-plugin')
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const { merge } = require('webpack-merge')

//导入其它的配置
const prodConfig = require('./webpack.production')

const devConfig = require('./webpack.development')

//定义对象保存base
const commonConfig = {

  entry:'./src/index.js',

  resolve: {

    extensions: ['.js', '.jsx', '.ts', '.tsx'],

    alias: {
      '@': resolveApp('./src'),
    },
  },

  output: {

    filename: 'js/main.js',

    path: resolveApp('./dist'),

  },

  module: {


    rules: [


      {

        test: /\.css$/,

        use: [
          {
            loader:'style-loader',

          },
          {
            loader:'css-loader',
            options: {

              importLoaders : 1,

              esModule:false

            }
          },
          {
            loader:'postcss-loader'
          }

        ]
      },

      {
        test: /\.less$/,

        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',

          'less-loader',
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {

        test: /\.(svg|png|gif|jpe?g)$/,
        type:'asset',
        generator:{
          filename:"images/[name].[hash:6][ext]"
        },
        parser:{
          dataUrlCondition:{
            maxSize: 30 * 1024
          }
        }
      },

      {
        test:/\.(ttf|woff|eot|svg)$/,
        type:'asset/resource',
        generator:{
          filename:"fonts/[name].[hash:6][ext]"
        }
      },

      {
        test: /\.(js|jsx?)$/,
        exclude: /node_modules/,
        use:['babel-loader']
      },

    {
      test:/\.(ts|tsx?)$/,
      exclude: /node_modules/,
      use:['ts-loader']

    }
    ]
  },


  plugins: [

    new HtmlWebpackPlugin({
      title: 'webpack5',
      template: resolveApp('./public/index.html'),
      filename: 'index.html'
    }),

    new friendlyErrorsWebpackPlugin()


  ]

}

module.exports = (env) => {

  const isProduction = env.isProduction
  //合并配置信息
  const config = isProduction ? prodConfig : devConfig

  const mergeConfig = merge(commonConfig,config)

  return mergeConfig
 }

