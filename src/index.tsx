import { BrowserRouter } from 'react-router-dom';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';

import './index.css';
import App from "./components/App";
import Config from './constants/Config';
import i18n from './i18n';

<script src="https://cdn.jsdelivr.net/npm/i18next-http-backend@1.3.1/i18nextHttpBackend.min.js" />;

<link rel="icon" href="%PUBLIC_URL%/logo32.png" />;

// Stuff any debugging logs in production
if (Config.env === "production") {
  // console.log("disabling logging");
  window.console = console;
  // eslint-disable-next-line no-empty-function,@typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  const noop = (...args: any) => {};
  console.log = noop;
  console.warn = noop;
  console.error = noop;
}

// Create the HTML root element and
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div />}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
