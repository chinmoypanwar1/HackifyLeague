import React from 'react';
import { Container, Typography, Box, Divider, Card, CardContent, Grid } from '@mui/material';
import { People, Event, EmojiEvents } from '@mui/icons-material';
import { useContext } from 'react';
import ThemeContext from '../Context/ThemeContext';
import Navbar from './Navbar';
import Footer from './Footer';

const AboutUs = () => {
  const primaryColor = '#ffc107';
  const {theme , isDark} = useContext(ThemeContext);

  return (
    <>
    <Navbar/>
    <Box sx={{ backgroundColor: theme.backgroundColor, py: 8 }}>
      <Container maxWidth="md" sx={{ p: 4, borderRadius: 2, backgroundColor: theme.backgroundColor, boxShadow: 3 }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: primaryColor }}>
            About Us
          </Typography>
          <Typography variant="subtitle1" sx={{ fontSize: '1.2rem', color : theme.color }}>
            Welcome to Hackify — where hackathons are made simple, engaging, and impactful for everyone!
          </Typography>
        </Box>

        <Divider sx={{ my: 4, bgcolor: primaryColor }} />

        <Box mb={4}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'medium', color: primaryColor }}>
            Our Purpose
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.7 , color : theme.color }}>
            Hackify was created with the vision of bringing people together through hackathons. We aim to make hackathons accessible and manageable, providing a user-friendly platform for participants to register and organizers to manage events seamlessly.
          </Typography>
        </Box>

        <Divider sx={{ my: 4, bgcolor: primaryColor }} />

        <Box mb={4}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'medium', color: primaryColor }}>
            Key Features
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Card sx={{ backgroundColor : theme.backgroundColor, boxShadow:  isDark ? '0 4px 12px rgba(255 , 255 , 255 , 0.1)' : '0 4px 12px rgba(0, 0, 0, 0.1)'}}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <People fontSize="large" sx={{ color: primaryColor }} />
                  <Typography variant="h6" sx={{ color: primaryColor, fontWeight: 'bold' }}>
                    User Panel
                  </Typography>
                  <Typography variant="body2" sx = {{color : theme.color}}>
                    Allows participants to browse and join hackathons, track their progress, and stay connected with the hackathon community.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Card sx={{ backgroundColor : theme.backgroundColor , boxShadow:  isDark ? '0 4px 12px rgba(255 , 255 , 255 , 0.1)' : '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Event fontSize="large" sx={{ color: primaryColor }} />
                  <Typography variant="h6" sx={{ color: primaryColor, fontWeight: 'bold' }}>
                    Admin Panel
                  </Typography>
                  <Typography variant="body2" sx = {{color : theme.color}}>
                    Empowers organizers to create, manage, and update hackathons effortlessly with an intuitive admin interface.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 4, bgcolor: primaryColor }} />

        <Box textAlign="center" mt={4}>
          <Typography variant="h5" sx = {{color : theme.color}}>
            Join us and become part of an innovative community that believes in the power of collaboration!
          </Typography>
          <EmojiEvents fontSize="large" sx={{ mt: 2, color: primaryColor }} />
        </Box>
      </Container>
    </Box>
    <Footer/>
    </>
  );
};

export default AboutUs;
