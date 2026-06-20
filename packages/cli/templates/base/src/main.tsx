import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import '@vientonorte/tokens/css';
import './styles/global.css';
import { injectCSPMeta, vientonorteCSP } from '@vientonorte/security';

injectCSPMeta(vientonorteCSP);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
