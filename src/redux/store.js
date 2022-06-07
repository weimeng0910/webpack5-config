/*
   创建 Redux Store，最新Redux store
   是使用 Redux Toolkit 中的 configureStore 函数创建的。
   configureStore 要求我们传入一个 reducer 参数。
*/
import { configureStore } from '@reduxjs/toolkit';
import rootReducers from './reducers'; // 引入 reducer 的集合
// 实例化 store，全局唯一
export const store = configureStore({
    reducer: rootReducers,
});
