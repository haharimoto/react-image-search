import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

// check if API Key exist
function checkApiKey() {
  if (!process.env.REACT_APP_UNSPLASH_API_KEY) {
      console.warn('Unsplash API key is not present. Make sure to create and have API key in both .env and Main.js (inside fetchImages function).')
  } else {
    console.log('API key present')
  }
}

checkApiKey()


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <App />
)
