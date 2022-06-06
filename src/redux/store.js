/*
   创建 Redux Store，最新Redux store
   是使用 Redux Toolkit 中的 configureStore 函数创建的。
   configureStore 要求我们传入一个 reducer 参数。
*/
import { configureStore } from '@reduxjs/toolkit';
//导入reducer
import collApsedReducer from './CollapsedReducerSlice';
//创建store
export const store = configureStore({
    reducer: {
        collApsedReducer,
    },
});
