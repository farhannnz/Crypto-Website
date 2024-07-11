
import React from 'react';
import './App.css';
import {Routes, Route} from "react-router-dom";
import Exchange from './Components/Exchange';
import Coins from './Components/Coins';
import Details from './Components/Details';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/exchanges" element={<Exchange/>} />
        <Route path="/" element={<Coins/>} />
        <Route path="/coins/:id" element={<Details/>} />
      </Routes>
    </div>
  );
}

export default App;