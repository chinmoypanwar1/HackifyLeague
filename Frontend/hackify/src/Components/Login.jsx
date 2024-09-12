import React, { useState } from 'react';
import { Box, Container, TextField, Button, Typography} from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const SignUpItems = styled(Container)(({ theme }) => ({
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
  marginRight : '0.5vmin'
}));

const StyledButton2 = styled(Button)(({ theme }) => ({
  width: '70%',
  backgroundColor: '#007bff',
  '&:hover': {
    backgroundColor: '#0056b3',
  },
}));

const LoginItems = styled(Container)(({ theme }) => ({
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

const Signup = () => {

    const [loginerror , setLoginerror] = useState('');

    //signup data
  const [formData, setFormData] = useState({
    username: '',
    fullname : '',
    email: '',
    password: '',
  });

  //login data
  const [logindata, setLogindata] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLoginChange = (e) => {
    setLogindata({
      ...logindata,
      [e.target.name]: e.target.value,
    });
  };

  const handleAccountChange = () => {
    setAccount((prevAccount) => (prevAccount === 'Signup' ? 'login' : 'Signup'));
  };

  const [account, setAccount] = useState('Signup');
  
  const signupUser = async () => {
    try {

      const response = await axios.post("http://localhost:8080/api/v1/users/register", formData);
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  const loginUser = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/v1/users/login", logindata);
      console.log(response.data);
      navigate('/');
    } catch (error) {
        if(error.response && error.response.data.message){
            setLoginerror(error.response.data.message);
        }
        else{
            setLoginerror("some error occured while login")
        }
    }
  };

  return (
    <>
      {account === 'Signup' ? (
        <SignUpItems>
          <StyledTypography>Sign Up</StyledTypography>

          <Inputs>
            <TextField
              variant="outlined"
              label="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <TextField
              variant="outlined"
              label="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
            <TextField
              variant="outlined"
              label="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              variant="outlined"
              label="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
        </Inputs>

          <ButtonDiv>
            <StyledButton variant="contained" onClick = {signupUser}>
              SignUp
            </StyledButton>
          </ButtonDiv>

          <Typography align="center" style={{ margin: '1vmin 0vmin', fontWeight: 600 }}>
            OR
          </Typography>

          <ButtonDiv>
            <StyledButton2 variant="contained" onClick={handleAccountChange}>
              Already Have an Account?
            </StyledButton2>
          </ButtonDiv>
          <Button 
             sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '16px', // add space above the button if needed
                textAlign: 'center', // center text inside button
                width: '100%' // make the button span the width of its parent container
              }}

              onClick={()=>{navigate('/forgotpassword')}}
          >
            Forgot Password?
        </Button>
        </SignUpItems>
      ) : (
        <LoginItems>
          <StyledTypography>Login</StyledTypography>

          <Inputs>
            <TextField
              variant="outlined"
              label="username"
              name="username"
              value={logindata.Username}
              onChange={handleLoginChange}
              required
            />
            <TextField
              variant="outlined"
              label="password"
              name="password"
              value={logindata.Password}
              type="password"
              onChange={handleLoginChange}
              required
            />
          </Inputs>

          {loginerror && <Typography style={{ color: 'red', marginTop: '10px' }}>{loginerror}</Typography>}

          <ButtonDiv>
            <StyledButton variant="contained" onClick={loginUser}>
              Login
            </StyledButton>
          </ButtonDiv>

          <Typography align="center" style={{ margin: '1vmin 0vmin', fontWeight: 600 }}>
            OR
          </Typography>

          <ButtonDiv>
            <StyledButton2 variant="contained" onClick={handleAccountChange}>
              Don't Have an Account?
            </StyledButton2>
          </ButtonDiv>
        </LoginItems>
      )}
    </>
  );
};

export default Signup;
