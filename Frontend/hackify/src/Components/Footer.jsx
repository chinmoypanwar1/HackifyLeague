import React, { useContext } from 'react';
import ThemeContext from '../Context/ThemeContext';
import { Container, Typography, Box, Grid, Link, Divider } from '@mui/material';

const Footer = () => {
  const { theme, isDark } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        backgroundColor: isDark ? '#353b3f' : '#f5f5f5', 
        color: theme.color,
        padding: '40px 0', // Increase height by adding padding
      }}
    >
      <Container maxWidth="xl"> {/* Wider container for full page width */}
        <Grid container spacing={4} justifyContent="space-around">
          {/* Portfolio Section */}
          <Grid item xs={12} sm={4} md={4} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Portfolio
            </Typography>
            {['Your Projects', 'Your Hackathons', 'Settings'].map((text) => (
              <Link
                href="#"
                color="inherit"
                variant="body2"
                key={text}
                sx={{
                  display: 'block',
                  mt: 1,
                  textDecoration: 'none', // Remove underline
                  transition: 'color 0.3s', // Smooth color transition
                  '&:hover': {
                    color: '#ffc107', // Change color on hover
                  },
                }}
              >
                {text}
              </Link>
            ))}
          </Grid>

          {/* Resources Section */}
          <Grid item xs={12} sm={4} md={4} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Resources
            </Typography>
            {['Help Center', 'Terms of Service', 'Privacy Policy'].map((text) => (
              <Link
                href="#"
                color="inherit"
                variant="body2"
                key={text}
                sx={{
                  display: 'block',
                  mt: 1,
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                  '&:hover': {
                    color: '#ffc107',
                  },
                }}
              >
                {text}
              </Link>
            ))}
          </Grid>

          {/* Connect Section */}
          <Grid item xs={12} sm={4} md={4} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Connect
            </Typography>
            {[
              { text: 'Twitter', url: 'https://twitter.com' },
              { text: 'LinkedIn', url: 'https://linkedin.com' },
              { text: 'GitHub', url: 'https://github.com' },
            ].map((item) => (
              <Link
                href={item.url}
                color="inherit"
                variant="body2"
                key={item.text}
                sx={{
                  display: 'block',
                  mt: 1,
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                  '&:hover': {
                    color: '#ffc107',
                  },
                }}
              >
                {item.text}
              </Link>
            ))}
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, bgcolor: theme.color }} /> {/* Divider color to match the theme */}

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Hackify. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
