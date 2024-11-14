import React, { useContext } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Footer from './Footer';
import { styled } from '@mui/system';
import ThemeContext from '../Context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const HeroSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '80vh',
  padding: '32px',
  textAlign: 'center',
});

const ButtonContainer = styled(Box)({
  display: 'flex',
  gap: '15px',
  marginTop: '24px',
  justifyContent: 'center',
});

const HoverButton = styled(Button)({
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
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'white' }}>
      {/* Main Hero Section */}
      <HeroSection style={{ backgroundColor: theme?.backgroundColor, color: theme?.color }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Hackify
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          Discover a smarter way to manage your Hackathons or Participate in Hackathons.
        </Typography>
        
        {/* Buttons Below the Text */}
        <ButtonContainer>
          <HoverButton variant="contained" onClick={()=>{navigate('/admin')}}>For Organisers</HoverButton>
          <HoverButton variant="contained" onClick={()=>{navigate('/hackathons')}}>For Participants</HoverButton>
        </ButtonContainer>
      </HeroSection>
      <Box style = {{height : '75px' , width : '100vw', backgroundColor : theme.backgroundColor , color : theme.color}}/>
      <Footer />
    </Box>
  );
};

export default LandingPage;
