import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './Pages/Landing';
import Logic from './Pages/Logic';

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