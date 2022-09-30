import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import * as atatus from 'atatus-spa';

// async function makeRequest() {
//   try {
//     const res = await axios.get('https://example.com/does-not-exist');
//     const data = res.data;
//     console.log(data);
//   } catch (err) {
//     if (err.response) {
//       // ✅ log status code here
//       console.log(err.response.status);
//       console.log(err.message);
//       console.log(err.response.headers); // 👉️ {... response headers here}
//       console.log(err.response.data); // 👉️ {... response data here}
//     }
//   }
// }

// makeRequest();

atatus.config('453c234193ed4aef9791a646eacb48c9').install();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

atatus.notify(new Error('Test Atatus Setup'));
