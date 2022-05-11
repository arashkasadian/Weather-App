import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import "./assets/styles/style.css";
import { AnimatePresence } from 'framer-motion';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AnimatePresence>
      <App />
    </AnimatePresence>
  </React.StrictMode>
);
