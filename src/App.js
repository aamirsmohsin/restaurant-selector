import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './pages/landing';
import Logic from './pages/logic';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="logic" element={<Logic />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;