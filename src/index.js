import React from 'react';
import ReactDOM from 'react-dom';
// import { createRoot } from 'react-dom/client';
import './utils/axios-http';
import App from './App';

import store from '@/redux/store';
import { Provider } from 'react-redux';
// const rootElement = document.getElementById('app');
// const root = createRoot(rootElement);
ReactDOM.render(
    /* 此处需要用Provider包裹App，目的是让App所有的后代容器组件都能接收到store */
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
// root.render(<App />);
