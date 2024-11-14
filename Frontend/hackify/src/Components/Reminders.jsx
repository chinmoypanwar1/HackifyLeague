import React, { useContext, useEffect, useState } from 'react';
import ReminderContext from '../Context/ReminderContext';
import { Box, Typography, Card, CardContent, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Material-UI Delete Icon
import { styled } from '@mui/system';
import { motion } from 'framer-motion'; // For animation
import ThemeContext from '../Context/ThemeContext';

const RemindersSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  marginTop: '20px',
  padding: '20px',
});

const ReminderCard = styled(Card)({
  maxWidth: '600px',
  marginBottom: '20px',
  backgroundColor: '#f7f7f7',
  borderRadius: '10px',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease',
  display: 'flex', // To arrange the title and delete button side by side
  alignItems: 'center', // Centering the content vertically
  position: 'relative', // For future positioning of elements
  padding: '10px', // Adding padding for better spacing
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const ReminderTitleContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  alignItems: 'center',
});

const ReminderTitle = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1.2rem',
  marginBottom: '10px',
});

const ReminderDetails = styled(Typography)({
  fontSize: '1rem',
  color: '#555',
});

const DeleteButton = styled(IconButton)({
  backgroundColor: '#ff4d4d',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#ff1a1a',
  },
  padding: '8px',
});

const Reminders = () => {
  const { reminder, date } = useContext(ReminderContext);
  const { theme } = useContext(ThemeContext);

  const [remindersList, setRemindersList] = useState([]);

  useEffect(() => {
    const savedReminders = JSON.parse(localStorage.getItem('reminders')) || [];
    setRemindersList(savedReminders);
  }, []);

  useEffect(() => {
    if (remindersList.length > 0) {
      localStorage.setItem('reminders', JSON.stringify(remindersList));
    }
  }, [remindersList]);

  const handleDeleteReminder = (index) => {
    const updatedReminders = remindersList.filter((_, i) => i !== index);
    setRemindersList(updatedReminders);
  };

  return (
    <Box sx={{ backgroundColor: theme?.backgroundColor, color: theme?.color, minHeight: '100vh' }}>
      <Box sx={{ textAlign: 'center', padding: '20px' }}>
        <Typography variant="h2" gutterBottom>
          Your Reminders
        </Typography>
        <Typography variant="h5" gutterBottom>
          View, Edit, and Manage Your Reminders Below
        </Typography>
      </Box>

      <RemindersSection>
        {remindersList.map((reminderItem, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ReminderCard>
              <CardContent sx={{ padding: '10px', width: '100%' }}>
                <ReminderTitleContainer>
                  <ReminderTitle>{`Reminder on ${reminderItem.date}`}</ReminderTitle>
                  <DeleteButton onClick={() => handleDeleteReminder(index)}>
                    <DeleteIcon />
                  </DeleteButton>
                </ReminderTitleContainer>
                <ReminderDetails>{reminderItem.reminder}</ReminderDetails>
              </CardContent>
            </ReminderCard>
          </motion.div>
        ))}
      </RemindersSection>
    </Box>
  );
};

export default Reminders;
