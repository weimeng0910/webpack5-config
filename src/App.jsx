import React from 'react';
import './App.css';
import IndexRouter from './routers/IndexRouter';

import { store } from '@/redux/store';
import { Provider } from 'react-redux';
function App() {
    return (
        /* 此处需要用Provider包裹App，目的是让App所有的后代容器组件都能接收到store */
        <Provider store={store}>
            <IndexRouter></IndexRouter>
        </Provider>
    );
}
export default App;
