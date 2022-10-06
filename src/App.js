import React, { useEffect } from 'react';
import Display from './Display';
import PokemonInfo from './PokemonInfo';
import Login from './Login';
import Displaypdf from './pdf/Displaypdf';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  useEffect(() => {
    window.addEventListener('unload', handleTabClosing)
    return () => {
      window.removeEventListener('unload', handleTabClosing)
    }
  })

  const handleTabClosing = () => {
    console.log("closed");
  }

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Displaypdf />}></Route>
          <Route path='/Login' element={<Login />}></Route>
          <Route path='/display' element={<Display />}></Route>
          <Route path='/pokemoninfo' element={<PokemonInfo />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
