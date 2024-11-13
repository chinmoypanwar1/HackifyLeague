import React , {useContext} from 'react';
import ThemeContext from '../Context/ThemeContext';
import { Container, Typography, Box, Grid, Link, Divider } from '@mui/material';

const Footer = () => {
  const {theme}  = useContext(ThemeContext);
  return (
    <Box sx={{ backgroundColor : theme.backgroundColor , color : theme.color }}> {/* Reduced padding to 2 */}
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          
          {/* Protfolio Section */}

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Portfolio
            </Typography>
            <Link href="#" color="inherit" variant="body2" sx={{ display: 'block', mt: 1 }}>
              Your Projects
            </Link>
            <Link href="#" color="inherit" variant="body2" sx={{ display: 'block', mt: 1 }}>
              Your Hackathons
            </Link>
            <Link href="#" color="inherit" variant="body2" sx={{ display: 'block', mt: 1 }}>
              Settings
            </Link>
          </Grid>

          {/* Resources Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Resources
            </Typography>
            <Link href="#" color="inherit" variant="body2" sx={{ display: 'block', mt: 1 }}>
              Help Center
            </Link>
            <Link href="#" color="inherit" variant="body2" sx={{ display: 'block', mt: 1 }}>
              Terms of Service
            </Link>
            <Link href="#" color="inherit" variant="body2" sx={{ display: 'block', mt: 1 }}>
              Privacy Policy
            </Link>
          </Grid>

          {/* Connect Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Connect
            </Typography>
            <Link href="https://twitter.com" color="inherit" variant="body2" sx={{ display: 'block', mt: 1 }}>
              Twitter
            </Link>
            <Link href="https://linkedin.com" color="inherit" variant="body2" sx={{ display: 'block', mt: 1 }}>
              LinkedIn
            </Link>
            <Link href="https://github.com" color="inherit" variant="body2" sx={{ display: 'block', mt: 1 }}>
              GitHub
            </Link>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2, bgcolor: 'white' }} /> {/* Reduced margin to decrease space */}

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Hackify. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
