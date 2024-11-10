import React from 'react';
import { Container, Typography, Box, Divider, Card, CardContent, Grid } from '@mui/material';
import { People, Event, EmojiEvents } from '@mui/icons-material';

const AboutUs = () => {
  const primaryColor = '#0b6efd'; // Custom blue color

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', py: 8 }}>
      <Container maxWidth="md" sx={{ p: 4, borderRadius: 2, bgcolor: 'white', boxShadow: 3 }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: primaryColor }}>
            About Us
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ fontSize: '1.2rem' }}>
            Welcome to Hackify — where hackathons are made simple, engaging, and impactful for everyone!
          </Typography>
        </Box>

        <Divider sx={{ my: 4, bgcolor: primaryColor }} />

        <Box mb={4}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'medium', color: primaryColor }}>
            Our Purpose
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
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
              <Card sx={{ bgcolor: '#f9f9f9', boxShadow: 1 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <People fontSize="large" sx={{ color: primaryColor }} />
                  <Typography variant="h6" sx={{ color: primaryColor, fontWeight: 'bold' }}>
                    User Panel
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Allows participants to browse and join hackathons, track their progress, and stay connected with the hackathon community.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Card sx={{ bgcolor: '#f9f9f9', boxShadow: 1 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Event fontSize="large" sx={{ color: primaryColor }} />
                  <Typography variant="h6" sx={{ color: primaryColor, fontWeight: 'bold' }}>
                    Admin Panel
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Empowers organizers to create, manage, and update hackathons effortlessly with an intuitive admin interface.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 4, bgcolor: primaryColor }} />

        <Box textAlign="center" mt={4}>
          <Typography variant="h5" color="text.secondary">
            Join us and become part of an innovative community that believes in the power of collaboration!
          </Typography>
          <EmojiEvents fontSize="large" sx={{ mt: 2, color: primaryColor }} />
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUs;
