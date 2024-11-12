import React, { useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, TextField, IconButton, Button, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import SearchIcon from '@mui/icons-material/Search';
import Navbar from './Navbar';
import Footer from './Footer';

const sampleProjects = [
  { id: 1, title: 'AI Art Generator', description: 'Create stunning artwork using artificial intelligence.', image: 'https://via.placeholder.com/150', likes: 42, comments: 15, tags: ['AI', 'Art'], username: 'creator1' },
  { id: 2, title: 'Weather Tracker', description: 'Real-time weather tracking for cities worldwide.', image: 'https://via.placeholder.com/150', likes: 28, comments: 9, tags: ['Weather', 'API'], username: 'creator2' },
  { id: 3, title: 'Crypto Dashboard', description: 'Stay updated on cryptocurrency market trends.', image: 'https://via.placeholder.com/150', likes: 55, comments: 22, tags: ['Crypto', 'Finance'], username: 'creator3' },
  { id: 4, title: 'Recipe Finder', description: 'Find recipes based on ingredients you have.', image: 'https://via.placeholder.com/150', likes: 34, comments: 12, tags: ['Food', 'Recipes'], username: 'creator4' },
  { id: 5, title: 'Task Manager', description: 'Organize and track your daily tasks efficiently.', image: 'https://via.placeholder.com/150', likes: 40, comments: 18, tags: ['Productivity', 'Tasks'], username: 'creator5' },
  { id: 6, title: 'Fitness Tracker', description: 'Monitor your fitness activities and progress.', image: 'https://via.placeholder.com/150', likes: 37, comments: 20, tags: ['Fitness', 'Health'], username: 'creator6' },
  { id: 7, title: 'Movie Recommendations', description: 'Get personalized movie recommendations.', image: 'https://via.placeholder.com/150', likes: 63, comments: 25, tags: ['Movies', 'Entertainment'], username: 'creator7' },
  { id: 8, title: 'Budget Tracker', description: 'Track your expenses and manage your budget.', image: 'https://via.placeholder.com/150', likes: 45, comments: 14, tags: ['Finance', 'Budgeting'], username: 'creator8' },
  { id: 9, title: 'Language Learner', description: 'Learn new languages with interactive lessons.', image: 'https://via.placeholder.com/150', likes: 52, comments: 19, tags: ['Education', 'Language'], username: 'creator9' },
];

const ProjectsPage = () => {
  const [projects, setProjects] = useState(sampleProjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [likedProjects, setLikedProjects] = useState({});

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleLike = (projectId) => {
    setLikedProjects((prevLikedProjects) => {
      const isLiked = prevLikedProjects[projectId];
      const newLikeCount = isLiked ? -1 : 1;

      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === projectId ? { ...project, likes: project.likes + newLikeCount } : project
        )
      );

      return { ...prevLikedProjects, [projectId]: !isLiked };
    });
  };

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery) ||
    project.username.toLowerCase().includes(searchQuery) ||
    project.tags.some(tag => tag.toLowerCase().includes(searchQuery))
  );

  return (
    <>
      <Navbar />
      <Box padding={3} textAlign="center" sx={{ width: '70%', margin: 'auto' }}>
        <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold' }}>Projects</Typography>
        
        <Box 
          width="90%"
          height="10vh"
          margin="auto"
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            background: 'linear-gradient(to right, #ffc107, #ffeb3b)',
            borderRadius: '8px',
            marginBottom: '16px'
          }}
        >
          <Typography variant="subtitle1" color="textSecondary">
            Explore amazing projects created by talented developers
          </Typography>
        </Box>
        
        <Box display="flex" justifyContent="center" alignItems="center" mb={3}>
          <TextField
            label="Search Projects"
            variant="outlined"
            onChange={handleSearch}
            placeholder="Search by name, title, tag, or username"
            style={{ marginRight: '8px', width: '100%' }}
          />
          <Button
            variant="contained"
            style={{
              backgroundColor: '#ffc107',
              color: 'white',
              fontWeight: 'bold',
              height: '56px', // Matching TextField height
              display: 'flex',
              alignItems: 'center'
            }}
            startIcon={<SearchIcon />}
          >
            SEARCH
          </Button>
        </Box>
        
        <Grid container spacing={3}>
          {filteredProjects.slice(0, 9).map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={project.image}
                  alt={project.title}
                />
                <CardContent>
                  <Typography variant="h6" component="div">{project.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{project.description}</Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    <IconButton
                      aria-label="like"
                      onClick={() => handleLike(project.id)}
                      sx={{ color: '#ff3d47' }}
                    >
                      <FavoriteIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="body2" ml={0.5}>{project.likes}</Typography>
                    <IconButton
                      aria-label="comment"
                      sx={{ color: '#ffc107', marginLeft: '8px' }}
                    >
                      <CommentIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="body2" ml={0.5}>{project.comments}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default ProjectsPage;
