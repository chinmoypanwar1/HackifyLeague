import React, { useContext, useState } from 'react';
import { Box, Typography, Button, Modal, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Footer from './Footer';
import { styled } from '@mui/system';
import ThemeContext from '../Context/ThemeContext';
import ReminderContext from '../Context/ReminderContext';
import { useNavigate } from 'react-router-dom';

const HeroSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '80vh',
  padding: '32px',
  textAlign: 'center',
});

const ButtonContainer = styled(Box)({
  display: 'flex',
  gap: '15px',
  marginTop: '24px',
  justifyContent: 'center',
});

const HoverButton = styled(Button)({
  padding: '12px 32px',
  backgroundColor: '#ffc107',
  color: '#000',
  fontSize: '1.2rem',
  '&:hover': {
    backgroundColor: '#e0a800',
  },
});

const CalendarSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  marginTop: '20px',
});

const LandingPage = () => {
  //contexts
  const { theme } = useContext(ThemeContext);
  const { updateReminder, updateDate } = useContext(ReminderContext);

  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [reminder, setReminder] = useState('');
  const navigate = useNavigate();

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleAddReminder = () => {
    // Logic to save reminder
    // console.log('Reminder:', reminder, 'on Date:', selectedDate);
    updateReminder(reminder); // Save reminder in context
    updateDate(selectedDate ? selectedDate.toDate() : null); // Save selected date in context (convert to native Date)
    setModalOpen(false);
    navigate('/reminders'); // Navigate to the reminders page
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'white' }}>

      {/* calendar section */}
      <CalendarSection>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)} // Set the selected date in state
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button variant="contained" sx={{ backgroundColor: '#ffc107' }} onClick={handleOpenModal}>
          Add Reminder
        </Button>
      </CalendarSection>

      {/* Main Hero Section */}
      <HeroSection style={{ backgroundColor: theme?.backgroundColor, color: theme?.color }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Hackify
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          Discover a smarter way to manage your Hackathons or Participate in Hackathons.
        </Typography>

        {/* Buttons Below the Text */}
        <ButtonContainer>
          <HoverButton variant="contained" onClick={() => { navigate('/admin'); }}>For Organisers</HoverButton>
          <HoverButton variant="contained" onClick={() => { navigate('/hackathons'); }}>For Participants</HoverButton>
        </ButtonContainer>
      </HeroSection>

      <Box style={{ height: '75px', width: '100vw', backgroundColor: theme.backgroundColor, color: theme.color }} />
      <Footer />

      {/* Modal for Adding Reminder */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: '8px', textAlign: 'center' }}>
          <Typography variant="h6">Add a Reminder</Typography>
          <TextField
            label="Reminder Details"
            fullWidth
            multiline
            rows={4}
            value={reminder} // The value of the TextField is linked to the state
            onChange={(e) => setReminder(e.target.value)} // Set reminder value on change
            sx={{ mt: 2 }}
          />
          <Button variant="contained" onClick={handleAddReminder} sx={{ mt: 2, backgroundColor: '#ffc107' }}>
            Save Reminder
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default LandingPage;
