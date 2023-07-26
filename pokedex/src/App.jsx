import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Card from './components/tarjetas';
import PokemonComponent from './api/getData';
function App() {
  return (
    <div className="App">
      <PokemonComponent />
    </div>
  );
}

export default App
