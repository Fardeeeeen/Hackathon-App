import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { keyframes } from '@mui/system';
import Icon1 from '../Assets/AI.svg';
import Icon2 from '../Assets/Data.svg';
import Icon3 from '../Assets/AI2.svg';

// Define animations
const fadeInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const hoverEffectAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

function HeaderStats() {
  return (
    <Box 
      sx={{
        display: 'flex',
        backgroundColor: '#002A3B',
        padding: '40px 0',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            animation: `${fadeInAnimation} 1s ease-out`,
            '&:hover': {
              animation: `${hoverEffectAnimation} 0.5s ease-in-out`,
            },
          }}
        >
          <img src={Icon1} alt='AI Icon' style={{ marginRight: '16px' }} />
          <div className='stat-icon'>
            <Typography variant="h4" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
              100K+
            </Typography>
            <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
              AI Submissions
            </Typography>
          </div>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            animation: `${fadeInAnimation} 1.5s ease-out`,
            '&:hover': {
              animation: `${hoverEffectAnimation} 0.5s ease-in-out`,
            },
          }}
        >
          <img src={Icon2} alt='Data Icon' style={{ marginRight: '16px' }} />
          <div className='stat-icon'>
            <Typography variant="h4" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
              50K+
            </Typography>
            <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
              Data Scientists
            </Typography>
          </div>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            animation: `${fadeInAnimation} 2s ease-out`,
            '&:hover': {
              animation: `${hoverEffectAnimation} 0.5s ease-in-out`,
            },
          }}
        >
          <img src={Icon3} alt='AI Challenges Icon' style={{ marginRight: '16px' }} />
          <div className='stat-icon'>
            <Typography variant="h4" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
              100+
            </Typography>
            <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
              AI Challenges hosted
            </Typography>
          </div>
        </Box>
      </Container>
    </Box>
  );
}

export default HeaderStats;