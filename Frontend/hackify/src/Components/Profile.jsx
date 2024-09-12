import React from 'react';
import { Box, Typography, Container, List, ListItem, Divider } from '@mui/material';
import { styled } from '@mui/system';

const ProfileContainer = styled(Container)(({ theme }) => ({
  backgroundColor: '#ffffff',
  padding: theme.spacing(4),
  marginTop: theme.spacing(8),
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  width: '100%',
  maxWidth: '600px',
  [theme.breakpoints.down('sm')]: {
    width: '90vw',
  },
}));

// Styling for the typography
const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  color: '#007bff', // Primary blue theme
}));

const ProfileItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1, 0),
}));

const Profile = () => {
  const profileData = {
    username: 'Mukund123',
    fullname: 'Mukund Narayan Jha',
    email: 'mukundnarayanjha2005@gmail.com',
    workrole: 'not updated yet',
    friendlist: 'empty',
    hackathons: 'not participated till now',
  };

  return (
    <ProfileContainer>
      <StyledTypography variant="h4" align="center">
        Profile Page
      </StyledTypography>
      <Divider />
      <List>
        <ListItem>
          <ProfileItem>
            <Typography variant="h6">Username : </Typography>
            <Typography>{profileData.username}</Typography>
          </ProfileItem>
        </ListItem>
        <Divider />
        <ListItem>
          <ProfileItem>
            <Typography variant="h6">Full Name : </Typography>
            <Typography>{profileData.fullname}</Typography>
          </ProfileItem>
        </ListItem>
        <Divider />
        <ListItem>
          <ProfileItem>
            <Typography variant="h6">Email : </Typography>
            <Typography>{profileData.email}</Typography>
          </ProfileItem>
        </ListItem>
        <Divider />
        <ListItem>
          <ProfileItem>
            <Typography variant="h6">Work Role : </Typography>
            <Typography>{profileData.workrole}</Typography>
          </ProfileItem>
        </ListItem>
        <Divider />
        <ListItem>
          <ProfileItem>
            <Typography variant="h6">Friend List : </Typography>
            <Typography>{profileData.friendlist}</Typography>
          </ProfileItem>
        </ListItem>
        <Divider />
        <ListItem>
          <ProfileItem>
            <Typography variant="h6">Hackathons Participated : </Typography>
            <Typography>{profileData.hackathons}</Typography>
          </ProfileItem>
        </ListItem>
      </List>
    </ProfileContainer>
  );
};

export default Profile;
