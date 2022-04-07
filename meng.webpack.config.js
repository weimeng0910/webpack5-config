// resolve用来拼接绝对路径的方法
const path = require('path');

//path.join()方法使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径
//path.resolve() 该方法将一些的 路径/路径段 解析为绝对路径。
//两者区别：join是把各个path片段连接在一起， resolve把‘／'当成根目录
// __dirname nodejs的变量，代表当前文件的目录绝对路径
// const srcDir = path.join(__dirname, '../src');

module.exports = {
  // webpack配置
  
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
           'style-loader',
          
          // 创建style标签，将js中的样式资源插入进行，添加到head中生效
          // 'style-loader'
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
            'postcss-loader'
            
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
      {
        //3.图片的处理 |jpg|png|gif资源
        test: /\.(svg|png|gif|jpe?g)$/,
        use:[
          {
          loader:'file-loader',
          options:{
             esModule:false, //是否转化成EsModule
             name:'[name].[hash:6].[ext]',//图片名称
             outputPath:'images'
          }
          }
        ]
      }
    ]
  },
  // plugins的配置
  plugins: [
    // plugins的配置
    // html-webpack-plugin
    // 功能：默认会创建一个空的HTML，自动引入打包输出的所有资源（JS/CSS）
    // 需求：需要有结构的HTML文件
    // new HtmlWebpackPlugin({
    //   //以这个目录下的文件为模板，复制这个文件
    //   template: `${srcDir}/index.html`,
    //   // 压缩html代码
    //   minify: {
    //     // 移除空格
    //     collapseWhitespace: true,
    //     // 移除注释
    //     removeComments: true
    //   }
    // }),
    // new MiniCssExtractPlugin({
    //   // 对输出的css文件进行重命名
    //   filename: 'css/built.css'
    // }),
    //压缩css
    // new OptimizeCssAssetsWebpackPlugin()
  ],
  // 模式
  //mode: 'development', // 开发模式
   //mode: 'production',

  //开发服务器devServer:用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
  //特点：只会在内存编译打包，不会有任何输出
  //启动devServer指令为：npx webpack-dev-server
  // devServer:{
  //   contentBase:resolve(__dirname,'build'),
  //   //启动gzip压缩
  //   compress:true,
  //   //端口号
  //   port:3000,
  //   //自动打开浏览器
  //   open:true
  // }
};