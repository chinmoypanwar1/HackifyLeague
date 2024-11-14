    import React from 'react';
    import { useNavigate } from 'react-router-dom';
    import { Card, CardContent, Button, Typography, Grid } from '@mui/material';
    import Navbar from './Navbar';
    import Footer from './Footer';

    function AdminPage() {
        const navigate = useNavigate();

        const handlePublicHackathon = () => {
            navigate('/host-public-hackathon');
        };

        const handleInternalHackathon = () => {
            navigate('/host-internal-hackathon');
        };

        return (
            <>
                <Navbar />
                <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#333' }}>
                    {/* Main Content */}
                    <Typography variant="h4" component="div" style={{ fontWeight: 'bold', marginBottom: '1.5rem' }}>
                        Run better public and internal hackathons
                    </Typography>
                    <Typography variant="subtitle1" style={{ marginBottom: '2rem', color: '#555' }}>
                        Plan and manage your hackathons easily with our all-in-one software, services, and community.
                    </Typography>
                    <Grid container spacing={4} justifyContent="center">
                        <Grid item xs={12} sm={6} md={4}>
                            <Card 
                                variant="outlined" 
                                style={{
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
                                    padding: '1rem',
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                    '&:hover': {
                                        transform: 'scale(1.05)', 
                                        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)'
                                    }
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h5" component="div" style={{ fontWeight: 'bold' }}>
                                        OurWebsite
                                    </Typography>
                                    <Typography variant="body1" style={{ margin: '1rem 0' }}>
                                        Get your tools in the hands of developers around the world with OurWebsite.
                                    </Typography>
                                    <Button 
                                        variant="contained" 
                                        style={{ backgroundColor: '#ffc107', color: '#333', padding: '0.75rem 1.5rem', fontWeight: 'bold' }}
                                        onClick={handlePublicHackathon}
                                    >
                                        Host public hackathon
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card 
                                variant="outlined" 
                                style={{
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
                                    padding: '1rem',
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                    '&:hover': {
                                        transform: 'scale(1.05)', 
                                        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)'
                                    }
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h5" component="div" style={{ fontWeight: 'bold' }}>
                                        OurWebsite for Teams
                                    </Typography>
                                    <Typography variant="body1" style={{ margin: '1rem 0' }}>
                                        Drive employee and customer innovation in less time with OurWebsite for Teams.
                                    </Typography>
                                    <Button 
                                        variant="contained" 
                                        style={{ backgroundColor: '#ffc107', color: '#333', padding: '0.75rem 1.5rem', fontWeight: 'bold' }}
                                        onClick={handleInternalHackathon}
                                    >
                                        Host internal hackathon
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* New Section for Company Stats */}
                    <div style={{ marginTop: '4rem', padding: '2rem 0', backgroundColor: '#f9f9f9' }}>
                        <Typography variant="h5" component="div" style={{ fontWeight: 'bold', marginBottom: '1.5rem' }}>
                            You're in good hands with Hackify
                        </Typography>
                        <Typography variant="subtitle1" style={{ marginBottom: '2rem', color: '#555' }}>
                            We’ve been supporting hackathons with excellence and commitment. Our solutions streamline hackathon management, enhance participant engagement.
                        </Typography>
                        <Grid container spacing={4} justifyContent="center">
                            <Grid item xs={12} sm={4} md={3}>
                                <Typography variant="h4" component="div" style={{ fontWeight: 'bold', color: '#555' }}>
                                    3 million+
                                </Typography>
                                <Typography variant="body1" style={{ color: '#555' }}>
                                    happy customers
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={4} md={3}>
                                <Typography variant="h4" component="div" style={{ fontWeight: 'bold', color: '#00796b' }}>
                                    8,000+
                                </Typography>
                                <Typography variant="body1" style={{ color: '#555' }}>
                                    hackathons conducted
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={4} md={3}>
                                <Typography variant="h4" component="div" style={{ fontWeight: 'bold', color: '#00796b' }}>
                                    12 years+
                                </Typography>
                                <Typography variant="body1" style={{ color: '#555' }}>
                                    of hackathon expertise
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    export default AdminPage;
