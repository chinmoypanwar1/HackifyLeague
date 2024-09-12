import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//components
import Login from './Components/Login'
import Home from './Components/Home'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} /> 
        <Route path="/" element={<Home/>} /> 
      </Routes>
    </Router>
  );
}

export default App;
