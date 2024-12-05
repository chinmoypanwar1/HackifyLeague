import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//components
import Login from './Components/Login'
import About from './Components/About'
import Home from './Components/Home'
import Profile from './Components/Profile';
import ForgotPassword from './Components/Forgotpassword';
import Resetpassword from './Components/Resetpassword';
import HackathonsPage from './Components/Hackathons';
// import Organiser from './Components/AdminPage';
import ProjectsPage from './Components/ProjectsPage';
import HackathonDetails from './Components/HackathonDetails';
import Contact from './Components/Contact';
import Reminders from './Components/Reminders';
import AdminPage from './Components/AdminPage';
import HostHackathonForm from "./Components/HostHackathonPage"
import CreateTeam from './Components/CreateTeam';
import Team from './Components/Team';

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
        <Route path="/admin" element={<AdminPage/>} /> 
        <Route path="/host-public-hackathon" element={<HostHackathonForm/>} /> 
        <Route path="/host-internal-hackathon" element={<HostHackathonForm/>} /> 
        <Route path="/hackathons/:hackathonId" element={<HackathonDetails/>} /> 
        <Route path='/reminders' element={<Reminders/>} />
        {/* <Route path="/admin" element={<AdminPage/>} />  */}
        <Route path="/forgotpassword" element={<ForgotPassword/>} /> 
        <Route path="/resetPassword/:resetToken" element={<Resetpassword/>} /> 
        <Route path='/hackathons/:hackathonId/createTeam' element={<CreateTeam/>} />
        <Route path='/teams/:teamId' element={<Team/>} />

        {/* <Route exact path="/" component={AdminPage} /> */}
        {/* <Route path="/host-public-hackathon" component={HostHackathonForm} />
        <Route path="/host-internal-hackathon" component={HostHackathonForm} /> */}
      </Routes>
    </Router>
  );
}

export default App;
