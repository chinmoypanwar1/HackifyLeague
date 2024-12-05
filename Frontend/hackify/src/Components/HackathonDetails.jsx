import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Container, Button, TextField, Grid } from "@mui/material";
import ThemeContext from "../Context/ThemeContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function HackathonDetails() {
  const navigate = useNavigate();
  const { hackathonId } = useParams();
  const [data, setData] = useState(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/v1/hackathons/getHackathon/${hackathonId}`
      );
      setData(response.data.data);
    };
    fetchData();
  }, [hackathonId]);

  if (!data) {
    return (
      <Container maxWidth="lg" sx={{ textAlign: "center", padding: "16px" }}>
        <Typography variant="h5" color="textSecondary">
          No hackathon info right now.
        </Typography>
      </Container>
    );
  }

  const color = "#ffc107";

  

  return (
    <>
    <Navbar/>

    <Container maxWidth="lg" sx={{ padding: "16px", marginBottom: "32px" }}>
      {/* Top Banner Image */}
      <Box
        component="img"
        src="https://img.freepik.com/free-vector/hackathon-doodle-hand-drawing-team-programmers-web-developers-managers-graphic-designers-deve_88138-1348.jpg"
        alt="Hackathon Banner"
        sx={{
          width: "100%",
          height: "50vh",
          objectFit: "cover",
          marginBottom: "24px",
          transition: "transform 0.5s",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      />

      {/* Hackathon Form Section */}
      <Box
        sx={{
          padding: "24px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
          marginBottom: "32px",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {data.displayName}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {data.description}
        </Typography>

        {/* Form Fields */}
        {/* <Grid container spacing={2} sx={{ marginTop: "16px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Your Name"
              fullWidth
              variant="outlined"
              sx={{ backgroundColor: "#fff" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Your Email"
              fullWidth
              variant="outlined"
              sx={{ backgroundColor: "#fff" }}
            />
          </Grid>
        </Grid> */}

        <Button
          variant="contained"
          sx={{
            marginTop: "16px",
            backgroundColor: color,
            color: "black",
            "&:hover": { backgroundColor: "#e0a800" },
          }}
          onClick={()=>{navigate(`/hackathons/${hackathonId}/createTeam`)}}
        >
          Register Now
        </Button>
      </Box>

      {/* Hackathon Details */}
      <Box sx={{ marginBottom: "32px" }}>
        <Typography variant="h5" fontWeight="bold" color={color} gutterBottom>
          Details
        </Typography>
        <Typography variant="body1">
          <strong>Tags:</strong> {data.tags.join(", ")}
        </Typography>
        <Typography variant="body1">
          <strong>Hosted By:</strong> {data.host}
        </Typography>
        <Typography variant="body1">
          <strong>Participant Limit:</strong> {data.limit}
        </Typography>
        <Typography variant="body1">
          <strong>Team Member Limit:</strong> {data.teamMemberLimit}
        </Typography>
      </Box>

      {/* Judging Criteria Section */}
      <Box
        sx={{
          padding: "24px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
          marginBottom: "32px",
        }}
      >
        <Typography variant="h5" fontWeight="bold" color={color} gutterBottom>
          Judging Criteria
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Functionality:</strong> How scalable is the application? How well are APIs utilized?
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Purpose:</strong> Does the application solve a real problem? Does it encourage repeated use?
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Content:</strong> How creative is the application? What is its visual quality?
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>User Experience:</strong> Is the application intuitive and easy to use?
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Technical Execution:</strong> How well does it showcase AI-powered APIs?
        </Typography>
      </Box>

      {/* Prize Section */}
      <Box
        sx={{
          padding: "24px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h5" fontWeight="bold" color={color} gutterBottom>
          Prize Pool
        </Typography>
        <Typography variant="body1" paragraph>
          ${data.prizePool}
        </Typography>
      </Box>

      {/* Dates Section */}
      <Box sx={{ marginTop: "32px" }}>
        <Typography variant="h5" fontWeight="bold" color={color} gutterBottom>
          Key Dates
        </Typography>
        <Typography variant="body1">
          <strong>Registration Deadline:</strong> {data.RegistrationDeadline.split("T")[0]}
        </Typography>
        <Typography variant="body1">
          <strong>Start Date:</strong> {data.startDate.split("T")[0]}
        </Typography>
        <Typography variant="body1">
          <strong>End Date:</strong> {data.endDate.split("T")[0]}
        </Typography>
      </Box>
    </Container>
    <Footer/>
    </>
  );
}