import React, { useContext } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Footer from './Footer';
import { styled } from '@mui/system';
import ThemeContext from '../Context/ThemeContext';

const HeroSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '80vh',
  padding: '32px',
  textAlign: 'center',
});

const CTAButton = styled(Button)({
  marginTop: '24px', 
  padding: '12px 32px', 
  backgroundColor: '#ffc107',
  color: '#000',
  fontSize: '1.2rem',
  '&:hover': {
    backgroundColor: '#e0a800',
  },
});

const LandingPage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Box>
      {/* Main Hero Section */}
      <HeroSection style={{ backgroundColor: theme?.backgroundColor, color: theme?.color }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Hackify
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          Discover a smarter way to manage your Hackathons or Participate in Hackathons.
        </Typography>
        <CTAButton variant="contained" size="large">
          Get Started
        </CTAButton>
      </HeroSection>

      <Footer />
    </Box>
  );
};

export default LandingPage;
