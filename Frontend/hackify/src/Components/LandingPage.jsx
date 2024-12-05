import React, { useContext, useState } from "react";
import { Box, Typography, Button, Modal, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Footer from "./Footer";
import { styled } from "@mui/system";
import ThemeContext from "../Context/ThemeContext";
import ReminderContext from "../Context/ReminderContext";
import { useNavigate } from "react-router-dom";
import HackifyAnimation from "./HackifyAnimation";
import hackathonImage from "../Assets/Images/hackathon.png"; // Import the image

const HeroSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  // justifyContent: "center",
  // minHeight: "80vh",
  padding: "0px 32px",
  textAlign: "center",
});

const ButtonContainer = styled(Box)({
  display: "flex",
  gap: "15px",
  marginTop: "24px",
  justifyContent: "center",
});

const HoverButton = styled(Button)({
  padding: "12px 32px",
  backgroundColor: "#ffc107",
  color: "#000",
  fontSize: "1.2rem",
  "&:hover": {
    backgroundColor: "#e0a800",
  },
});

const CalendarSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
  marginTop: "20px",
});

const LandingPage = () => {
  const { theme, isDark } = useContext(ThemeContext);
  const { updateReminder, updateDate } = useContext(ReminderContext);

  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [reminder, setReminder] = useState("");
  const navigate = useNavigate();

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleAddReminder = () => {
    updateReminder(reminder);
    updateDate(selectedDate ? selectedDate.toDate() : null);
    setModalOpen(false);
    navigate("/reminders");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: theme.backgroundColor,
        color: theme.color,
      }}
    >
      {/* Calendar section */}
      <CalendarSection>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: isDark ? "white" : "rgba(0, 0, 0, 0.23)",
                    },
                    "&:hover fieldset": {
                      borderColor: isDark ? "#ffffffcc" : "#000000",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: isDark ? "#ffffff" : "#007bff",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: isDark ? "white" : theme.color,
                  },
                  "& .MuiInputAdornment-root .MuiSvgIcon-root": {
                    color: isDark ? "white" : theme.color,
                  },
                  "& .MuiInputLabel-root": {
                    color: isDark ? "white" : theme.color,
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: isDark ? "#ffffffcc" : "#007bff",
                  },
                }}
              />
            )}
          />
        </LocalizationProvider>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#ffc107", color: "black" }}
          onClick={handleOpenModal}
        >
          Add Reminder
        </Button>
      </CalendarSection>

      {/* Image Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <img
          src={hackathonImage}
          alt="Hackathons"
          style={{ maxWidth: "100%", height: "50vh", width : "70vw", borderRadius: "8px", objectFit : 'contain'}}
        />
      </Box>

      {/* Main Hero Section */}
      <HeroSection>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Hackify
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          Discover a smarter way to manage your Hackathons or Participate in
          Hackathons.
        </Typography>

        {/* Buttons Below the Text */}
        <ButtonContainer>
          <HoverButton
            variant="contained"
            onClick={() => {
              navigate("/admin");
            }}
          >
            For Organisers
          </HoverButton>
          <HoverButton
            variant="contained"
            onClick={() => {
              navigate("/hackathons");
            }}
          >
            For Participants
          </HoverButton>
        </ButtonContainer>
      </HeroSection>

      <Box
        style={{
          height: "75px",
          width: "100vw",
          backgroundColor: theme.backgroundColor,
          color: theme.color,
        }}
      />
      <Footer />

      {/* Modal for Adding Reminder */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            p: 4,
            backgroundColor: theme.backgroundColor,
            color: theme.color,
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ color: theme.color }}>
            Add a Reminder
          </Typography>
          <TextField
            label="Reminder Details"
            fullWidth
            multiline
            rows={4}
            value={reminder}
            onChange={(e) => setReminder(e.target.value)}
            sx={{
              mt: 2,
              color: isDark ? "white" : theme.color,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: isDark ? "white" : "rgba(0, 0, 0, 0.23)",
                },
                "&:hover fieldset": {
                  borderColor: isDark ? "#ffffffcc" : "#000000",
                },
                "&.Mui-focused fieldset": {
                  borderColor: isDark ? "#ffffff" : "#007bff",
                },
              },
              "& .MuiInputBase-input": {
                color: isDark ? "white" : theme.color,
              },
              "& .MuiInputLabel-root": {
                color: isDark ? "white" : theme.color,
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: isDark ? "#ffffffcc" : "#007bff",
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleAddReminder}
            sx={{ mt: 2, backgroundColor: "#ffc107", color: "black" }}
          >
            Save Reminder
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default LandingPage;
