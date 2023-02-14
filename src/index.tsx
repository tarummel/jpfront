import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';

import App from "./components/App";
import AppRouter from './AppRouter';
import i18n from './i18n';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Theme from "./components/utils/Theme";

<script src="https://cdn.jsdelivr.net/npm/i18next-http-backend@1.3.1/i18nextHttpBackend.min.js"></script>

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Theme>
        <Suspense fallback={<div />}>
          <I18nextProvider i18n={i18n}>
            <App>
              <AppRouter />
            </App>
          </I18nextProvider>
        </Suspense>
      </Theme>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
