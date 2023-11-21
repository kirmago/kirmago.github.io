import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './containers/App';
import { store } from "./feature/store/store";
import { Provider } from "react-redux";
import { HelmetProvider } from 'react-helmet-async';
import { HashRouter as Router } from 'react-router-dom';
const helmetContext = {};



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
    <Router>
      <HelmetProvider context={helmetContext}>
        <App />
      </HelmetProvider>
    </Router>
  </Provider>
  </React.StrictMode>
);
