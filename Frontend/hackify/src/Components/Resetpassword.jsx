import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';

const ResetPasswordContainer = styled(Container)(({ theme }) => ({
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

const ResetPassword = () => {
  const { resetToken } = useParams(); // Capture resetToken from route parameters
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to backend with the new password and resetToken
      const response = await axios.post(`http://localhost:8080/api/v1/users/resetPassword/${resetToken}`, {
        password,
      });
      console.log('Response:', response.data);
      alert('Password has been reset successfully!');
      navigate('/login'); // Redirect to login page after successful reset
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('Failed to reset password. Please try again.');
    }
  };

  return (
    <ResetPasswordContainer>
      <StyledTypography>Reset Password</StyledTypography>
      <Typography variant="body1" align="center">
        Enter your new password below.
      </Typography>

      <form onSubmit={handleSubmit}>
        <Inputs>
          <TextField
            variant="outlined"
            label="New Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Inputs>

        <ButtonDiv>
          <StyledButton type="submit" variant="contained">
            Reset Password
          </StyledButton>
        </ButtonDiv>
      </form>
    </ResetPasswordContainer>
  );
};

export default ResetPassword;
