// resolve用来拼接绝对路径的方法
const path = require('path');
//path.join()方法使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径
//path.resolve() 该方法将一些的 路径/路径段 解析为绝对路径。
//两者区别：join是把各个path片段连接在一起， resolve把‘／'当成根目录
// __dirname nodejs的变量，代表当前文件的目录绝对路径
const srcDir = path.join(__dirname, '../src');

module.exports = {
  // webpack配置
  // 入口起点
  entry: {
    main: path.join(__dirname, '../src/main.js'),
  },
  // 输出
  output: {
    // 输出文件名
    filename: 'js/main.js',
    // 输出路径
    // __dirname nodejs的变量，代表当前文件的目录绝对路径
    path: resolve(__dirname, 'dist')
  },


  // loader的配置
  module: {
    rules: [
      
      // 详细loader配置
      // 不同文件必须配置不同loader处理

      //js兼容性处理.*****************************************
      //-->babel-loader
      {
        test:/\.js$/,
        exclude:/node_modules/,
        //优先执行
        enforce:'pre',
        loader:'eslint-loader',
        options:{
           //自动修复JS语法错误
           fix:true
        }

      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          //预设：指示babel做怎样的兼容性处理
          presets:[
            [
              '@babel/preset-env',
              {
                // 按需加载
                useBuiltIns: 'usage',
                // 指定core-js版本
                corejs: {
                  version: 3
                },
                // 指定兼容性做到哪个版本浏览器
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17'
                }
              }
            ]
          ]

        }
      },
      
      {
        test: /\.less$/,
        //数组代表要使用多个loader处理用use
        use: [
          'style-loader',
          'css-loader',
          // 将less文件编译成css文件
          // 需要下载 less-loader和less
          'less-loader',
        ]
      },
      //4.**************************************************
      {
        //处理图片资源
        test:/\.(jpg|png|gif)$/,
        //只使用一个loader
        loader:'url-loader',
        options: {
          // 图片大小小于8kb，就会被base64处理
          // 优点: 减少请求数量（减轻服务器压力）
          // 缺点：图片体积会更大（文件请求速度更慢）
          limit: 8 * 1024,
          // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
          // 解析时会出问题：[object Module]

          // 解决：关闭url-loader的ES6模块化，使用commonjs解析

          esModule: false,
          outputPath: 'images',
          // 给图片进行重命名
          // [hash:10]取图片的hash的前10位
          // [ext]取文件原来扩展名
          name: '[hash:10].[ext]'
        }
        
      },
      //5.**************************************************
      {
        test: /\.html$/,
        // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
        loader: 'html-loader'
      },
      // 打包其他资源(除了html/js/css资源以外的资源)
      {
        // 排除css|js|html|less|jpg|png|gif资源
        exclude: /\.(css|js|html|less|jpg|png|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'media'
        }
      }
    ]
  },
  // plugins的配置
  plugins: [
    // plugins的配置
    // html-webpack-plugin
    // 功能：默认会创建一个空的HTML，自动引入打包输出的所有资源（JS/CSS）
    // 需求：需要有结构的HTML文件
    new HtmlWebpackPlugin({
      //以这个目录下的文件为模板，复制这个文件
      template: `${srcDir}/index.html`,
      // 压缩html代码
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true
      }
    }),
    new MiniCssExtractPlugin({
      // 对输出的css文件进行重命名
      filename: 'css/built.css'
    }),
    //压缩css
    new OptimizeCssAssetsWebpackPlugin()
  ],
  // 模式
  // mode: 'development', // 开发模式
   mode: 'production',

  //开发服务器devServer:用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
  //特点：只会在内存编译打包，不会有任何输出
  //启动devServer指令为：npx webpack-dev-server
  devServer:{
    contentBase:resolve(__dirname,'build'),
    //启动gzip压缩
    compress:true,
    //端口号
    port:3000,
    //自动打开浏览器
    open:true
  }
};