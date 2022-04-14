#🌈 🚀 基于 webpack5.0 从零搭建的 React cookbooks。🚀

# 技术栈

涉及的技术栈均采用当前最新的版本和语法：

- 使用 Webpack5.0 构建项目（不使用 create-react-app、umi 等脚手架）；
- 使用 Babel8 配置转换 ES6、React、Mobx 等语法；
- React 版本 V17.0.1，全部采用函数化 Hooks 特性开发项目组件；
- 采用 React-router5 工具 配置项目路由；
- 采用 Mobx5 + Hooks 实现项目数据状态管理；
- 封装 Axios 库实现与后台 http 请求交互；
- UI 库采用流行的 Ant-design4.0 组件库；

## 目录结构

```
├── config                  // webpack配置
│   ├── webpack.common.js   // webpack通用配置
│   ├── webpack.dev.js      // webpack开发环境配置
│   └── webpack.prod.js     // webpack生产环境配置
├── dist                    // 打包输出目录
├── public                  // 项目公开目录
├── src                     // src开发目录
│   ├── assets              // 静态资源
│   ├── components          // 公共组件
│   ├── layouts             // 页面布局组件
│   ├── modules             // 公共业务模块
│   ├── pages               // 具体业务页面
│   ├── routers             // 项目路由配置
│   ├── services            // axios服务等相关
│   ├── stores              // 全局公共 mobx store
│   ├── styles              // 存放公共样式
│   ├── utils               // 工具库/通用函数
│   ├── index.html          // 入口html页面
│   └── index.js            // 项目入口文件
├── .babel.config.js        // babel配置,依赖什么样的插件
├── .browserslistrc         // 浏览器过滤规则配置,babel依赖这个文件，同样css也依赖
├── .editorconfig           // 项目格式配置
├── .eslintrc.js            // ESLint配置
├── .gitignore              // git 忽略配置
├── .postcssrc.js           // postcss配置,依赖什么样的插件
├── package.json            // 依赖包配置
└── README.md               // 项目说明
```

### 1.初始化 package.json

初始化安装：yarn init

### 2.安装 webpack

安装：yarn add -D webpack webpack-cli webpack-merge

webpack-merge 使用说明

+分离配置文件 +我们在根目录下创建 config 文件夹，并创建四个配置文件：

webpack.comm.js 公共环境的配置文件
webpack.development.js 开发环境下的配置文件
webpack.production.js 生产环境下的配置文件
webpack.parts.js 各个配置零件的配置文件

### 3.安装 css 的处理 loader，less-loader,style-loader

    安装：yarn  add -D css-loadr less less-loader style-loader

    less(less-loader)-->css-->css-loader

### 4.到底要兼容那些平台,网站 caniuse.com 可以得到主流浏览器是那些，告诉我们的工具插件怎样兼容那些浏览器

    +.工程化
    +.兼容性：css ,js
    +.到底要兼容那些平台,网站 caniuse.com可以得到主流浏览器是那些，告诉我们的工具插件怎样兼容那些浏览器
    +.建立.browserslistrc文件，里面设置兼容浏览器的设置如下，条件符合后就会知道兼容那些浏览器
          > 1%
          last 2 version
          not dead

### 5.css 兼容性处理：postcss --> postcss-loader postcss-preset-env

安装：yarn add -D postcss

安装：yarn add -D postcss-cli 作用是在终瑞使用 postcss 命令

安装：yarn add -D autoprefixe
在命令窗口输入 npx postcss --use autoprefixer -o ret.css ./src/css/test.css

安装：yarn add -D postcss-loader

网站示例：autoprefixer.github.io

1.如何实现兼容,postcss 是什么： javascript 转换样式的工具
2.css 兼容性处理：postcss --> postcss-loader
帮 postcss 找到 .browserslist 里面的配置，通过配置加载指定的 css 兼容性样式,
在 css 的设置中按以下选项设置

      options: {
                 //官方给出的参数
                 postcssOptions:{
                   //加载插件
                  plugins:[
                    require('autoprefixer')
                 ]
               }
             }

3.预设--插件的集合
安装：安装：yarn add -D postcss-preset-env
建立 postcss.config.js 文件用来复用插件

### 6. importLoader 属性

为了让 css-loader 重新再加载@import 的文件，相当于再调下面的  postcss-loader 一次
如果下面还有别的 loader 就改数值为 2
{

        loader:'css-loader',
        options: {

             importLoaders : 1
        }
     }

### 7. file-loader 处理图片，将图片当一个模块对待

安装：yarn add -D file-loader

图片处理：
-->img src

使用 require 导入图片，需要设置 esModule:false

采用 import xxx from ‘xxx'导入图片
-->background url

图片 options 配制说明：
[ext]:扩展名
[name]:文件名
[hash]:文件内容
[hash:<length>]:hash 值长度

### 8.url-loader 处理图片

