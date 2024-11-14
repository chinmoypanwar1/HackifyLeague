import React, { useState } from 'react';
import ReminderContext from './ReminderContext'; // Assuming you have ReminderContext.js

export default function ReminderContextProvider({ children }) {
  const [reminder, setReminder] = useState('');
  const [date, setDate] = useState(null);
  
  const updateReminder = (newReminder) => {
    setReminder(newReminder);
  };

  const updateDate = (newDate) => {
    setDate(newDate);
  };

  return (
    <ReminderContext.Provider value={{ reminder, date, updateReminder, updateDate }}>
      {children}
    </ReminderContext.Provider>
  );
}
