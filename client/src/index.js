import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App2';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
// import 

ReactDOM.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
  document.getElementById('root')
);

// reportWebVitals();
