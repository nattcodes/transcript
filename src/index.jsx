import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// const express = require("express");
// const cors = require("cors");
// const app = express();
// app.use(express.json())
// app.use(cors({
//   origin: 'http://localhost:3000', // replace with the origin of your React application
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
