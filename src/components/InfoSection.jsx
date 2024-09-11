import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import Icon1 from '../Assets/carbon_notebook-reference.svg';
import Icon2 from '../Assets/Vector.svg';
import Icon3 from '../Assets/Robot.svg';
import Icon4 from '../Assets/IdentificationCard.svg';
import { motion } from 'framer-motion'; // Import framer-motion

const infoData = [
  {
    image: Icon1,
    title: 'Prove your skills',
    description: 'Gain experience by solving real-world problems.Gain substantial experience by solving real-world problems and pit against others to come up with innovative solutions.',
  },
  {
    image: Icon2,
    title: 'Learn from community',
    description: 'One can look and analyze the solutions submitted by the other Data Scientists in the community and learn from them.',
  },
  {
    image: Icon3,
    title: 'Challenge yourself',
    description: 'There is nothing for you to lose by participating in a challenge. You can fail safe, learn out of the entire experience and bounce back harder.',
  },
  {
    image: Icon4,
    title: 'Earn recognition',
    description: 'You will stand out from the crowd if you do well in AI challenges, it not only helps you shine in the community but also earns rewards.',
  },
];

function InfoSection() {
  return (
    <section style={{ padding: '40px 20px', margin: '0 5%' }}>
      {/* Title Animation */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h4" align="center" style={{ marginTop: '20px', fontWeight: '600' }}>
          Why Participate in <span className="AI">AI Challenges?</span>
        </Typography>
      </motion.div>

      <Grid container spacing={2} style={{ margin: '30px 0' }}>
        {infoData.map((info, index) => (
          <Grid item xs={12} md={6} key={index}>
            {/* Card Animation */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }} // Staggered animation for each card
            >
              <Paper
                elevation={0}
                style={{
                  padding: '40px',
                  textAlign: 'left',
                  background: '#F8F9FD',
                  height: '250px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                {/* Image Animation */}
                <motion.img
                  src={info.image}
                  alt={info.title}
                  style={{ width: '40px', height: '40px', marginBottom: '10px' }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }} // Staggered scaling effect
                />
                <Typography variant="h6" gutterBottom sx={{ fontWeight: '600', fontSize: '24px' }}>
                  {info.title}
                </Typography>
                <Typography variant="body2">{info.description}</Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </section>
  );
}

export default InfoSection;