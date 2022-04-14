const isDevelopment = process.env.NODE_ENV !== 'production';
//console.log(isDevelopment,'111');
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
        
    ],
    ['@babel/preset-react'],

    // '@babel/preset-typescript',
    // '@emotion/babel-preset-css-prop',
  ],
   plugins: [
    [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
    
   ],
};
