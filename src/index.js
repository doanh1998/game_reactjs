import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
ReactDOM.render(<App txt="this is the prop text "/>, document.getElementById('root'));
registerServiceWorker();
