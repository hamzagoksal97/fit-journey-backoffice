import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'antd'
import tr_TR from 'antd/lib/locale/tr_TR';
import { BrowserRouter } from "react-router-dom";
import store from './store/configureStore'
import { Provider } from 'react-redux'
import './localization'
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Eklentileri etkinleştir
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('tr');
// Zaman dilimini ayarla (Türkiye için)
dayjs.tz.setDefault('Europe/Istanbul');

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ConfigProvider locale={tr_TR}
    datePicker={{
      getPopupContainer: (trigger) => trigger.parentNode,
      format: 'YYYY-MM-DD HH:mm:ss',
    }}
  >
    <Provider store={store}>
      <BrowserRouter >
        <App />
      </BrowserRouter>
    </Provider>
  </ConfigProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
