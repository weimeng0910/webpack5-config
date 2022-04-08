#🌈 🚀 基于 webpack5.0 从零搭建的 React cookbooks。🚀

# 技术栈

涉及的技术栈均采用当前最新的版本和语法：

- 使用 Webpack5.0 构建项目（不使用 create-react-app、umi 等脚手架）；
- 使用 Babel7 配置转换 ES6、React、Mobx 等语法；
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
│   └── main.js             // 项目入口文件
├── .babelrc                // babel配置
├── .browserslistrc         // 浏览器过滤规则配置
├── .editorconfig           // 项目格式配置
├── .eslintrc.js            // ESLint配置
├── .gitignore              // git 忽略配置
├── .postcssrc.js           // postcss配置
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
+.建立 postcss.config.js 文件用来复用插件

### 6 importLoader 属性

为了让 css-loader 重新再加载@import 的文件，相当于再调下面的  postcss-loader 一次
如果下面还有别的 loader 就改数值为 2
{

loader:'css-loader',
options: {

importLoaders : 1
}
}

### 7 file-loader 处理图片，将图片当一个模块对待

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

### 8 url-loader 处理图片

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
        //3.图片的处理 |jpg|png|gif资源
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
