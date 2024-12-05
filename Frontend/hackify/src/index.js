import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ThemeContextProvider from './Context/ThemeContextProvider';
import ReminderContextProvider from './Context/ReminderContextProvider';
import UserContextProvider from './Context/UserContextProvider';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserContextProvider>
    <ReminderContextProvider>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </ReminderContextProvider>
  </UserContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
