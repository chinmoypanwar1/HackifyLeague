import React, { useState } from 'react';
import Navbar from './Navbar';
import { useContext  } from 'react';
import ThemeContext from '../Context/ThemeContext';
import Footer from './Footer';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  CardMedia,
} from '@mui/material';
import { School, Group, CalendarToday, EmojiEvents, Search } from '@mui/icons-material';

const hackathonsData = [
  {
    title: "AI Challenge 2024",
    organizer: "TechCorp",
    eligibility: "All years",
    date: "March 15 - March 17, 2024",
    type: "AI/ML",
    participants: 120,
    prizes: "1st: $5000, 2nd: $3000, 3rd: $1000",
    location: "Virtual",
    duration: "48 hours",
    details: "A competitive AI/ML hackathon focusing on image recognition and NLP challenges.",
    image: "https://img.freepik.com/free-vector/hackathon-doodle-hand-drawing-team-programmers-web-developers-managers-graphic-designers-deve_88138-1348.jpg",
  },
  {
    title: "Blockchain Innovators",
    organizer: "InnovateX",
    eligibility: "Sophomores and above",
    date: "April 10 - April 12, 2024",
    type: "Blockchain",
    participants: 80,
    prizes: "1st: $4000, 2nd: $2000, 3rd: $1000",
    location: "In-person at NY Tech Campus",
    duration: "3 days",
    details: "Explore blockchain applications and build secure decentralized apps.",
    image: "https://engg.cambridge.edu.in/wp-content/uploads/2023/07/SIH.png", 
  },
  {
    title: "Web Dev Sprint",
    organizer: "WebNation",
    eligibility: "Freshers and Sophomores",
    date: "May 20 - May 22, 2024",
    type: "Web Development",
    participants: 150,
    prizes: "1st: $3000, 2nd: $1500, 3rd: $500",
    location: "Hybrid",
    duration: "36 hours",
    details: "A web development hackathon focusing on innovative front-end and back-end solutions.",
    image: "https://img.freepik.com/free-vector/hackathon-technology-infographic-with-flat-icons_88138-961.jpg", 
  },
  {
    title: "Web Dev Sprint",
    organizer: "WebNation",
    eligibility: "Freshers and Sophomores",
    date: "May 20 - May 22, 2024",
    type: "Web Development",
    participants: 150,
    prizes: "1st: $3000, 2nd: $1500, 3rd: $500",
    location: "Hybrid",
    duration: "36 hours",
    details: "A web development hackathon focusing on innovative front-end and back-end solutions.",
    image: "https://media.istockphoto.com/id/1210803911/id/vektor/orang-orang-bekerja-sama-hackathon-vector-ilustrasi-datar-programmer-bekerja-dengan-data.jpg?s=612x612&w=0&k=20&c=JtHeIt4ZcvkgLat3mAkRmp_IAq6t1vtyTAEcHDvE9w4=", 
  },
];

const HackathonsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredHackathons, setFilteredHackathons] = useState(hackathonsData);
  const [selectedHackathon, setSelectedHackathon] = useState(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    const filteredData = hackathonsData.filter((hackathon) =>
      hackathon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hackathon.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hackathon.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredHackathons(filteredData);  // Update the filtered hackathons
  };

  const handleViewMore = (hackathon) => {
    setSelectedHackathon(hackathon);
  };

  const handleCloseDialog = () => {
    setSelectedHackathon(null);
  };

  const { theme , isDark } = useContext(ThemeContext);

  return (
    <>
      {/* <Navbar/> */}
      <Navbar style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }} /> 

      <div style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
        <Box
          sx={{
            background: 'linear-gradient(90deg, #ffb300, #ffc107, #ff9800)',
            padding: '40px 20px', 
            borderRadius: '10px', 
            marginBottom: '40px',
            marginTop: '10px',
          }}
        >
          <Typography variant="h4" align="center" gutterBottom style={{ color: 'black', fontWeight: 'bold' }}>
            Join the world's best online and in-person hackathons
          </Typography>
        </Box>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '600px' }}>
            <TextField
              label="Search Hackathons"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSearchClick();
              }}
              style={{
                backgroundColor: 'white',
                flexGrow: 1,
                marginRight: '5px',
              }}
            />
            <Button
              onClick={handleSearchClick}
              variant="contained"
              style={{
                backgroundColor: '#ffc107',
                color: 'black',
                padding: '10px 20px',
                fontSize: '16px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <Search style={{ fill: 'black' }} /> {/* Ensures the Search icon stays black */}
              Search
            </Button>
          </div>
        </div>

        <Grid container spacing={4} justifyContent="center">
          {filteredHackathons.map((hackathon, index) => (
            <Grid item xs={12} md={8} key={index}>
              <Card
                style={{
                  display: 'flex', // To place the content and image side by side
                  padding: '20px',
                  backgroundColor: isDark ? '#343a40' : 'white',
                  color : theme.color,
                  borderRadius: '8px',
                  boxShadow:  isDark ? '0 4px 12px rgba(0 , 0 , 0 , 0.1)' : '0 4px 12px rgba(0, 0, 0, 0.1)' 
                }}
              >
                <CardMedia
                  component="img"
                  alt="Hackathon Image"
                  image={hackathon.image}
                  style={{
                    width: '40%', // Adjust width to take 40% of the card
                    height: 'auto', 
                    borderRadius: '8px',
                    objectFit: 'contain',
                    marginRight: '20px', // Space between the image and content
                    position: 'relative', // Optional for alignment
                  }}
                />
                <CardContent style={{ flex: 1 }}>
                  <Typography variant="h5" gutterBottom style={{ color : theme.color, }}>{hackathon.title}</Typography>
                  <Typography variant="body2" color="textSecondary" style={{ color : theme.color, }}>
                    Organized by {hackathon.organizer}
                  </Typography>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <School style={{ marginRight: '8px', color: '#ffc107' }} />
                      <Typography variant="body2" color="textSecondary" style={{color : theme.color, }}>
                        Eligibility: {hackathon.eligibility}
                      </Typography>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <CalendarToday style={{ marginRight: '8px', color: '#ffc107' }} />
                      <Typography variant="body2" color="textSecondary" style={{ color : theme.color,}}>
                        Date: {hackathon.date}
                      </Typography>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Group style={{ marginRight: '8px', color: '#ffc107' }} />
                      <Typography variant="body2" color="textSecondary" style={{ color : theme.color, }}>
                        Participants: {hackathon.participants}
                      </Typography>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <EmojiEvents style={{ marginRight: '8px', color: '#ffc107' }} />
                      <Typography variant="body2" color="textSecondary" style={{ color : theme.color, }}>
                        Prizes: {hackathon.prizes}
                      </Typography>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleViewMore(hackathon)}
                    variant="outlined"
                    color="primary"
                    sx={{
                      marginTop: '15px',
                      borderColor: '#ffc107', 
                      '&:hover': {
                        borderColor: '#ffc107',
                        color: '#ffc107',
                      },
                      color : theme.color,
                    }}
                  >
                      View More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {selectedHackathon && (
          <Dialog open={Boolean(selectedHackathon)} onClose={handleCloseDialog}>
            <DialogTitle>{selectedHackathon.title}</DialogTitle>
            <DialogContent>
              <Typography variant="body1" style={{ color: 'black' }}>
                {selectedHackathon.details}
              </Typography>
              <Typography variant="body2" style={{ color: 'black', marginTop: '10px' }}>
                Location: {selectedHackathon.location}
              </Typography>
              <Typography variant="body2" style={{ color: 'black' }}>
                Duration: {selectedHackathon.duration}
              </Typography>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <Footer/>
    </>
  );
};

export default HackathonsPage;
