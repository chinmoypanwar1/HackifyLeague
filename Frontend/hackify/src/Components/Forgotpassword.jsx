import React, { useState } from 'react';
import { Box, Container, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';

const ForgotPasswordContainer = styled(Container)(({ theme }) => ({
  height: 'auto',
  width: '90vw',
  maxWidth: '400px',
  marginTop: '10vmin',
  padding: theme.spacing(2),
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  backgroundColor: '#ffffff',
  [theme.breakpoints.up('sm')]: {
    width: '50vw',
  },
  [theme.breakpoints.up('md')]: {
    width: '30vw',
  },
}));

const Inputs = styled(Box)`
  margin-top: 3vmin;
  display: flex;
  flex-direction: column;
  gap: 2vmin;
`;

const StyledTypography = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: '20px',
  fontWeight: 600,
  fontSize: '4vmin',
  [theme.breakpoints.down('sm')]: {
    fontSize: '3vmin',
  },
}));

const ButtonDiv = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const StyledButton = styled(Button)(({ theme }) => ({
  width: '70%',
  marginTop: '20px',
  backgroundColor: '#007bff',
  '&:hover': {
    backgroundColor: '#0056b3',
  },
}));

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // POST request to the backend with the email
      const response = await axios.post('http://localhost:8080/api/v1/users/forgotPassword', {
        email,
      });
    //   navigate(`/resetPassword/${}`);
      console.log('Response:', response.data);
      alert('Password reset email sent!');
    } catch (error) {
      console.error('Error sending password reset request:', error);
      alert('Failed to send reset password email.');
    }
  };

  return (
    <ForgotPasswordContainer>
      <StyledTypography>Forgot Password?</StyledTypography>
      <Typography variant="body1" align="center">
        Enter your email address and we'll send you a link to reset your password.
      </Typography>

      <form onSubmit={handleSubmit}>
        <Inputs>
          <TextField
            variant="outlined"
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Inputs>

        <ButtonDiv>
          <StyledButton type="submit" variant="contained">
            Reset Password
          </StyledButton>
        </ButtonDiv>
      </form>
    </ForgotPasswordContainer>
  );
};

export default ForgotPassword;
