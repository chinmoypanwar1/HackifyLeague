import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../Public/Css/Navbar.css';
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
            color: '#0b6efd',
          }}
        >
          Hackify
        </a>

        <div className="navbar-center">
          <ul className="navbar-links">
            <li>
              <a href="/" style={{ color: '#0b6efd' }}>Home</a>
            </li>
            <li>
              <a href="/about" style={{ color: '#0b6efd' }}>About</a>
            </li>
            <li>
              <a href="/contact" style={{ color: '#0b6efd' }}>Contact Us</a>
            </li>
            <li>
              <a href="/hackathons" style={{ color: '#0b6efd' }}>Hackathons</a>
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
              style={{ color: '#0b6efd' }}
            >
              {isDark ? 'Dark Mode' : 'Light Mode'}
            </label>
          </div>
          {!authenticated && (
            <Button
              variant="contained"
              sx={{
                margin: '0vmin 1vmin',
                backgroundColor: '#0b6efd',
                '&:hover': {
                  backgroundColor: '#084dbf',
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
