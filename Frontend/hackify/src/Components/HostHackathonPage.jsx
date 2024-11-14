import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';

function HostHackathonForm() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        type: '' // Public or Internal
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, like sending data to server
        console.log(formData);
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
                    name="name"
                    value={formData.name}
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
                    label="Hackathon Type (Public/Internal)"
                    name="type"
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
                >
                    Submit
                </Button>
            </form>
        </Container>
    );
}

export default HostHackathonForm;
