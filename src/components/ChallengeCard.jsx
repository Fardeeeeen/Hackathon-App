import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Box, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import Tick from '../Assets/charm_circle-tick.png';
import { styled, keyframes } from '@mui/system';

// Define animations
const hoverAnimation = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  50% {
    transform: scale(1.02);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

const pulseAnimation = keyframes`
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

// Styled components with animations
const AnimatedCard = styled(Card)(({ theme }) => ({
  width: '350px',
  height: '470px',
  borderRadius: '16px',
  backgroundColor: '#fff',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    animation: `${hoverAnimation} 0.3s ease-in-out`,
  },
}));

const AnimatedButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#44924C',
  color: '#fff',
  marginTop: '16px',
  padding: '8px 16px',
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  margin: '30px 0',
  transition: 'background-color 0.3s',
  animation: `${pulseAnimation} 1.5s infinite`,
  '&:hover': {
    backgroundColor: '#357a3b',
  },
}));

function ChallengeCard({ challenge }) {
  const { id, name, status, startDate, endDate, image } = challenge;
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (typeof image === 'string') {
      // Assume image is a URL
      setImageUrl(image);
    } else if (image && (image instanceof Blob || image instanceof File)) {
      // Convert Blob or File to URL
      const objectUrl = URL.createObjectURL(image);
      setImageUrl(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl); // Clean up URL object
      };
    } else {
      setImageUrl('default-image-url.png'); // Fallback image
    }
  }, [image]);

  const renderTimer = () => {
    const now = new Date();
    
    if (status === 'upcoming') {
      const timeToStart = new Date(startDate) - now;
      const days = Math.floor(timeToStart / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeToStart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeToStart % (1000 * 60 * 60)) / (1000 * 60));
      return (
        <div>
          <Typography variant="body2" sx={{ fontSize: '14px', fontWeight: 600, textAlign:'center', color:' #454545', }}>
            Starts in
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '18px', fontWeight: 600, textAlign:'center', color:' #454545', }}>
            {`${String(days).padStart(2, '0')} Days ${String(hours).padStart(2, '0')} Hours ${String(minutes).padStart(2, '0')} Mins`}
          </Typography>
        </div>
      );
    } else if (status === 'active') {
      const timeToEnd = new Date(endDate) - now;
      const days = Math.floor(timeToEnd / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeToEnd % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeToEnd % (1000 * 60 * 60)) / (1000 * 60));
      return (
        <div>
          <Typography variant="body2" sx={{ fontSize: '14px', fontWeight: 600, textAlign:'center', color:' #454545', }}>
            Ends in
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '18px', fontWeight: 600 , textAlign:'center', color:' #454545',}}>
            {`${String(days).padStart(2, '0')} Days ${String(hours).padStart(2, '0')} Hours ${String(minutes).padStart(2, '0')} Mins`}
          </Typography>
        </div>
      );
    } else {
      const formattedDate = new Date(endDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: '2-digit',
      }) + ' ' + new Date(endDate).toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).toLowerCase();
      
      return (
        <div>
          <Typography variant="body2" sx={{ fontSize: '14px', fontWeight: 600, textAlign:'center', color:' #454545', }}>
            Ended on
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '18px', color:' #454545', fontWeight:'bold', }}>
            {formattedDate}
          </Typography>
        </div>
      );
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return '#F2C94C40';
      case 'active':
        return '#44924C3D';
      case 'past':
        return '#F2C94C40';
      default:
        return '#B0B3C6'; 
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case 'upcoming':
        return '#666666';
      case 'active':
        return '#44924C';
      case 'past':
        return '#666666';
      default:
        return '#6c757d'; 
    }
  };

  return (
    <AnimatedCard>
      {/* Image Section */}
      <CardMedia 
        component="img" 
        height="170" 
        image={imageUrl} 
        alt={name} 
        sx={{ objectFit: 'cover', width: '100%' }} // Ensure image fits correctly
      />

      <CardContent
        sx={{
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Status Bubble */}
        <Box
          sx={{
            backgroundColor: getStatusColor(status),
            color: getStatusTextColor(status),
            padding: '5px 10px',
            borderRadius: '15px',
            fontSize: '12px',
            marginBottom: '10px',
            fontWeight: '600',
            lineHeight: '16px',
          }}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Box>

        <Typography variant="h6" gutterBottom sx={{ fontSize: '18px', fontWeight: 600, textAlign: 'center', marginBottom:'30px', }}>
          {name.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </Typography>
        {renderTimer()}
        <Link to={`/challenge/${id}`} style={{ textDecoration: 'none' }}>
          <AnimatedButton>
            <img src={Tick} alt="Tick" style={{ marginRight: '8px' }} />
            Participate Now
          </AnimatedButton>
        </Link>
      </CardContent>
    </AnimatedCard>
  );
}

export default ChallengeCard;