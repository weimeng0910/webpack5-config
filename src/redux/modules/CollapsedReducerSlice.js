/**
 * Reducer
 * 以前使用 Redux 总是需要手动创建多个文件，reducer、action、action creator，
 * 但现在可以直接借助 @redux/toolkit 统一的放在一个文件中，
 * 结构化的去描述 Redux 中的 action 和 redcuer。
 */
import { createSlice } from '@reduxjs/toolkit';

const CollApsedReducerSlice = createSlice({
    //命名空间，自动追加，通过dispatch去更新状态的时候，name值会做为action type的前缀
    name: 'collApsed',

    //初始化状态数据
    initialState: {
        isCollapsed: false,
    },

    //reducer有两个做用，1.定义reducer更新状态的函数
    //2.后期组件更新去dispatch使用action函数的的时候做为action函数的方法名
    //内置了imnutable.js插件
    reducers: {
        setCollapsedState(state, action) {
            console.log(state, action);
            state.isCollapsed = !state.isCollapsed;
        },
    },
});

//导出action函数，改变状态的方法
export const { setCollapsedState } = CollApsedReducerSlice.actions;
//导出reducer，创建store
export default CollApsedReducerSlice.reducer;
