import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.jsx'
import './css/index.less';
import './js/Font';



if (module.hot) {
  module.hot.accept(['./js/Font.js',] )
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />)