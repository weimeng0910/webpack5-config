const path = require('path');
const resolveApp = require('./paths')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
 
  mode:"development",

  devtool: 'inline-cheap-source-map',

  target:'web',
  
  devServer:{
   
    hot: "only",
  
    port: 3000,
   
    open: false,
    
     compress:true,
    
     historyApiFallback: true,
   
     static: {
      directory: resolveApp('./public')
    },
  },

  plugins: [

    new CleanWebpackPlugin(),

    new CopyWebpackPlugin({
      patterns: [
        { 
          from: "public",
          globOptions:{
            ignore:['**/index.html']
          }
        }
        
      ],
    }),
    new ReactRefreshWebpackPlugin()
    
  ]
  
};

