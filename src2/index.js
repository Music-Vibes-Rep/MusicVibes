import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.css';
import Recomendamos from './components/recomendamos.jsx';
import formLogin from './components/formLogin.jsx';
import formRegister from './components/formRegister.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Recomendamos />}>
          <Route path="/login" element={<formLogin />} />
          <Route path="/contact" element={<formRegister />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