安装：yarn add -D url-loader

    url-loader 与 file-loader 的区别

    url-loader base64 url文件当中，减少请求次数

    file-loader 将资源拷贝到指定目录，分开请求

    url-loader可以调用file-loader，通过limit设置
        图片大小小于8kb，就会被base64处理
        优点: 减少请求数量（减轻服务器压力）
        缺点：图片体积会更大（文件请求速度更慢）

    解决：关闭url-loader的ES6模块化，使用commonjs解析
         esModule: false

### 9.配置 asset module type 替换 url-loader 与 file-loader 的配制

    注意：这是webpack5后新出的配制项，因为webpack内置了所以不需要安装
    常用配制：

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
      }

    asset/resource  -->这个配制项等同于file-loader


    {

        test: /\.(svg|png|gif|jpe?g)$/,
        type:'asset/resource',
        generator:{
          filename:"images/[name].[hash:6][ext]"
        }
      }

    asset/inline    -->等同于url-loader
    {

        test: /\.(svg|png|gif|jpe?g)$/,
        type:'asset/inline

      }

    asset/source    -->raw-loader

### 10.webpack 通过 asset 配制字体，图标资源

    webpack5按照以下配制字体图标资源
       {
        test:/\.(ttf|woff|eot|svg)$/,
        type:'asset/resource',
        generator:{
          filename:"fonts/[name].[hash:6][ext]"
        }
      }

### 11.clean-webpack-plugin

安装：yarn add -D clean-webpack-plugin

    注意： 每一个plugin本身就是一个类
    功能：一个用于删除/清理构建文件夹的 webpack 插件
        此插件将output.path在每次成功重建后删除 webpack 目录中的所有文件

### 12.配置 Html 模板 html-webpack-plugin

安装：yarn add -D html-webpack-plugin

    功能：默认会动态的在dist目录中创建一个空的HTML，自动引入打包输出的所有资源（JS/CSS）
    需求：需要有结构的HTML文件

针对 public 文件夹中 index.html 页面中出现的常量使用
DefinePlugin 在编译时将代码中的变量替换为其他值或表达式
通过 const {DefinePlugin}=require('webpack') 导入

针对 命令行友好提示需要安装下面插件
安装：yarn add -D friendly-errors-webpack-plugin

### 13.配置 Babel 实现 JS 的兼容操做

安装：yarn add -D babel-loader @babel/core @babel/preset-env

     功能：Babel 是一个 JavaScript 编译器，识别 JSX ES6+ TS 转换 ES5 代码，让你使用最新的语言特性而不用担心兼容性问题，并且可以通过插件机制根据需求灵活的扩展
     1.babel-loader - 使用Babel和webpack转译文件
     2.@babel/core - 转译ES2015+的代码
     3.@babel/preset-env 插件的集合
     4.在 Babel 执行编译的过程中，会从项目根目录下的配置文件读取配置。在根目录下创建Babel的配置文件babel.config.js(json cjs mjs)多包管理，简化webpack.config中的配制
     5.还可以建立babelrc.json(以前的方式)
     6.在根目录下建立文件.gitignore排除babel对node_modules文件和dist目录进行再检查

### 14.polyfill 配制的操做实再 JS 兼容的补充(生产依赖)

安装：yarn add core-js regenerator-runtime

     说明：对更新的语法进行兼容，例如 promise ，在webpack5之前不用处理，因为现在webpack5去除了polyfill
     配制：在babel.config.js中配制如下
     module.exports = {
          presets: [
            [
              '@babel/preset-env',
              {
                // 按需加载
                //false 不对当前的JS做polyfill填充
                //usage 依据用户当前使用的新语法填充
                //entry 依据我们筛选的浏览器填充
                useBuiltIns: 'usage',
                // 指定core-js版本，默认是 2 会报错
                corejs: 3
              }

            ]

          ]

        };

### 15.copy-webpack-plugin 将已存在的单个文件或整个目录复制到构建目录。

安装：yarn add -D copy-webpack-plugin

     说明：对public文件夹中的文件在打包时复制文件
     导入：const CopyPlugin = require("copy-webpack-plugin");
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

### 16.webpack-dev-server 搭建本地服务器

安装：yarn add -D webpack-dev-server

      说明：自动更新有两种方法，第一种如下：
      在 package.json 中配制--watch,进入监控模式，但效率不是最优，因为所有代码都需要重新编译，每次编译后都需要文件读写
      "build": "webpack --config meng.webpack.config.js --watch

      第二种方法配制服务器模式：
      开发服务器devServer:用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
      特点：只会在内存编译打包，不会有任何输出
      启动devServer指令为：npx webpack-dev-server
      在 package.json 中配制 "serve": "webpack serve  --config meng.webpack.config.js"

### 17.webpack-dev-middleware

