import React, { useState } from 'react';
import Navbar from './Navbar';
import { useContext  } from 'react';
import ThemeContext from '../Context/ThemeContext';
import Footer from './Footer';
// import { Checkbox, FormControlLabel, FormGroup, Select, MenuItem, InputLabel, FormControl, Typography, Box } from '@mui/material';
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
  Checkbox,
  FormControlLabel,
  FormGroup,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import { School, Group, CalendarToday, EmojiEvents, Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const hackathonsData = [
  {
    _id : 1,
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
    _id : 2,
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
    _id : 3,
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
    _id: 4,
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
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    const filteredData = hackathonsData.filter((hackathon) =>
      hackathon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hackathon.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hackathon.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredHackathons(filteredData);
  };

  const handleViewMore = (hackathon) => {
    // setSelectedHackathon(hackathon);
    navigate(`/hackathons/${hackathon._id}`)
  };

  const handleCloseDialog = () => {
    setSelectedHackathon(null);
  };

  const { theme , isDark } = useContext(ThemeContext);

  const [filters, setFilters] = useState({
    eligibility: false,
    managedByDevpost: false,
    location: { online: false, inPerson: false },
    status: { upcoming: false, open: false, ended: false },
    length: { length1: false, length2: false, length3: false },
    interestTags: {
      beginnerFriendly: false,
      socialGood: false,
      machineLearningAI: false,
      openEnded: false,
      education: false,
    },
    host: '',
    difficulty: { easy: false, medium: false, hard: false },
    prize: { low: false, medium: false, high: false },
  });

  const handleCheckboxChange = (category, subCategory) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: {
        ...prevFilters[category],
        [subCategory]: !prevFilters[category][subCategory],
      },
    }));
  };

  const handleMainCheckboxChange = (category) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: !prevFilters[category],
    }));
  };

  const handleHostChange = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      host: event.target.value,
    }));
  };

  return (
    <>
      <Navbar/>
      <div  style={{ display: 'flex', padding: '20px', backgroundColor : theme.backgroundColor }}>

        <div style={{ flex: 1 }}>
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
                  backgroundColor:' rgb(255, 193, 7)',
                  color: 'black',
                  padding: '14px 19px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0px',
                  marginLeft: '1vmin'
                }}
              >
                <Search style={{ fill: 'black' }} /> {/* Ensures the Search icon stays black */}
                Search
              </Button>
            </div>
          </div>
          <div className="problem" style = {{display : 'flex' , flexDirection : 'row'}}>
            {/* sidebar */}
              <Box sx={{ width: 400, backgroundColor: isDark ? '#343a40' : '#f5f5f5', color : theme.color , padding: 2, borderRadius: 2, marginLeft: '10vmin' }}>
              <FormControlLabel
                control={<Checkbox checked={filters.eligibility} onChange={() => handleMainCheckboxChange('eligibility')} />}
                label="Match my eligibility"
              />

              {/* Managed by Devpost */}
              <FormControlLabel
                control={<Checkbox checked={filters.managedByDevpost} onChange={() => handleMainCheckboxChange('managedByDevpost')} />}
                label={<><span role="img" aria-label="devpost">🛠️</span> Managed by Devpost</>}
              />

              {/* Location */}
              <Typography variant="h6">Location</Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={filters.location.online} onChange={() => handleCheckboxChange('location', 'online')} />}
                  label="Online"
                />
                <FormControlLabel
                  control={<Checkbox checked={filters.location.inPerson} onChange={() => handleCheckboxChange('location', 'inPerson')} />}
                  label="In-person"
                />
              </FormGroup>

              {/* Status */}
              <Typography variant="h6">Status</Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={filters.status.upcoming} onChange={() => handleCheckboxChange('status', 'upcoming')} />}
                  label={<><span style={{ backgroundColor: 'orange', borderRadius: '50%', width: '10px', height: '10px', display: 'inline-block' }}></span> Upcoming</>}
                />
                <FormControlLabel
                  control={<Checkbox checked={filters.status.open} onChange={() => handleCheckboxChange('status', 'open')} />}
                  label={<><span style={{ backgroundColor: 'green', borderRadius: '50%', width: '10px', height: '10px', display: 'inline-block' }}></span> Open</>}
                />
                <FormControlLabel
                  control={<Checkbox checked={filters.status.ended} onChange={() => handleCheckboxChange('status', 'ended')} />}
                  label={<><span style={{ backgroundColor: 'gray', borderRadius: '50%', width: '10px', height: '10px', display: 'inline-block' }}></span> Ended</>}
                />
              </FormGroup>

              {/* Length */}
              <Typography variant="h6">Length</Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={filters.length.length1} onChange={() => handleCheckboxChange('length', 'length1')} />}
                  label="1–6 days"
                />
                <FormControlLabel
                  control={<Checkbox checked={filters.length.length2} onChange={() => handleCheckboxChange('length', 'length2')} />}
                  label="1–4 weeks"
                />
                <FormControlLabel
                  control={<Checkbox checked={filters.length.length3} onChange={() => handleCheckboxChange('length', 'length3')} />}
                  label="1+ month"
                />
              </FormGroup>

              {/* Interest Tags */}
              <Typography variant="h6">Interest Tags</Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={filters.interestTags.beginnerFriendly} onChange={() => handleCheckboxChange('interestTags', 'beginnerFriendly')} />}
                  label="Beginner Friendly"
                />
                <FormControlLabel
                  control={<Checkbox checked={filters.interestTags.socialGood} onChange={() => handleCheckboxChange('interestTags', 'socialGood')} />}
                  label="Social Good"
                />
                <FormControlLabel
                  control={<Checkbox checked={filters.interestTags.machineLearningAI} onChange={() => handleCheckboxChange('interestTags', 'machineLearningAI')} />}
                  label="Machine Learning/AI"
                />
                <FormControlLabel
                  control={<Checkbox checked={filters.interestTags.openEnded} onChange={() => handleCheckboxChange('interestTags', 'openEnded')} />}
                  label="Open Ended"
                />
                <FormControlLabel
                  control={<Checkbox checked={filters.interestTags.education} onChange={() => handleCheckboxChange('interestTags', 'education')} />}
                  label="Education"
                />
              </FormGroup>

              {/* Host */}
              <Typography variant="h6">Host</Typography>
              <FormControl fullWidth>
                <InputLabel>Select Host</InputLabel>
                <Select
                  value={filters.host}
                  onChange={handleHostChange}
                >
                  <MenuItem value="">Select host</MenuItem>
                  <MenuItem value="google">Google</MenuItem>
                  <MenuItem value="amazon">Amazon</MenuItem>
                  <MenuItem value="flipkart">Flipkart</MenuItem>
                  <MenuItem value="microsoft">Microsoft</MenuItem>
                </Select>
              </FormControl>

              {/* Difficulty */}
              <Typography variant="h6">Difficulty</Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={filters.difficulty.easy} onChange={() => handleCheckboxChange('difficulty', 'easy')} />}
                  label="Easy"
                />
                <FormControlLabel
                  control={<Checkbox checked={filters.difficulty.medium} onChange={() => handleCheckboxChange('difficulty', 'medium')} />}
                  label="Medium"
                />
                <FormControlLabel
                  control={<Checkbox checked={filters.difficulty.hard} onChange={() => handleCheckboxChange('difficulty', 'hard')} />}
                  label="Hard"
                />
              </FormGroup>

              {/* Prize */}
              <Typography variant="h6">Prize</Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={filters.prize.low} onChange={() => handleCheckboxChange('prize', 'low')} />}
                  label="Low"
                />
                <FormControlLabel
                  control={<Checkbox checked={filters.prize.medium} onChange={() => handleCheckboxChange('prize', 'medium')} />}
                  label="Medium"
                />
                <FormControlLabel
                  control={<Checkbox checked={filters.prize.high} onChange={() => handleCheckboxChange('prize', 'high')} />}
                  label="High"
                />
              </FormGroup>
            </Box>
            {/* cards */}
          <Grid container spacing={4} justifyContent="center" style={{ marginRight: '20px' }}> {/* Adjusted margin to move cards */}
            {filteredHackathons.map((hackathon, index) => (
              <Grid item xs={12} md={8} key={index}>
                <Card
                  style={{
                    display: 'flex', 
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
                      width: '40%',
                      height: 'auto', 
                      borderRadius: '8px',
                      objectFit: 'contain',
                      marginRight: '20px',
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
        </div>
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
      </div>
      <Footer/>
    </>
  );
};

export default HackathonsPage;
