const path = require('path')

const appDir = process.cwd()//node核心模块，进程的找到当前路径

const resolveApp =(relativePath) => { 
  
   return path.resolve(appDir,relativePath)
 }
 module.exports = resolveApp