import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { styled } from '@mui/system';

const HeroSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '80vh',
  backgroundColor: '#f5f5f5',
  padding: theme.spacing(4),
  textAlign: 'center',
}));

const CTAButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(1.5, 4),
  backgroundColor: '#0d6efd',
  color: '#fff',
  fontSize: '1.2rem',
  '&:hover': {
    backgroundColor: '#004080',
  },
}));

const FeatureSection = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
}));

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Your Project
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          Discover a smarter way to manage your Hackathons.
        </Typography>
        <CTAButton variant="contained" size="large">
          Get Started
        </CTAButton>
      </HeroSection>

      {/* 
      Features Section */}
      <FeatureSection maxWidth="md">
        <Typography variant="h4" component="h2" gutterBottom>
          Features
        </Typography>
        <Typography variant="body1" component="p" paragraph>
          - Host and Participate in hackathons easily.
        </Typography>
        <Typography variant="body1" component="p" paragraph>
          - Search and filter by categories.
        </Typography>
        <Typography variant="body1" component="p" paragraph>
          - Contribute to the community by sharing your resources.
        </Typography>
      </FeatureSection>
    </Box>
  );
};

export default Home;
