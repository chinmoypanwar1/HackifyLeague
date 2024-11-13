import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../Assets/Css/Navbar.css';
import StudentProfile from './StudentProfile';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import ThemeContext from '../Context/ThemeContext';

const Navbar = ({ authenticated }) => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useContext(ThemeContext);

  const handleDarkMode = () => {
    toggleTheme();
  };

  return (
    <nav
      className={`navbar-container ${isDark ? 'dark-mode' : 'light-mode'}`}
    >
      <div className="navbar-content">
        <a
          href="/"
          className="navbar-logo"
          style={{
            textDecoration: 'none',
            marginLeft: '5vmin',
          }}
        >
          Hackify
        </a>

        <div className="navbar-center">
          <ul className="navbar-links">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/projects">Projects</a>
            </li>
            <li>
              <a href="/hackathons">Hackathons</a>
            </li>
          </ul>
        </div>

        <div className="navbar-right">
          <div
            className={`form-check form-switch text-${isDark ? 'light' : 'dark'} mx-3`}
          >
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              checked={isDark}
              onChange={handleDarkMode}
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
              style={{ color: isDark ? 'white' : 'black' }}
            >
              {isDark ? 'Dark Mode' : 'Light Mode'}
            </label>
          </div>
          {!authenticated && (
            <Button
              variant="contained"
              sx={{
                margin: '0vmin 1vmin',
                color : '#000',
                backgroundColor: '#ffc107',
                '&:hover': {
                  backgroundColor: '#e0a800',
                },
              }}
              onClick={() => {
                navigate('/login');
              }}
            >
              Login
            </Button>
          )}
          <StudentProfile />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
