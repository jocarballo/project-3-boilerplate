import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProviderWrapper } from './context/auth'
import { QueryParamProvider } from 'use-query-params';


ReactDOM.render(
  <Router>
    <QueryParamProvider>
      <AuthProviderWrapper>
        <App />
      </AuthProviderWrapper>
    </QueryParamProvider>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

