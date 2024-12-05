import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, List, ListItem, Divider, Button } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const ProfileContainer = styled(Container)(({ theme }) => ({
  backgroundColor: '#ffffff',
  padding: theme.spacing(4),
  marginTop: theme.spacing(8),
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  width: '100%',
  maxWidth: '800px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    width: '90vw',
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  color: '#007bff',
}));

const ProfileItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1, 0),
}));

const Profile = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/users/getUser', {
          withCredentials: true,
        });
        setData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  if (!data) {
    return (
      <ProfileContainer>
        <Typography variant="h6" align="center">
          No data found or loading...
        </Typography>
      </ProfileContainer>
    );
  }

  const profileData = {
    username: data?.user?.username || 'N/A',
    fullname: data?.user?.fullname || 'N/A',
    email: data?.user?.email || 'N/A',
    hackathonsParticipated: data?.participatedHackathons?.length || 'N/A',
    // teams: data?.teams?.length || 'N/A',
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
            <Typography variant="h6">Username:</Typography>
            <Typography>{profileData.username}</Typography>
          </ProfileItem>
        </ListItem>
        <Divider />
        <ListItem>
          <ProfileItem>
            <Typography variant="h6">Full Name:</Typography>
            <Typography>{profileData.fullname}</Typography>
          </ProfileItem>
        </ListItem>
        <Divider />
        <ListItem>
          <ProfileItem>
            <Typography variant="h6">Email:</Typography>
            <Typography>{profileData.email}</Typography>
          </ProfileItem>
        </ListItem>
        <Divider />
        <ListItem>
          <ProfileItem>
            <Typography variant="h6">Teams Participated:</Typography>
            {/* <Typography>{profileData.teams}</Typography> */}
            {
              data.teams.map((team, idx) => (
                <Button id={team._id} onClick={() => navigate(`/teams/${team._id}`)}>
                  {team.displayname}
                </Button>
              ))
            }
          </ProfileItem>
        </ListItem>
        <Divider />
        <ListItem>
          <ProfileItem>
            <Typography variant="h6">Hackathons Participated:</Typography>
            <Typography>{profileData.hackathonsParticipated}</Typography>
          </ProfileItem>
        </ListItem>
      </List>
    </ProfileContainer>
  );
};

export default Profile;
