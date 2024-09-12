// import React from 'react';
// import { Card, CardContent, Typography, CardMedia, Button , cardStyle} from '@mui/material';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';

// const Hackathon = ({}) => {
//   const navigate = useNavigate();

// //   const cardStyle = {
// //     backgroundColor: mode === 'dark' ? 'black' : '#fff',
// //     color: mode === 'dark' ? '#fff' : '#000', 
// //     boxShadow: mode === 'dark' 
// //     ? '0 4px 8px rgba(255, 255, 255, 0.2)'
// //     : '0 4px 8px rgba(0, 0, 0, 0.2)',
// //     borderRadius: '8px',
// //     transition: 'background-color 0.3s, color 0.3s',
// //   };

//   return (
//     <>
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         whileHover={{ scale: 1.05 }} 
//         transition={{ duration: 0.4 }}
//       >
//         <Card sx={{ maxWidth: 345, margin: 2, ...cardStyle }}> 
//           {/* {imageUrl && (
//             <CardMedia
//               component="img"
//               height="140"
              
//             />
//           )} */}
//           <CardContent>
//             <Typography variant="h5" component="div">
//                 This is a demo hackathon file
//             </Typography>
//             <Typography variant="body2" color="text.secondary" sx={{ color: mode === 'dark' ? '#fff' : 'text.secondary' }}>
//               This is a demo hackathon file
//             </Typography>
//             {/* <Typography variant="body2" color="text.secondary" sx={{ color: mode === 'dark' ? '#fff' : 'text.secondary' }}>
//               Semester: {semester}
//             </Typography> */}
//             <Button
//               variant="contained"
//               color="primary"
//               sx={{ mt: 2 }}
//               onClick={() => navigate('/content')}
//               title='Go to Notes'
//             >
//              View Notes And PYQ's
//             </Button>
//           </CardContent>
//         </Card>
//       </motion.div>
//     </>
//   );
// };

// export default Hackathon;
