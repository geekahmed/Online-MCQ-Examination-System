import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';

import App from './App';
import * as serviceWorker from './serviceWorker';
ReactDOM.render(<ConfigProvider direction='rtl'>
    <App />
    </ConfigProvider>, document.getElementById('root'));
serviceWorker.unregister();
