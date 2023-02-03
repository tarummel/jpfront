import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from './components/utils/AppRouter';
import reportWebVitals from './reportWebVitals';
import { App, Theme } from "./components/utils";
import './i18n';
import { BrowserRouter } from 'react-router-dom';
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