安装： yarn add -D express

      yarn add -D webpack-dev-middleware

        说明：在开发中追求自由度更高的一些操做，与 webpack 包一起使用的 express 样式的开发中间件,仅用于开发
          -->没有文件写入磁盘，而是处理内存中的文件
          -->如果文件在监视模式下更改，中间件会延迟请求，直到编译完成。
          -->支持热模块重载（HMR）。

### 18.HMR 使用(Hot Module Replacement)

        说明：HMR 不适用于生产环境，这意味着它应当用于开发环境
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

### 19.React 组件支持 HMR

    说明：第一步支持react项目的打包（jsx的支持需要babel-loader)
    安装： yarn add -D @babel/core --dev @babel/preset-react @babel/preset-env
    安装:  yarn add -D react react-dom
     @babel/preset-react是转换jsx语法的包

    第二步支持react项目的热更新
    安装:yarn add -D @pmmmwh/react-refresh-webpack-plugin react-refresh
    配制：在babel.config.js中配制如下
    plugins: [
     ['react-refresh/babel']

     ],
     在webpack.config.js中配制如下
     const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
     new ReactRefreshWebpackPlugin()

### 20.devServer 的详细配制

    常用配置：
          devServer:{
                //热更新
                hot: "only",
                //防止某一个组件更新后引起所有组件更新，v4已经废弃
                // hotOnly: true,
                //端口号
                port: 3000,
                //自动打开浏览器,设为false防止每次都打开新的窗口
                open: false,
                //是否为每个静态文件启动gzip压缩 也可以使用命令：npx webpack serve --compress
                compress:true,
                //把404页面转换成index.html
                historyApiFallback: true,
                //告诉本地服务从哪里提供内容且只有在您想要提供静态文件时才需要这样做
                //其实就是index.html所在的目录
                static: {
                  directory: path.join(__dirname,  'public')
                },
              },
            首先明白两点:
            1.在webpack.config.js文件中，output配置只在production环境下起效，devServer只在development环境下有效。
            2.devServer运行下所编译的文件皆存在于内存中，不会改变本地文件。在服务运行中如果内存中找不到想要的文件时，devServer 会根据文件的路径尝试去本地磁盘上找，如果这样还找不到才会 404

            说明：在开发状态下，点击路由后如果刷新浏览器会现 Cannot GET/about ,这个问题需要
            对devServer.historyApiFallback 进行监控，devServer.historyApiFallback可以帮助我们把404的页面
            转为index.html设置如下：historyApiFallback: true,
            通过提供一个对象，这种行为可以通过像 rewrites 这样的配置项进一步控制：
              historyApiFallback: {
                rewrites: [
                  { from: /^\/$/, to: '/views/landing.html' },
                  { from: /^\/subpage/, to: '/views/subpage.html' },
                  { from: /./, to: '/views/404.html' },
                ],
              },

### 21.proxy 代理设置

     说明：1.在开发阶段来解决跨域问题，index.html页面当中需要其它数据，然尔这些数据在另外的服务器瑞口上
          2.在开发阶段下，后瑞接口在另一个服务瑞口，当前开发在瑞口3000下，通过代理来接决（服务瑞对服务端不存在跨域问题）

### 22.解析 resolve

      说明：1.对文件后缀名有效解释,配置如何解析模块。例如，import 'lodash'在 ES2015 中调用时，resolve选项可以改变 webpack 去哪里寻找'lodash'
           2.解析别名,更轻松地为某些模块import或某些模块创建别名
              解析模块的规则resolve
              resolve: {
                  //配制省略文件路径的后缀名，extensions（翻译：扩展）
                  extensions: ['.jsx', '.ts', '.tsx', '.js'],
                  //配制解析模块的路径别名;简写路径，缺点是没有提示
                  alias: {
                    '@': path.resolve(__dirname, 'src'),
                  },
                },

### 22.source-map 的作用

      说明：source-map是一种映射的技术，依据打包后代码，返还成我们编写的代码
            在开发环境下，真实的浏览器中的代码和我们编写的代码存在差异，
            source-map对打包后输出的错误更好的查找！更好的定位到源代码中的错误。
      设置；此选项控制是否生成，以及如何生成 source map
            自已开发时用下面这个配置
            devtool: 'inline-cheap-source-map',

### 23.ts-loader 编译 TS

安装 yarn add typescript --dev
安装 yarn add ts-loader --dev

### 24.按照模式来分离配制文件

    说明：1.建立config文件夹，创建下面文件
        --> webpack.comm.js
        --> webpack.development.js
        --> webpack.production.js

         2.在package.json中设置指向webpack.comm.js
         --> "build": "webpack --config ./config/webpack.comm.js --env production",
         --> "serve": "webpack serve  --config ./config/webpack.comm.js --env development"

         3.对拆分的配制按照需求合并
         安装 yarn add -D webpack-merge
         --> 根据获得的env的值进行判断后合并
         --> 解决路径问题，配制文件进入config文件夹中的路径问题！
