import React, { useContext } from 'react';
import ThemeContext from '../Context/ThemeContext';
import { Box, Container, Typography, TextField, Button, Grid, Paper } from '@mui/material';

const ContactUs = () => {
  const { theme, isDark } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        backgroundColor: theme.backgroundColor,
        color: theme.color,
        py: 5,
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: '12px',
            color: theme.color,
            backgroundColor: theme.backgroundColor || '#ffffff',
            boxShadow: isDark ? '0px 4px 15px rgba(0, 0, 0, 0.2)' : '0px 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 3 }}>
            We’d love to hear from you! Please fill out the form below to get in touch.
          </Typography>

          <form>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Your Name"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    style: { color: theme.color }, // Placeholder color
                  }}
                  InputProps={{
                    style: { backgroundColor: theme.inputBg || theme.backgroundColor, color: theme.color },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      transition: '0.3s',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      },
                      '&:focus-within': {
                        borderColor: theme.primary || '#ffc107',
                      },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Your Email"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    style: { color: theme.color },
                  }}
                  InputProps={{
                    style: { backgroundColor: theme.inputBg || theme.backgroundColor, color: theme.color },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      transition: '0.3s',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      },
                      '&:focus-within': {
                        borderColor: theme.primary || '#ffc107',
                      },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Subject"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    style: { color: theme.color },
                  }}
                  InputProps={{
                    style: { backgroundColor: theme.inputBg || theme.backgroundColor, color: theme.color },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      transition: '0.3s',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      },
                      '&:focus-within': {
                        borderColor: theme.primary || '#ffc107',
                      },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Message"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  InputLabelProps={{
                    style: { color: theme.color },
                  }}
                  InputProps={{
                    style: { backgroundColor: theme.inputBg || theme.backgroundColor, color: theme.color },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      transition: '0.3s',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      },
                      '&:focus-within': {
                        borderColor: theme.primary || '#ffc107',
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>

            <Box textAlign="center" mt={4}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  borderRadius: '25px',
                  px: 5,
                  py: 1.5,
                  transition: '0.3s',
                  backgroundColor: '#ffc107',
                  color: theme.color,
                  '&:hover': {
                    backgroundColor: '#e0a800',
                    boxShadow: '0 6px 18px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                Send Message
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default ContactUs;
