// resolve用来拼接绝对路径的方法
const path = require('path');

//path.join()方法使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径
//path.resolve() 该方法将一些的 路径/路径段 解析为绝对路径。
//两者区别：join是把各个path片段连接在一起， resolve把‘／'当成根目录
// __dirname nodejs的变量，代表当前文件的目录绝对路径
const srcDir = path.join(__dirname, '../src');
const { DefinePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const  HtmlWebpackPlugin = require('html-webpack-plugin');
// const ReactRootPlugin = require('html-webpack-root-plugin');
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  // webpack配置
  mode:"development",
  devtool:false,
  // 入口起点
  entry:'./src/index.js',
  // 输出
  output: {
    // 输出文件名
    filename: 'js/main.js',
    // 输出路径
    // __dirname nodejs的变量，代表当前文件的目录绝对路径
    path: path.resolve(__dirname, 'dist')
  },
  target:'web',//防止和.browserslistrc文件配制冲突
  //热模块开启
  devServer:{
    //热更新
    hot:true,
    //端口号
    port:3000,
    //自动打开浏览器
    open:true
  },

  // loader的配置
  module: {

    //规则
    rules: [
      
      // 详细loader配置
      // 不同文件必须配置不同loader处理
      //1.css的处理loader
      {
        // 一般就是正则表棕式，用来匹配哪些文件
        test: /\.css$/,
        // use数组中loader执行顺序：从右到左，从下到上 依次执行
        use: [
          {
            loader:'style-loader',
          // 创建style标签，将js中的样式资源插入进行，添加到head中生效
          },
          {
            loader:'css-loader',
            options: {
              //为了让css-loader重新再加载@import的文件，相当于再调下面的 postcss-loader一次
              //如果下面还有别的loader就改数值为2
              importLoaders : 1,
              //防止设置CSS样式使用背景图片时，被多加载一张图片
              esModule:false

            }
          },
          {
            loader:'postcss-loader'
          }
            
        ] 
      },
      //2.less的 loader处理
      {
        test: /\.less$/,
        //数组代表要使用多个loader处理用use
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          // 将less文件编译成css文件
          // 需要下载 less-loader和less
          'less-loader',
        ]
      },
      //3.图片的处理
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

        //webpack5不再使用下面配制
        // use:[
        //   {
        //   loader:'url-loader',
        //   options:{
        //     limit: 8 * 1024,
        //      esModule:false, //是否转化成EsModule
        //      name:'[name].[hash:6].[ext]',//图片名称
        //      outputPath:'images'
        //   }
        //   }
        // ]
      },
      //4.字体图标的处理
      {
        test:/\.(ttf|woff|eot|svg)$/,
        type:'asset/resource',
        generator:{
          filename:"fonts/[name].[hash:6][ext]"
        }
      },
      //5.-->babel-loader
      {
        test: /\.(js|jsx?)$/,
        exclude: /node_modules/,
        use:['babel-loader'] 
      }
    ]
  },
  
  // plugins的配置
  plugins: [
    // plugins的配置
    //1.删除/清理构建文件夹的 webpack 插件
    new CleanWebpackPlugin(),

    //2.html-webpack-plugin  
    new HtmlWebpackPlugin({
      title: 'webpack5',
      template: path.resolve(__dirname, './public/index.html'),
      filename: 'index.html'
    }),
    //3.设置常量
    new DefinePlugin({
      BASE_URL: '"./"'//设置和index.html同级路径，小坑，这里再加上“”
    }),

    //4.命令行友好提示
    new friendlyErrorsWebpackPlugin(),
    // 5.拷贝目录
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: "public",//目标源文件
          globOptions:{//排除的文件，因为public中已经有index.html会和上面的插件中的index.html文件重复报错
            ignore:['**/index.html']//忽略index.html,小坑必须加上**/
          }
        }
        
      ],
    }),
    // new MiniCssExtractPlugin({
    //   // 对输出的css文件进行重命名
    //   filename: 'css/built.css'
    // }),
    //压缩css
    // new OptimizeCssAssetsWebpackPlugin()
  ]
  // 模式
  //mode: 'development', // 开发模式
   //mode: 'production',

  //开发服务器devServer:用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
  //特点：只会在内存编译打包，不会有任何输出
  //启动devServer指令为：npx webpack-dev-server
  
};