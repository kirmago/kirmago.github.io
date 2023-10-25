import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';
import { HashRouter as Router } from 'react-router-dom';
const helmetContext = {};



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <HelmetProvider context={helmetContext}>
        <App />
      </HelmetProvider>
    </Router>
  </React.StrictMode>
);
