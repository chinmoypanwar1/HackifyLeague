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
import ProjectsPage from './Components/ProjectsPage';
import HackathonDetails from './Components/HackathonDetails';
import Contact from './Components/Contact';
import Reminders from './Components/Reminders';

function App() {
  const [authenticated , setAuthenticated] = useState(false);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login authenticated = {authenticated}  setAuthenticated = {setAuthenticated}/>} /> 
        <Route path="/" element={<Home authenticated = {authenticated}  setAuthenticated = {setAuthenticated}/>} /> 
        <Route path="/profile" element={<Profile/>} /> 
        <Route path="/about" element={<About/>} /> 
        <Route path="/contact" element={<Contact/>} /> 
        <Route path="/projects" element={<ProjectsPage/>} /> 
        <Route path="/hackathons" element={<HackathonsPage/>} /> 
        <Route path="/reminders" element={<Reminders/>} /> 
        <Route path="/hackathons/:hackathonId" element={<HackathonDetails/>} /> 
        <Route path="/admin" element={<Organiser/>} /> 
        <Route path="/forgotpassword" element={<ForgotPassword/>} /> 
        <Route path="/resetPassword/:resetToken" element={<Resetpassword/>} /> 
      </Routes>
    </Router>
  );
}

export default App;
