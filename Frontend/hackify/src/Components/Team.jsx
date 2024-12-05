import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Container, List, ListItem, Divider, Button, TextField } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';

const TeamContainer = styled(Container)(({ theme }) => ({
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

const TeamItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1, 0),
}));

const Team = () => {
  const { teamId } = useParams();
  const [teamData, setTeamData] = useState(null);
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMemberUsername, setNewMemberUsername] = useState('');

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/teams/getTeam/${teamId}`,
          {
            withCredentials: true,
          }
        );
        setTeamData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching team data:', error);
      }
    };

    if (teamId) {
      fetchTeamData();
    }
  }, [teamId]);

  const handleAddMember = async () => {
    if (!newMemberUsername) return;

    try {
      const response = await axios.patch(
        `http://localhost:8080/api/v1/teams/addMember`,
        { teamId, username: newMemberUsername, hackathonId : teamData.hackathon },
        { withCredentials: true }
      );

      // Refresh team data after successfully adding the member
      setTeamData((prev) => ({
        ...prev,
        members: [...prev.members, { user: newMemberUsername, role: 'member' }],
      }));

      setNewMemberUsername('');
      setShowAddMember(false);
      console.log('Member added successfully:', response.data);
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  if (!teamData) {
    return (
      <TeamContainer>
        <Typography variant="h6" align="center">
          Loading team data or no team found...
        </Typography>
      </TeamContainer>
    );
  }

  return (
    <TeamContainer>
      <StyledTypography variant="h4" align="center">
        Team Details
      </StyledTypography>
      <Divider />
      <List>
        <ListItem>
          <TeamItem>
            <Typography variant="h6">Team Name:</Typography>
            <Typography>{teamData.displayname || 'N/A'}</Typography>
          </TeamItem>
        </ListItem>
        <Divider />
        <ListItem>
          <TeamItem>
            <Typography variant="h6">Description:</Typography>
            <Typography>{teamData.description || 'N/A'}</Typography>
          </TeamItem>
        </ListItem>
        <Divider />
        <ListItem>
          <TeamItem>
            <Typography variant="h6">Team Leader:</Typography>
            <Typography>
              {teamData.members.find((member) => member.role === 'admin')?.user || 'N/A'}
            </Typography>
          </TeamItem>
        </ListItem>
        <Divider />
        <ListItem>
          <TeamItem>
            <Typography variant="h6">Members:</Typography>
            <Typography>
              {teamData.members.map((member) => member.user).join(', ') || 'N/A'}
            </Typography>
          </TeamItem>
        </ListItem>
        <Divider />
      </List>
      <Box mt={4} width="100%" textAlign="center">
        {!showAddMember ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowAddMember(true)}
          >
            Add Member to Team
          </Button>
        ) : (
          <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
            <TextField
              label="Username"
              variant="outlined"
              size="small"
              value={newMemberUsername}
              onChange={(e) => setNewMemberUsername(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleAddMember}>
              Submit
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setShowAddMember(false)}
            >
              Cancel
            </Button>
          </Box>
        )}
      </Box>
    </TeamContainer>
  );
};

export default Team;
