import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/App.css';
import 'leaflet/dist/leaflet.css';   // ✅ Required for map tiles and markers
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
