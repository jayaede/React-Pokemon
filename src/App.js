import React from 'react';
import Display from './Display';
import PokemonInfo from './PokemonInfo';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
    return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Display />}></Route>
          <Route path='/pokemoninfo' element={<PokemonInfo />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
