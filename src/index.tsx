import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from "./components/App";
import AppRouter from './AppRouter';
import './i18n';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Theme from "./components/utils/Theme";

<script src="/js/intlTelInput.min.js" charSet="utf-8"></script>

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Theme>
          <App>
            <AppRouter />
          </App>
        </Theme>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
