import React, { useContext, useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import ThemeContext from "../Context/ThemeContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";

function CreateTeam() {
  const { hackathonId } = useParams();
  const [formData, setFormData] = useState({
    displayName: "",
    description: "",
    hackathonId: hackathonId,
  });

  const { theme, isDark } = useContext(ThemeContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await axios.post(
        `http://localhost:8080/api/v1/teams/createTeam`,
        formData,
        { withCredentials: true }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
    <Navbar/>
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          backgroundColor: theme.backgroundColor,
          color: theme.color,
        }}
      >
        <Container
          style={{
            backgroundColor: theme.backgroundColor,
            color: theme.color,
            boxShadow: isDark
              ? "4px 4px 10px rgba(255, 255, 255, 0.5)"
              : "4px 4px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <Typography
            variant="h4"
            component="div"
            style={{ fontWeight: "bold", textAlign: "center" }}
          >
            Create a Team
          </Typography>
          <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
            <TextField
              fullWidth
              label="Team Name"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              multiline
              rows={4}
            />
            <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: "#ffc107",
                color: "#333",
                marginTop: "1rem",
                marginBottom: "5vmin",
              }}
              fullWidth
            >
              Submit
            </Button>
          </form>
        </Container>
      </Box>
      <Footer/>
    </>
  );
}

export default CreateTeam;
