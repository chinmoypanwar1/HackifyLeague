import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import axios from "axios"

function HostHackathonForm() {
    const [formData, setFormData] = useState({
        displayName: '',
        description: '',
        startDate: '',
        endDate: '',
        RegistrationDeadline : '',
        tags: '',
        limit : 0,
        prizePool : 0,
        host : '',
        teamMemberLimit : 0,
        location : ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            console.log(formData);
            const response = await axios.post("http://localhost:8080/api/v1/hackathons/createHackathon", formData);
            console.log(response.data);
        } catch (error) {
            console.error(error.message)
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
            <Typography variant="h4" component="div" style={{ fontWeight: 'bold', textAlign: 'center' }}>
                Host a Hackathon
            </Typography>
            <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
                <TextField
                    fullWidth
                    label="Hackathon Name"
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
                <TextField
                    fullWidth
                    label="Start Date"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    label="End Date"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    label="Registration Deadline"
                    name="RegistrationDeadline"
                    type="date"
                    value={formData.RegistrationDeadline}
                    onChange={handleChange}
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    label="Limit"
                    name="limit"
                    type="number"
                    value={formData.limit}
                    onChange={handleChange}
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    label="Prize Pool"
                    name="prizePool"
                    type="number"
                    value={formData.prizePool}
                    onChange={handleChange}
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    label="host"
                    name="host"
                    type="string"
                    value={formData.host}
                    onChange={handleChange}
                    placeholder='Enter host name'
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    label="Team Member Limit"
                    name="teamMemberLimit"
                    type="number"
                    value={formData.teamMemberLimit}
                    onChange={handleChange}
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    type="string"
                    value={formData.location}
                    placeholder='Enter the location of Hackathon'
                    onChange={handleChange}
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    label="Hackathon Tags"
                    name="tags"
                    value={formData.type}
                    onChange={handleChange}
                    margin="normal"
                    variant="outlined"
                />
                <Button 
                    type="submit" 
                    variant="contained" 
                    style={{ backgroundColor: '#ffc107', color: '#333', marginTop: '1rem' }}
                    fullWidth
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </form>
        </Container>
    );
}

export default HostHackathonForm;
