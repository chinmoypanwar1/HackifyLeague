import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//components
import Login from './Components/Login'
import About from './Components/About'
import Home from './Components/Home'
import Profile from './Components/Profile';
import ForgotPassword from './Components/Forgotpassword';
import Resetpassword from './Components/Resetpassword';
import HackathonsPage from './Components/Hackathons';
import Organiser from './Components/Organiser';
function App() {
  const [authenticated , setAuthenticated] = useState(false);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login authenticated = {authenticated}  setAuthenticated = {setAuthenticated}/>} /> 
        <Route path="/" element={<Home authenticated = {authenticated}  setAuthenticated = {setAuthenticated}/>} /> 
        <Route path="/profile" element={<Profile/>} /> 
        <Route path="/about" element={<About/>} /> 
        <Route path="/hackathons" element={<HackathonsPage/>} /> 
        <Route path="/admin" element={<Organiser/>} /> 
        <Route path="/forgotpassword" element={<ForgotPassword/>} /> 
        <Route path="/resetPassword/:resetToken" element={<Resetpassword/>} /> 
      </Routes>
    </Router>
  );
}

export default App;
