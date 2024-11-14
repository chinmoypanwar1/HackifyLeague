import React, { useState , useContext } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, TextField, IconButton, Button, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import SearchIcon from '@mui/icons-material/Search';
import Navbar from './Navbar';
import Footer from './Footer';
import ThemeContext from '../Context/ThemeContext';

const sampleProjects = [
  { id: 1, title: 'AI Art Generator', description: 'Create stunning artwork using artificial intelligence.', image: 'https://www.pcworld.com/wp-content/uploads/2023/04/Power-of-art-upscale-4.jpg?quality=50&strip=all', likes: 42, comments: 15, tags: ['AI', 'Art'], username: 'creator1' },
  { id: 2, title: 'Weather Tracker', description: 'Real-time weather tracking for cities worldwide.', image: 'https://wallpapers.com/images/featured/weather-xqhs9axpy8btfd3y.jpg', likes: 28, comments: 9, tags: ['Weather', 'API'], username: 'creator2' },
  { id: 3, title: 'Crypto Dashboard', description: 'Stay updated on cryptocurrency market trends.', image: 'https://img.freepik.com/free-vector/admin-dashboard-panel-with-gradient-style_23-2147870229.jpghttps://img.freepik.com/free-photo/cyberpunk-bitcoin-illustration_23-2151611161.jpg', likes: 55, comments: 22, tags: ['Crypto', 'Finance'], username: 'creator3' },
  { id: 4, title: 'Recipe Finder', description: 'Find recipes based on ingredients you have.', image: 'https://clubmahindra.gumlet.io/blog/media/section_images/littichokh-f5272d4bd8f5921.jpg?w=376&dpr=2.6', likes: 34, comments: 12, tags: ['Food', 'Recipes'], username: 'creator4' },
  { id: 5, title: 'Task Manager', description: 'Organize and track your daily tasks efficiently.', image: 'https://img.freepik.com/free-vector/hand-drawn-flat-design-business-planning-concept_23-2149201593.jpg?uid=R140040055&ga=GA1.1.1153996981.1709355982&semt=ais_hybrid', likes: 40, comments: 18, tags: ['Productivity', 'Tasks'], username: 'creator5' },
  { id: 6, title: 'Fitness Tracker', description: 'Monitor your fitness activities and progress.', image: 'https://img.freepik.com/free-photo/woman-checking-watch-medium-shot_23-2148889632.jpg?uid=R140040055&ga=GA1.1.1153996981.1709355982', likes: 37, comments: 20, tags: ['Fitness', 'Health'], username: 'creator6' },
  { id: 7, title: 'Movie Recommendations', description: 'Get personalized movie recommendations.', image: 'https://img.freepik.com/free-photo/popcorn-box-with-cinema-sign_23-2148115282.jpg?uid=R140040055&ga=GA1.1.1153996981.1709355982', likes: 63, comments: 25, tags: ['Movies', 'Entertainment'], username: 'creator7' },
  { id: 8, title: 'Budget Tracker', description: 'Track your expenses and manage your budget.', image: 'https://img.freepik.com/premium-photo/isometric-digital-workspace-modern-web-hosting-task-management-visualized-tech-presentations_38013-29395.jpg', likes: 45, comments: 14, tags: ['Finance', 'Budgeting'], username: 'creator8' },
  { id: 9, title: 'Language Learner', description: 'Learn new languages with interactive lessons.', image: 'https://img.freepik.com/free-photo/pretty-asian-teacher-smiling-camera-back-classroom-elementary-school-vintage-effect-style-pictures_1253-1133.jpg?uid=R140040055&ga=GA1.1.1153996981.1709355982', likes: 52, comments: 19, tags: ['Education', 'Language'], username: 'creator9' },
];

const ProjectsPage = () => {
  const [projects, setProjects] = useState(sampleProjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [likedProjects, setLikedProjects] = useState({});

  const { theme } = useContext(ThemeContext);

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
      {/* <Navbar /> */}
      <Navbar style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }} />
        
        <Box
          sx={{
            background: 'linear-gradient(90deg, #ffb300, #ffc107, #ff9800)', // Enhanced gradient
            padding: '40px 20px', 
            borderRadius: '10px', 
            marginBottom: '40px',
            marginTop: '10px',
            margin: '20px 20px' ,
          }}
        >
          <Typography variant="h4" align="center" gutterBottom style={{ color: 'black', fontWeight: 'bold' }}>
            See the best Projects by best developers
          </Typography>
        </Box>

      <Box padding={3} textAlign="center" sx={{ width: '70%', margin: 'auto' }}>
        

        
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
              color: 'black',
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
